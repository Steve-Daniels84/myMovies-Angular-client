import { ApplicationConfig } from '@angular/core';
import { Routes, provideRouter, withDebugTracing } from '@angular/router';
import { AppComponent } from './app.component';
import { MovieListViewComponent } from './movie-list-view/movie-list-view.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';

export const appRoutes: Routes = [
    {path: '', component: UserRegistrationFormComponent},
    {path: 'movies', component: MovieListViewComponent}
];


