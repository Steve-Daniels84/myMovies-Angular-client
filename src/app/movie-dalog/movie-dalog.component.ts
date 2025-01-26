import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { fetchApiDataService } from '../fetch-api-data.service';
import { AuthService } from '../auth-service.service';

/**
 * The `MovieDalogComponent` displays detailed information about a selected movie
 * and allows users to add or remove the movie from their list of favorites.
 */
@Component({
  selector: 'app-movie-dalog',
  imports: [MatIconModule, CommonModule], // Imports required for material icons and Angular common functionalities.
  templateUrl: './movie-dalog.component.html',
  styleUrls: ['./movie-dalog.component.scss'],
})
export class MovieDalogComponent {
  /**
   * Boolean value indicating whether the movie is marked as a favorite by the user.
   */
  isFavourite = false;

  /**
   * Stores the user's unique ID, retrieved from the authentication service.
   */
  userId: string | null;

  /**
   * Creates an instance of `MovieDalogComponent`.
   * @param data - The data injected into the dialog, containing the movie details.
   * @param fetchApiData - Service for fetching data from the API.
   * @param authService - Service for managing authentication and user data.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: fetchApiDataService,
    private authService: AuthService
  ) {
    // Retrieve the user ID from the authentication service.
    this.userId = this.authService.getUserID();

    // Retrieve the list of favorite movies from local storage.
    const favorites = this.getFavouriteMoviesFromLocalStorage();

    // Check if the current movie is in the user's list of favorites.
    this.isFavourite = favorites.includes(this.data._id);
  }

  /**
   * Retrieves the list of favorite movies from local storage.
   * @returns An array of movie IDs marked as favorites.
   */
  getFavouriteMoviesFromLocalStorage(): string[] {
    const favorites = localStorage.getItem('favourites');
    return favorites ? JSON.parse(favorites) : [];
  }

  /**
   * Adds or removes the current movie from the user's list of favorites.
   * Updates both the local storage and the database.
   */
  setUnsetFavourite(): void {
    // Retrieve the current list of favorite movies.
    let favorites = this.getFavouriteMoviesFromLocalStorage();

    if (this.isFavourite) {
      // Remove the movie from the list of favorites.
      if (this.userId) {
        this.fetchApiData
          .removeFavouriteMovie(this.userId, this.data._id) // Remove the movie from the database.
          .subscribe(() => {
            favorites = favorites.filter((id) => id !== this.data._id); // Update the local favorites array.
            this.authService.setFavouriteMovies(favorites); // Update local storage.
            this.isFavourite = !this.isFavourite; // Toggle the favorite status.
          });
      }
    } else {
      // Add the movie to the list of favorites.
      if (this.userId) {
        this.fetchApiData
          .addFavouriteMovie(this.userId, this.data._id) // Add the movie to the database.
          .subscribe(() => {
            favorites.push(this.data._id); // Add the movie to the local favorites array.
            this.authService.setFavouriteMovies(favorites); // Update local storage.
            this.isFavourite = !this.isFavourite; // Toggle the favorite status.
          });
      }
    }
  }
}