import { Component } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { ActivitiesService } from '../activities.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { response } from 'express';

interface Activity {
  id: number,
  intitule: string,
  type: string,
  matiere: string,
  dateRemise: string,
  filePaths: string,
  created_at: string,
  class: string,
  group: string,
  lecture: string
}

@Component({
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  selector: 'app-activities',
  templateUrl: './activities-etud.component.html',
  styleUrls: ['./activities-etud.component.css']
})
export class ActivitiesEtudComponent {
  activities: Activity[] = [];
  originalActivities: Activity[] = [];
  filteredActivities: Activity[] = [];
  uniqueMatieres: string[] = [];
  decodedToken: any;
  cardView: boolean = false;
  filters = {
    semestre: '',
    matiere: '',
    lecture: '',
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
  Seen(id: number, event: MouseEvent) {
    event.stopPropagation();
    // Find the index of the activity by its id
    const index = this.activities.findIndex(activity => activity.id === id);
    if (index !== -1) {
      // Update the lecture property based on its current value
      if (this.activities[index].lecture === 'lu') {
        this.activities[index].lecture = 'non lu';
      } else {
        this.activities[index].lecture = 'lu';
      }
    }
    this.activitiesService.Seen(id).subscribe(
      response => {
      },
      error => console.log("not ok")
    );
  }

  filter() {
    let filteredResults = this.originalActivities;
    this.activities.forEach(function (activity) {
      const dateObject = new Date(activity.created_at);

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

    if (this.filters.lecture !== 'all') {
      if (this.filters.lecture == 'lu') {
        filteredResults = filteredResults.filter(activity => activity.lecture === this.filters.lecture);
      } else {
        filteredResults = filteredResults.filter(activity => activity.lecture === null);
      }
    }

    if (this.filters.matiere !== 'all') {
      filteredResults = filteredResults.filter(activity => activity.matiere === this.filters.matiere);
    }

    this.activities = filteredResults;
  }
  nouvelle() {
    this.router.navigate(["activity/create"], {
      queryParams: {
        matiere: this.filters.matiere,
        semester: this.filters.semestre
      }
    });
  }
}