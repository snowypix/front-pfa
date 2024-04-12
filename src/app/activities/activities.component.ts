import { Component } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent {
  constructor(private activitiesService: ActivitiesService) {

  }
  decodedToken: any
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodedToken = jwtDecode(token);
      console.log(this.decodedToken); // Output the decoded token to the console
      this.activitiesService.getAll().subscribe(
        response => {

        },
        error => {
          // this.errorMessage = "Server error" // Error handling
        }
      );

    } else {
      console.log("not logged in");
    }
  }
}