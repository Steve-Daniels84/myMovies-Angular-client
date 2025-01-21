import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { fetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-registration-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '' };

  constructor(
    public fetchApiData: fetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent> | null,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        console.log('Test');
        // Logic for a successful user registration
        this.dialogRef?.close(); // Close the modal on success
        this.snackBar.open('Registration successful!', 'OK', {
          duration: 2000,
        });
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open(`Registration failed: ${error.error}`, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
