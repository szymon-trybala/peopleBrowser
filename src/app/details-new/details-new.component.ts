import {Component, Inject, OnInit} from '@angular/core';
import {Person} from "../models/person";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-details-new',
  templateUrl: './details-new.component.html',
  styleUrls: ['./details-new.component.css']
})
export class DetailsNewComponent implements OnInit {
  personEdit: Person;

  pictures = [
    {value: '/assets/baba1.jpeg', viewValue: 'Kobieta 1'},
    {value: '/assets/baba2.jpeg', viewValue: 'Kobieta 2'},
    {value: '/assets/baba3.jpeg', viewValue: 'Kobieta 3'},
    {value: '/assets/baba4.jpeg', viewValue: 'Kobieta 4'},
    {value: '/assets/baba5.jpeg', viewValue: 'Kobieta 5'},
    {value: '/assets/chlop1.jpeg', viewValue: 'Mężczyzna 1'},
    {value: '/assets/chlop2.jpeg', viewValue: 'Mężczyzna 2'},
    {value: '/assets/chlop3.jpeg', viewValue: 'Mężczyzna 3'},
    {value: '/assets/chlop4.jpeg', viewValue: 'Mężczyzna 4'},
    {value: '/assets/chlop5.jpeg', viewValue: 'Mężczyzna 5'},
    {value: '/assets/chlop6.jpeg', viewValue: 'Mężczyzna 6'},
    {value: '/assets/chlop7.jpeg', viewValue: 'Mężczyzna 7'},
  ];
  selectedPictureUrl: string;

  constructor(
    public dialogRef: MatDialogRef<Person>,
    @Inject(MAT_DIALOG_DATA) public person: Person
  ) { this.personEdit = this.person; }

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {
    this.personEdit.pictureUrl = this.selectedPictureUrl;
  }
}
