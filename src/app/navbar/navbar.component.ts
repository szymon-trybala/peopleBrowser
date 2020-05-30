import { Component, OnInit } from '@angular/core';
import {Person} from "../models/person";
import {Router} from "@angular/router";
import {PeopleService} from "../services/people/people.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DetailsNewComponent} from "../details-new/details-new.component";
import { AuthService } from '../services/people/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  grid = false;
  person = new Person('', '', '', '', '', '', '');

  constructor(
    private router: Router,
    private service: PeopleService,
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {}

  toggleGrid(): void {
    this.grid = !this.grid;
    this.grid ? this.router.navigate(['/grid']) : this.router.navigate(['/list']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DetailsNewComponent, {
      width: '500px',
      data: this.person
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.isAdmin()) {
        if (result) {
          this.service.addPerson(result).subscribe(response => {
            this._snackBar.open("Człowiek dodany");
            window.location.reload();
          }, error => {
            this._snackBar.open("Błąd podczas dodawania człowieka :(");
            console.log(error);
          })
        }
      } else {
        this._snackBar.open("Nie masz uprawnień aby dodać nowego użytkownika!")
      }
    })
  }

  logout(): void {
    this.auth.logout();
    this._snackBar.open("Wylogowano");
    this.router.navigate(['/']);
  }

  loggedIn(): boolean {
    return !!this.auth.loggedIn();
  }

  isAdmin(): boolean {
    return !!this.auth.isAdmin();
  }
}
