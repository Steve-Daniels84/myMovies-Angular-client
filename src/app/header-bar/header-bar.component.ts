import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from '../auth-service.service';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-header-bar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
    
  ],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.scss'
})
export class HeaderBarComponent {
constructor(private authService: AuthService, public router:Router) { }
  logout() {
    this.authService.removeToken();
    this.authService.removeFavouriteMovies();
    this.authService.removeUserID();
    this.router.navigate(['']);
  }
}
