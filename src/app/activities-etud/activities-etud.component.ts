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
  templateUrl: './activities-etud.component.html',
  styleUrls: ['./activities-etud.component.css']
})
export class ActivitiesEtudComponent {
  activities: Activity[] = [];
  originalActivities: Activity[] = [];
  filteredActivities: Activity[] = [];
  uniqueGroups: string[] = [];
  uniqueClasses: string[] = [];
  uniqueMatieres: string[] = [];
  decodedToken: any;
  filters = {
    semestre: '',
    matiere: '',
    class: '',
    group: '',
  }
  currentDate: Date;
  currentYear: number;
  nextYear: any;
  isLoading: boolean;
  error: boolean;
  constructor(private activitiesService: ActivitiesService, private router: Router) {
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
    this.nextYear = this.currentDate.getFullYear() + 1;
    this.isLoading = true;
    this.error = false;
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodedToken = jwtDecode(token);

      if (this.decodedToken.role == 'admin') {
        this.router.navigate(['admin'])
      }
      this.activitiesService.getAll().subscribe(
        response => {
          this.isLoading = false;
          this.activities = response as Activity[];
          this.uniqueGroups = Array.from(new Set(this.activities.map(activity => activity.group)));
          this.uniqueClasses = Array.from(new Set(this.activities.map(activity => activity.class)));
          this.uniqueMatieres = Array.from(new Set(this.activities.map(activity => activity.matiere)));
          this.originalActivities = [...this.activities];
        },
        error => {
          this.isLoading = false;
          this.error = true;
        }
      );
    } else {
      this.router.navigate(['login'])
    }
  }

  filter() {
    let filteredResults = this.originalActivities;
    this.activities.forEach(function (activity) {
      const dateObject = new Date(activity.created_at);
      console.log(dateObject.getMonth());

    })

    if (this.filters.semestre !== 'all') {
      if (this.filters.semestre === '1') {

        filteredResults = filteredResults.filter(activity => {
          const createdAtDate = new Date(activity.created_at);
          const createdAtMonth = createdAtDate.getMonth();
          const isMonthBetweenOctoberAndFebruary = (createdAtMonth >= 9 && createdAtMonth <= 11) || (createdAtMonth >= 0 && createdAtMonth <= 1);
          return isMonthBetweenOctoberAndFebruary;
        });
      }
      if (this.filters.semestre === '2') {

        filteredResults = filteredResults.filter(activity => {
          const createdAtDate = new Date(activity.created_at);
          const createdAtMonth = createdAtDate.getMonth();
          const isMonthBetweenMarchAndMay = (createdAtMonth >= 2 && createdAtMonth <= 4);
          return isMonthBetweenMarchAndMay;
        });
      }
    }

    if (this.filters.group !== 'all') {
      filteredResults = filteredResults.filter(activity => activity.group === this.filters.group);
    }

    if (this.filters.class !== 'all') {
      filteredResults = filteredResults.filter(activity => activity.class === this.filters.class);
    }

    if (this.filters.matiere !== 'all') {
      filteredResults = filteredResults.filter(activity => activity.matiere === this.filters.matiere);
    }

    this.activities = filteredResults;
  }
  nouvelle() {
    this.router.navigate(["activity/create"], {
      queryParams: {
        group: this.filters.group,
        class: this.filters.class,
        matiere: this.filters.matiere,
        semester: this.filters.semestre
      }
    });
  }
}