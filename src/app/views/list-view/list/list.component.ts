import { Component, OnInit } from '@angular/core';
import {PeopleService} from "../../../services/people/people.service";
import {Person} from "../../../models/person";
import { PaginatedResults, Pagination } from 'src/app/models/pagination';
import { PageEvent } from '@angular/material/paginator';
import { Filters } from 'src/app/models/filters';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  response: PaginatedResults<Person[]>;
  peopleArray: Person[];
  paginationSettings: Pagination;

  pageEvent = new PageEvent();
  pageSizeOptions: number[] = [3, 5, 7, 10, 50];

  filters: Filters;
  orderBy: string;

  constructor(private service: PeopleService) {}

  ngOnInit(): void {
    this.getPeople();
    this.filters = { firstName: "", lastName: "", occupation: ""};
  }

  getPeople(event?: PageEvent, filters?: Filters, orderBy?: string) {
    if(event) {
      this.service.getPeopleAll(event.pageIndex + 1, event.pageSize, filters, orderBy).subscribe(data => {
        this.response = data;
        this.peopleArray = this.response.data;
        this.paginationSettings = this.response.pagination;
      }, error => {
        console.log("Error while fetching users!");
        console.log(error);
      })
      return event;
    } else {
      this.service.getPeopleAll().subscribe(data => {
        this.response = data;
        this.peopleArray = this.response.data;
        this.paginationSettings = this.response.pagination;
      }, error => {
        console.log("Error while fetching users!");
        console.log(error);
      })
      return event;
    }
  }

  peopleListChanged(): void {
    this.ngOnInit();
  }

  filterResults() {
    this.getPeople(this.pageEvent, this.filters, this.orderBy);
  }

  resetFilters() {
    this.filters = { firstName: "", lastName: "", occupation: ""};
    this.getPeople(this.pageEvent, null, this.orderBy);
  }

  orderByChanged() {
    this.getPeople(this.pageEvent, this.filters, this.orderBy);
  }

  getCsvFile() {
    this.service.getPeopleAllCsv(this.filters, this.orderBy).subscribe(data => {
      const blob = new Blob([data], {type: 'text/csv'});
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'people.csv';
      link.click();
    })
  }
}
