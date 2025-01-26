import { Component, OnInit, Input } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { fetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

/**
 * The `UserRegistrationFormComponent` handles user registration by capturing user details,
 * sending them to the API, and providing feedback on success or failure.
 */
@Component({
  selector: 'app-user-registration-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
  ], // Includes necessary Angular Material and Forms modules for the component.
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Object to hold user registration data including `Username`, `Password`, and `Email`.
   */
  @Input() userData = { Username: '', Password: '', Email: '' };

  /**
   * Initializes the `UserRegistrationFormComponent`.
   * @param fetchApiData - Service to interact with the API for user registration.
   * @param dialogRef - Reference to the dialog containing this component, used to close it.
   * @param snackBar - Service for displaying snack bar notifications.
   */
  constructor(
    public fetchApiData: fetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent> | null,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Angular lifecycle hook called after the component is initialized.
   */
  ngOnInit(): void {}

  /**
   * Handles the user registration process by sending user data to the API.
   * Provides feedback through snack bar notifications on success or failure.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        // Notify the user of successful registration and close the dialog.
        this.dialogRef?.close();
        this.snackBar.open('Registration successful!', 'OK', {
          duration: 2000,
        });
      },
      error: (error) => {
        // Notify the user of registration failure with an error message.
        this.snackBar.open(`Registration failed: ${error.error}`, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}