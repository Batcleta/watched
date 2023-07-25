import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PagesComponent } from './pages.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from '../components/header/header.module';
import { CardComponent } from './movies-list/components/card/card.component';
import { RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { RateModalComponent } from './movie-details/components/rate-modal/rate-modal.component';
import { NewMovieComponent } from './new-movie/new-movie.component';


@NgModule({
  declarations: [
    PagesComponent,
    MoviesListComponent,
    LoginComponent,
    CardComponent,
    MovieDetailsComponent,
    RateModalComponent,
    NewMovieComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HeaderModule,
    RouterModule,
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
