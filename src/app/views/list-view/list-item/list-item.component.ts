import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from "@angular/material/dialog";
import {Person} from "../../../models/person";
import {PeopleService} from "../../../services/people/people.service";
import {DetailsComponent} from "../../../details/details.component";
import { AuthService } from 'src/app/services/people/auth.service';


@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() person: Person;
  @Output() changeList = new EventEmitter<boolean>()
  private expanded = false;

  constructor(
    private service: PeopleService,
    private _snackBar: MatSnackBar,
    private auth: AuthService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  removeSelectedItem(id: string) {
    if (this.auth.isAdmin()) {
      this.service.deleteUser(id).subscribe(response => {
        this.changeList.emit(true);
        this._snackBar.open("Człowiek usunięty");
      }, error => {
        this._snackBar.open("Błąd podczas usuwania człowieka :(");
        console.log(error);
      })
    } else {
      this._snackBar.open("Nie masz uprawnień do usuwania ludzi!")
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DetailsComponent, {
      width: '500px',
      data: this.person
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.auth.isAdmin()) {
        if (result) {
          this.service.editPerson(result).subscribe(response => {
            this._snackBar.open("Człowiek zedytowany");
          }, error => {
            this._snackBar.open("Błąd podczas usuwania człowieka :(");
            console.log(error);
          })
        }
      } else {
        this._snackBar.open("Nie masz uprawnień do edytowania ludzi!");
      }
    })
  }

  isAdmin(): boolean {
    return !!this.auth.isAdmin();
  }
}
