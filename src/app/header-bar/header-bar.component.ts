import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from '../auth-service.service';
import { RouterModule, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { fetchApiDataService } from '../fetch-api-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-bar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.scss'
})
export class HeaderBarComponent {
userId: string | null = '';
user: any = {};

constructor(private authService: AuthService, public router:Router, public dialog:MatDialog, public apiData: fetchApiDataService) { }
  


  logout() {
    this.authService.removeToken();
    this.authService.removeFavouriteMovies();
    this.authService.removeUserID();
    this.router.navigate(['']);
  }

  openUserProfileDialog(user: object): void {
    this.dialog.open(UserProfileComponent, {
      data:  this.user ,
    });
  }

  ngOnInit(): void {
    this.user = this.userId = this.authService.getUserID();
    if (this.userId) {
      this.apiData.getUserById(this.userId).subscribe((resp: any) => {
        this.user = resp[0];
      });
    }
  }
}
