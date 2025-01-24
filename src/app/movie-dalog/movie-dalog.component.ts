import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { fetchApiDataService } from '../fetch-api-data.service';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-movie-dalog',
  imports: [MatIconModule, CommonModule],
  templateUrl: './movie-dalog.component.html',
  styleUrls: ['./movie-dalog.component.scss'],
})
export class MovieDalogComponent {
  isFavourite = false;
  userId: string | null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: fetchApiDataService,
    private authService: AuthService
  ) {
    // Get username from auth service
    this.userId = this.authService.getUserID();

    // Retrieve favorite movies from local storage
    const favorites = this.getFavouriteMoviesFromLocalStorage();
    this.isFavourite = favorites.includes(this.data._id);
  }

  // Retrieves favorite movies from local storage
  getFavouriteMoviesFromLocalStorage(): string[] {
    const favorites = localStorage.getItem('favourites');
    return favorites ? JSON.parse(favorites) : [];
  }

  // Add or remove a movie from favorites
  setUnsetFavourite(): void {
    // Retrieve current favorites
    let favorites = this.getFavouriteMoviesFromLocalStorage();

    if (this.isFavourite) {
      // Remove from favorites
      if (this.userId) {
        this.fetchApiData
          .removeFavouriteMovie(this.userId, this.data._id) //Update user favourite on db
          .subscribe(() => {
            favorites = favorites.filter((id) => id !== this.data._id); //Remove movie from favorites variable
            this.authService.setFavouriteMovies(favorites); //Update local storage
            this.isFavourite = !this.isFavourite; //Toggle isFavourite
          });
      }
    } else {
      // Add to favorites
      if (this.userId) {
        this.fetchApiData
          .addFavouriteMovie(this.userId, this.data._id) //Update user favourite on db
          .subscribe((event) => {
            favorites.push(this.data._id); //Add movie to favorites variable
            this.authService.setFavouriteMovies(favorites); //Update local storage
            this.isFavourite = !this.isFavourite; //Toggle isFavourite
          });
      }
    }
  }
}
