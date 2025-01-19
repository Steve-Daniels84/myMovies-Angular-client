import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://mymovies-api-d8738180d851.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class fetchApiDataService {
  constructor(private http: HttpClient) {}

  //Handle errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message
    return throwError('Something went wrong. Please try again later.');
  }

  //User registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  //User login
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      map((response: any) => {
        if (response && response.token) {
          // Store the token in local storage
          localStorage.setItem('token', response.token);
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  //Get all movies
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  //Get a movie by title
  public getMovieByTitle(title: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  //Update movie Genre
  public updateMovieGenre(title: String, genre: String): Observable<any> {
    const token = localStorage.getItem('token');
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

  //Add new movie
  public addMovie(movieDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(apiUrl + 'movies', movieDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  //Delete movie by ID
  public deleteMovie(title: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  //Get all users
  public getAllUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  //Get user by ID
  public getUserById(username: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  //Update user details
  public updateUserDetails(
    username: String,
    userDetails: any
  ): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + `users/${username}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  //Add favourite movie to user
  public addFavouriteMovie(username: String, movieId: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(
        apiUrl + `users/${username}/movies/${movieId}`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  //Remove favourite movie from user
  public removeFavouriteMovie(
    username: String,
    movieId: String
  ): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }
}
