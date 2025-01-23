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

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})

export class LoginFormComponent implements OnInit {
  @Input() userData = { Password: '', Username: '' };

  constructor(
    public fetchApiData: fetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent> | null,
    public snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  logUserIn(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {

        this.authService.setToken(result.token);
        this.authService.setFavouriteMovies(result.FavoriteMovies? result.FavoriteMovies : []);
        this.authService.setUserID(result.userId);
        this.dialogRef?.close(); 
        this.snackBar.open('User logged in successfullly!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['/movies']); // Use an absolute path
      },
      error: (error) => {
        this.snackBar.open(`Login unsuccessful: ${error.error}`, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}

