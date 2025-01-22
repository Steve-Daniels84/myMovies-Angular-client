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
}