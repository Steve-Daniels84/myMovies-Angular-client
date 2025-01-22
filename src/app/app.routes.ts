import { Routes } from '@angular/router';
import { LoginRegistrationComponent } from './login-registration/login-registration.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Routes = [
    {path: '', component: LoginRegistrationComponent},
    {path: 'movies', 
        component: LayoutComponent,
        children:[
            {path: '', component: MovieCardComponent}
        ]
    }
];


