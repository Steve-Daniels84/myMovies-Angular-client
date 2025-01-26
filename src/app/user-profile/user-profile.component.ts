import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule, NgIf } from '@angular/common';
import { fetchApiDataService } from '../fetch-api-data.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The `UserProfileComponent` allows users to view and edit their profile details.
 * It includes functionality to toggle edit mode and save changes to the user's profile.
 */
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule, 
    NgIf, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule, 
    MatFormFieldModule, 
    FormsModule
  ], // Imports necessary for form fields, buttons, cards, and conditional rendering.
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  /**
   * Object storing user profile data, including `Username` and `Email`.
   */
  @Input() userData = { Username: '', Email: '' };

  /**
   * Boolean flag to toggle edit mode for the user profile.
   */
  edit = false;

  /**
   * Initializes the `UserProfileComponent`.
   * @param data - Injected dialog data containing the user's current profile information.
   * @param fetchApiData - Service for interacting with the API to fetch and update user data.
   * @param snackBar - Service for displaying snack bar notifications.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: fetchApiDataService,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Angular lifecycle hook that initializes the component and populates `userData` with values from `data`.
   */
  ngOnInit(): void {
    this.userData.Username = this.data.Username;
    this.userData.Email = this.data.Email;
  }

  /**
   * Toggles the edit mode for the user profile.
   */
  toggleEditMode(): void {
    this.edit = !this.edit;
  }

  /**
   * Saves changes to the user's profile by calling the `updateUserDetails` API.
   * Displays success or error messages using the snack bar.
   */
  saveChanges(): void {
    this.fetchApiData.updateUserDetails(this.data._id, this.userData).subscribe({
      next: (response) => {
        // Notify the user that the profile was updated successfully.
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 2000,
        });
        this.toggleEditMode(); // Exit edit mode after saving changes.
      },
      error: (response) => {
        // Notify the user of an error.
        this.snackBar.open('An error occurred while updating the profile.', 'OK', {
          duration: 2000,
        });
      },
    });
  }
}