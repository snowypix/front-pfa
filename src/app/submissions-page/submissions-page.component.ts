import { Component } from '@angular/core';
import { ActivitiesService } from '../activities.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
interface Submissions {
  activity_id: number,
  intitule: string,
  matiere: string,
  filePaths: string,
  class: string,
  group: string,
  student: string
}

@Component({
  selector: 'app-submissions-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submissions-page.component.html',
  styleUrl: './submissions-page.component.css'
})
export class SubmissionsPageComponent {
  data: Submissions[] = [];
  filePaths: string[] = [];
  ngOnInit() {
    this.activitiesService.getAllSubmissions().subscribe(
      response => {
        this.data = response as Submissions[];
      },
      error => { }
    )

  }
  constructor(private activitiesService: ActivitiesService, private router: Router) {

  }
  getParsedFilePaths(submission: Submissions): string[] {
    // Parse the JSON string from filePaths
    try {
      const parsedPaths = JSON.parse(submission.filePaths);
      return parsedPaths;
    } catch (error) {
      console.error('Error parsing filePaths:', error);
      return []; // Return empty array on parsing error
    }
  }

  getFileUrl(filePath: string): string {
    // Assuming you have a base URL for file access (replace with your actual logic)
    const baseUrl = 'http://localhost:8000/api/files/';
    return baseUrl + filePath;
  }
}
