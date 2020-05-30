import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {PeopleService} from './services/people/people.service';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { DetailsComponent } from './details/details.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import { NavbarComponent } from './navbar/navbar.component';
import {CardComponent} from "./views/card-view/card/card.component";
import {ListItemComponent} from "./views/list-view/list-item/list-item.component";
import { ListComponent } from './views/list-view/list/list.component';
import { CardGridComponent } from './views/card-view/card-grid/card-grid.component';
import {MatSelectModule} from "@angular/material/select";
import { DetailsNewComponent } from './details-new/details-new.component';
import { JwtModule } from "@auth0/angular-jwt";
import { environmentDevelopement } from './environments/environments';
import {MatPaginatorModule} from '@angular/material/paginator';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CardComponent,
    ListItemComponent,
    DetailsComponent,
    NavbarComponent,
    ListComponent,
    CardGridComponent,
    DetailsNewComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        MatExpansionModule,
        MatListModule,
        HttpClientModule,
        AppRoutingModule,
        MatSnackBarModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: [environmentDevelopement.serverUrl],
                blacklistedRoutes: [environmentDevelopement.apiUrl + 'auth']
            }
        }),
        MatPaginatorModule
    ],
  providers: [
    PeopleService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
