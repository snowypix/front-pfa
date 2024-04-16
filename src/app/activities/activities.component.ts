import { Component } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { ActivitiesService } from '../activities.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Activity {
  intitule: string,
  type: string,
  matiere: string,
  dateRemise: string,
  filePaths: string,
  created_at: string,
  class: string,
  group: string,
}

@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent {
  activities: Activity[] = [];
  originalActivities: Activity[] = [];
  filteredActivities: Activity[] = [];
  uniqueGroups: string[] = [];
  uniqueClasses: string[] = [];
  uniqueMatieres: string[] = [];
  decodedToken: any;
  filters = {
    matiere: '',
    class: '',
    group: '',
  }
  constructor(private activitiesService: ActivitiesService, private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodedToken = jwtDecode(token);
      console.log(this.decodedToken as { name: string, role: string });

      if (this.decodedToken.role == 'admin') {
        this.router.navigate(['admin'])
      }
      this.activitiesService.getAll().subscribe(
        response => {
          this.activities = response as Activity[];
          this.uniqueGroups = Array.from(new Set(this.activities.map(activity => activity.group)));
          this.uniqueClasses = Array.from(new Set(this.activities.map(activity => activity.class)));
          this.uniqueMatieres = Array.from(new Set(this.activities.map(activity => activity.matiere)));
          this.originalActivities = [...this.activities];
        },
        error => {
          // this.errorMessage = "Server error" // Error handling
        }
      );
    } else {
      this.router.navigate(['login'])
    }
  }

  filter() {
    let filteredResults = this.originalActivities;

    if (this.filters.group !== 'all') {
      filteredResults = filteredResults.filter(activity => activity.group === this.filters.group);
    }
    console.log(filteredResults);

    if (this.filters.class !== 'all') {
      filteredResults = filteredResults.filter(activity => activity.class === this.filters.class);
    }
    console.log(filteredResults);
    if (this.filters.matiere !== 'all') {
      filteredResults = filteredResults.filter(activity => activity.matiere === this.filters.matiere);
    }
    console.log(filteredResults);
    this.activities = filteredResults;
  }
  nouvelle() {
    this.router.navigate(["activity/create"], {
      queryParams: {
        group: this.filters.group,
        class: this.filters.class,
        matiere: this.filters.matiere
      }
    });
  }
}