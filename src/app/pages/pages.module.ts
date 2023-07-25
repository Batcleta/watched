import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    PagesComponent,
    MoviesListComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  exports:[
    PagesComponent
  ]
})
export class PagesModule { }
