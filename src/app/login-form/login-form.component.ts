import { Component, OnInit, Input } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { fetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';

/**
 * The `LoginFormComponent` provides a form for users to log in to the application.
 * It validates user credentials, handles API calls for authentication, and navigates the user upon successful login.
 */
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatInputModule,     // Input fields for username and password.
    MatButtonModule,    // Buttons for form submission.
    MatCardModule,      // Card layout for the form container.
    MatFormFieldModule, // Form field styling and validation.
    FormsModule,        // Provides two-way data binding for the form.
    MatSnackBarModule,  // Snack bars for user notifications.
    MatDialogModule,    // Dialog functionality for modal interactions.
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  /**
   * `userData` holds the user's login credentials: username and password.
   * It is bound to the login form using two-way data binding.
   */
  @Input() userData = { Password: '', Username: '' };

  /**
   * Creates an instance of `LoginFormComponent`.
   * @param fetchApiData - Service for interacting with the API to authenticate users.
   * @param dialogRef - Reference to the dialog in which this component is rendered. Can be `null`.
   * @param snackBar - Service to display snack bar notifications.
   * @param router - Router for navigation within the application.
   * @param authService - Service to manage authentication tokens and user data.
   */
  constructor(
    public fetchApiData: fetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent> | null,
    public snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * Lifecycle hook that runs when the component is initialized.
   */
  ngOnInit(): void {}

  /**
   * Handles user login by sending login credentials to the API.
   * Upon successful login:
   * - Stores the token, favorite movies, and user ID using `AuthService`.
   * - Closes the dialog if it is open.
   * - Displays a success message using a snack bar.
   * - Navigates the user to the `/movies` page.
   * 
   * If the login fails, it displays an error message in a snack bar.
   */
  logUserIn(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        // Store the authentication token and user data
        this.authService.setToken(result.token);
        this.authService.setFavouriteMovies(result.FavouriteMovies);
        this.authService.setUserID(result.userId);

        // Close the dialog if open
        this.dialogRef?.close();

        // Show success notification
        this.snackBar.open('User logged in successfully!', 'OK', {
          duration: 2000,
        });

        // Navigate to the movies page
        this.router.navigate(['/movies']);
      },
      error: (error) => {
        // Show error notification
        this.snackBar.open(`Login unsuccessful: ${error.error}`, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}