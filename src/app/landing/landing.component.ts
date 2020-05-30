import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Person} from '../models/person';
import {PeopleService} from '../services/people/people.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  grid = false;
  people: Person[];
  topBarTitle = '';

  constructor(private service: PeopleService) {}

  ngOnInit(): void {
    this.service.getPeopleAll().subscribe(data => {
      this.people = data;
    }, error => {
      console.log("Error while fetching users!");
      console.log(error);
    });
  }

  toggleGrid(): void {
    this.grid = !this.grid;
    this.topBarTitle = '';
  }

  setTopBarTitle(text: string): void {
    this.topBarTitle = text;
  }

  peopleListChanged(): void {
    this.ngOnInit();
  }
}
