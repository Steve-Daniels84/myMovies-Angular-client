import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-dalog',
  templateUrl: './movie-dalog.component.html',
  styleUrls: ['./movie-dalog.component.scss'],
})



export class MovieDalogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {console.log(data);}


  
}