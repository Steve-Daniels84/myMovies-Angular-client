import { Component } from '@angular/core';
import { HeaderBarComponent } from "../header-bar/header-bar.component";
import { RouterModule } from '@angular/router';

/**
 * The `LayoutComponent` serves as a wrapper for the application's main layout structure.
 * It includes shared components like the header and provides routing capabilities.
 */
@Component({
  selector: 'app-layout',
  imports: [
    HeaderBarComponent, // Includes the HeaderBarComponent for the application's header.
    RouterModule        // Provides routing functionality for the application.
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  // Currently, this component does not have any logic or state.
  // It serves as a structural component for the application layout.
}