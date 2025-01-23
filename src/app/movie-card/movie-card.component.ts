import { Component, Inject, OnInit } from '@angular/core';
import { fetchApiDataService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgFor, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MovieDalogComponent } from '../movie-dalog/movie-dalog.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatDialogModule,
    NgFor,
    CommonModule,
    MatDialogModule 
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})

export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: fetchApiDataService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  openDetailsDialog(movie: object): void {
    this.dialog.open(MovieDalogComponent, {
      data: movie,
      width: '900px'
    });
  }

}
