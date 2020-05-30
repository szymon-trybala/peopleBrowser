import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from '../../../models/person';
import {PeopleService} from '../../../services/people/people.service';
import {DetailsComponent} from "../../../details/details.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import { AuthService } from 'src/app/services/people/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() public person: Person;
  @Output() changeList = new EventEmitter<boolean>()

  private expanded = false;

  constructor(
    private service: PeopleService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private auth: AuthService) {}

  ngOnInit(): void {}

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
      this._snackBar.open("Nie masz uprawnień do usuwania ludzi!");
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
            this._snackBar.open("Błąd podczas edytowania człowieka :(");
            console.log(error);
          })
        }
      } else {
        this._snackBar.open("Nie masz uprawnień aby edytować ludzi!")
      }
    })
  }

  isAdmin(): boolean {
    return !!this.auth.isAdmin();
  }
}
