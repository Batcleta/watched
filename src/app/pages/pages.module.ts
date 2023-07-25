import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PagesComponent } from './pages.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PagesComponent,
    MoviesListComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
