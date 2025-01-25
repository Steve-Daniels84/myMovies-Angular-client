import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule, NgIf } from '@angular/common';
import { fetchApiDataService } from '../fetch-api-data.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, NgIf, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  @Input() userData = { Username: '', Email: '' };
  edit = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public fetchApiData: fetchApiDataService, public snackBar: MatSnackBar,
) {
    
   }

  ngOnInit(): void {
    this.userData.Username = this.data.Username;
    this.userData.Email = this.data.Email;
  }

  toggleEditMode() {
    this.edit = !this.edit;
  }

  saveChanges() {
    this.fetchApiData.updateUserDetails(this.data._id, this.userData).subscribe((response) => {(response: any) => {console.log(response);}});
    this.toggleEditMode();
  }
}