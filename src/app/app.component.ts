import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  token: string | null = '';
  title = 'myMovies-Angular-client';

  constructor(
    @Inject(MatDialog) public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      this.authService.setToken(token);  // Set the token in the auth service
      this.router.navigate(['/movies']);  // Navigate to the movies route (or wherever appropriate)
    } else {
      this.router.navigate(['']);  // Redirect to login page if no token
    }
}
}