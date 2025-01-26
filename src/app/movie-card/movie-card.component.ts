import { Component } from '@angular/core';
import { fetchApiDataService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgFor, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MovieDalogComponent } from '../movie-dalog/movie-dalog.component';

/**
 * The `MovieCardComponent` is responsible for displaying a list of movies.
 * It fetches movie data from an API, renders them in cards, and provides an option to view detailed information about each movie in a dialog.
 */
@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    MatCardModule,    // Provides card UI components for displaying movie information.
    MatDialogModule,  // Enables the use of dialogs for displaying movie details.
    NgFor,            // Used for iterating over the movie array in the template.
    CommonModule,     // Provides common Angular directives like `ngIf` and `ngFor`.
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  /**
   * Array to store the list of movies fetched from the API.
   */
  movies: any[] = [];

  /**
   * Creates an instance of `MovieCardComponent`.
   * @param fetchApiData - Service for fetching movie data from the API.
   * @param dialog - Service for opening dialogs to show movie details.
   * @param router - Router for navigation within the application (not used in this component currently but available for future extensions).
   */
  constructor(
    public fetchApiData: fetchApiDataService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that is invoked when the component is initialized.
   * Calls the `getMovies` method to fetch the list of movies.
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Fetches the list of movies from the API using the `fetchApiData` service.
   * The response is assigned to the `movies` array, which is then displayed in the template.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * Opens a dialog displaying detailed information about a selected movie.
   * @param movie - The movie object containing details to be displayed.
   */
  openDetailsDialog(movie: object): void {
    this.dialog.open(MovieDalogComponent, {
      data: movie,      // Passes the movie data to the dialog component.
      width: '900px',   // Sets the width of the dialog.
    });
  }
}