import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages.component';
import { unauthorizedUserGuard } from '../Services/guards/unauthorized-user.guard';
import { authenticatedUserGuard } from '../Services/guards/authenticated-user.guard';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NewMovieComponent } from './new-movie/new-movie.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent, canActivate: [authenticatedUserGuard],
    children: [
      {
        path: "",
        component: MoviesListComponent,
      },
      { path: 'movie-details/:movieId', component: MovieDetailsComponent },
      { path: 'new-movie', component: NewMovieComponent },

    ],
  },
  {
    path: 'login', component: LoginComponent, canActivate: [unauthorizedUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
