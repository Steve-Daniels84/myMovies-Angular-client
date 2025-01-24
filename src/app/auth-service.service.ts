import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static getToken() {
    throw new Error('Method not implemented.');
  }
  private isBrowser: boolean;

  constructor() {
    // Check if we are in the browser environment
    this.isBrowser = typeof window !== 'undefined';
  }

  // Set token in localStorage
  setToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
    }
  }

  // Get token from localStorage
  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Remove token from localStorage
  removeToken(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
  }

  //Add Favourites to localStorage
  setFavouriteMovies(favourites: Array<string>): void {
    if (this.isBrowser) {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  }

  //Remove Favourites from localStorage
  removeFavouriteMovies(): void {
    if (this.isBrowser) {
      localStorage.removeItem('favourites');
    }
  }

  //Set username to localStorage
  setUsername(username: string): void {
    if (this.isBrowser) {
      localStorage.setItem('username', username);
    }
  }

  //Get username from localStorage
  getUsername(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('username');
    }
    return null;
  }

  //Remove username from localStorage
  removeUsername(): void {
    if (this.isBrowser) {
      localStorage.removeItem('username');
    }
  }

  //Add user ID to localStorage
  setUserID(userID: string): void {
    if (this.isBrowser) {
      localStorage.setItem('userID', userID);
    }
  }

  //Remove user ID from localStorage
  removeUserID(): void {
    if (this.isBrowser) {
      localStorage.removeItem('userID');
    }
  }

  //Get user ID from localStorage
  getUserID(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('userID');
    }
    return null;
  }
}