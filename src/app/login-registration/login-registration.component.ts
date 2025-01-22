import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { Component, Inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-registration',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule],
  templateUrl: './login-registration.component.html',
  styleUrl: './login-registration.component.scss'
})
export class LoginRegistrationComponent {

  constructor(@Inject(MatDialog) public dialog: MatDialog) { }
  
openUserRegistrationDialog(): void {
  this.dialog.open(UserRegistrationFormComponent, {
// Assigning the dialog a width
  width: '280px'
  });
}

openLoginDialog(): void {
  this.dialog.open(LoginFormComponent, {
// Assigning the dialog a width
  width: '280px'
  });
}

}
