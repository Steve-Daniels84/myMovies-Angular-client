import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth-service.service';  // Import AuthService

const apiUrl = 'https://mymovies-api-d8738180d851.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class fetchApiDataService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  /// Handle errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    // Check if it's a client-side error (network issue, etc.)
    if (error.error instanceof Error) {
      console.error('A client-side or network error occurred:', error.error.message);
    } else {
      // Handle server-side errors (HTTP response status >= 400)
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }

    // Return a user-friendly error message and throw it as an observable
    let errorMessage = 'Something went wrong. Please try again later.';
    
    // Optionally, customize the error message based on status code or other factors
    if (error.status === 404) {
      errorMessage = 'Requested resource not found.';
    } else if (error.status === 500) {
      errorMessage = 'Server error, please try again later.';
    }
    
    // Use the updated syntax for throwing an error observable
    return throwError(() => new Error(errorMessage));  // Throws a new error object
  }

  // User registration
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // User login
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      map((response: any) => {
        if (response && response.token) {
          // Store the token via AuthService
          this.authService.setToken(response.token);  // Using AuthService for token management
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    const token = this.authService.getToken();  // Fetch token from AuthService
    
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Get a movie by title
  public getMovieByTitle(title: String): Observable<any> {
    const token = this.authService.getToken();  // Fetch token from AuthService
    return this.http
      .get(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Update movie Genre
  public updateMovieGenre(title: String, genre: String): Observable<any> {
    const token = this.authService.getToken();  // Fetch token from AuthService
    return this.http
      .put(
        apiUrl + `movies/${title}`,
        { Genre: genre },
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  // Add new movie
  public addMovie(movieDetails: any): Observable<any> {
    const token = this.authService.getToken();  // Fetch token from AuthService
    return this.http
      .post(apiUrl + 'movies', movieDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Delete movie by ID
  public deleteMovie(title: String): Observable<any> {
    const token = this.authService.getToken();  // Fetch token from AuthService
    return this.http
      .delete(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Get all users
  public getAllUsers(): Observable<any> {
    const token = this.authService.getToken();  // Fetch token from AuthService
    return this.http
      .get(apiUrl + 'users', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Get user by ID
  public getUserById(username: String): Observable<any> {
    const token = this.authService.getToken();  // Fetch token from AuthService
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Update user details
  public updateUserDetails(
    username: String,
    userDetails: any
  ): Observable<any> {
    const token = this.authService.getToken();  // Fetch token from AuthService
    return this.http
      .put(apiUrl + `users/${username}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Add favourite movie to user
  public addFavouriteMovie(userId: String, movieId: String): Observable<any> {
    const token = this.authService.getToken();  // Fetch token from AuthService
    return this.http
      .post(
        apiUrl + `users/${userId}/${movieId}`,
        null,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  // Remove favourite movie from user
  public removeFavouriteMovie(
    userId: String,
    movieId: String
  ): Observable<any> {
    const token = this.authService.getToken();  // Fetch token from AuthService
    return this.http
      .delete(apiUrl + `users/${userId}/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }
}