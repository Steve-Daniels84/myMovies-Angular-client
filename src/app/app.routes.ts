import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MovieListViewComponent } from './movie-list-view/movie-list-view.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { LoginRegistrationComponent } from './login-registration/login-registration.component';

export const appRoutes: Routes = [
    {path: '', component: LoginRegistrationComponent},
    {path: 'movies', component: MovieListViewComponent}
];


