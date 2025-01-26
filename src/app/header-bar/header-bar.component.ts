import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../auth-service.service';
import { RouterModule, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { fetchApiDataService } from '../fetch-api-data.service';
import { CommonModule } from '@angular/common';

/**
 * The `HeaderBarComponent` is a reusable Angular component that displays the application's header bar.
 * It includes user actions such as logging out and opening the user profile dialog.
 */
@Component({
  selector: 'app-header-bar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.scss',
})
export class HeaderBarComponent {
  /**
   * The `userId` stores the logged-in user's ID, or `null` if no user is logged in.
   */
  userId: string | null = '';

  /**
   * The `user` object stores the details of the currently logged-in user.
   */
  user: any = {};

  /**
   * Creates an instance of `HeaderBarComponent`.
   * @param authService - Service for managing authentication-related actions.
   * @param router - Angular router to navigate between pages.
   * @param dialog - Service to handle opening dialogs in the application.
   * @param apiData - Service to fetch user data from the API.
   */
  constructor(
    private authService: AuthService,
    public router: Router,
    public dialog: MatDialog,
    public apiData: fetchApiDataService
  ) {}

  /**
   * Logs the user out by clearing authentication tokens, user data, and navigating to the login page.
   */
  logout(): void {
    this.authService.removeToken();
    this.authService.removeFavouriteMovies();
    this.authService.removeUserID();
    this.router.navigate(['']);
  }

  /**
   * Opens a dialog displaying the user's profile.
   * @param user - The user object to be passed as data to the dialog.
   */
  openUserProfileDialog(user: object): void {
    this.dialog.open(UserProfileComponent, {
      data: this.user,
    });
  }

  /**
   * Initializes the component by retrieving the logged-in user's data if the user is logged in.
   */
  ngOnInit(): void {
    this.user = this.userId = this.authService.getUserID();
    if (this.userId) {
      this.apiData.getUserById(this.userId).subscribe((resp: any) => {
        this.user = resp[0];
      });
    }
  }
}