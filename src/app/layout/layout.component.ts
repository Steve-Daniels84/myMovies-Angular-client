import { Component } from '@angular/core';
import { HeaderBarComponent } from "../header-bar/header-bar.component";
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    HeaderBarComponent,
    RouterModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
