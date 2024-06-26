import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivitiesService } from '../activities.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

interface Activity {
  intitule: string;
  type: string;
  matiere: string;
  dateRemise: string;
  created_at: string;
  class: string;
  group: string;
  description: string;
  filePaths: string;
}

@Component({
  selector: 'app-activity-etud',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './activity-etud.component.html',
  styleUrls: ['./activity-etud.component.css']
})
export class ActivityEtudComponent {
  matiere = this.route.snapshot.queryParams['matiere'];
  class = this.route.snapshot.queryParams['class'];
  group = this.route.snapshot.queryParams['group'];
  activity: Activity = {
    intitule: '',
    type: '',
    matiere: '',
    dateRemise: '',
    created_at: '',
    class: '',
    group: '',
    description: '',
    filePaths: ""
  };
  errorPage: boolean = false;
  fileInputs: any[] = [{ id: 0, file: null }];
  activityId: string | null;
  workSubmitted: string = '';
  dateNow = new Date();
  lateSubmit: boolean = false;
  downloadUrl: string = '';
  filePaths: string[] = [];
  Loading: boolean = true;
  decodedToken: any;
  constructor(
    private activitiesService: ActivitiesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.activityId = "";
  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const formattedDate = this.dateNow.toISOString().slice(0, 19).replace('T', ' ');
      this.activityId = this.route.snapshot.paramMap.get('id');
      this.activitiesService.getbyId(this.activityId).subscribe({
        next: (response) => {
          this.activity = response as Activity;
          this.Loading = false;
          // Check deadline after activity is retrieved
          if (formattedDate > this.activity.dateRemise) {
            if (this.activity.type == 'Travail à rendre')
              this.lateSubmit = true;
          }
          this.filePaths = JSON.parse(this.activity.filePaths);
          this.decodedToken = jwtDecode(token);
          if (this.decodedToken.role != 'student') {
            this.router.navigate(['activities'])
          }
        },
        error: (error) => {
          console.error('Error fetching activities:', error);
          this.router.navigate(['activities'])
        }
      }
      )
      this.activitiesService.SeenOnce(this.activityId).subscribe(
        response => {
        },
        error => console.log("not ok")
      );
      this.activitiesService.checkWork(this.activityId).subscribe(
        {
          next: (response) => {
            this.workSubmitted = response.status; // Assigning response to variable
          },
          error: (error) => {
            console.error('Error fetching submission status:', error);
          }
        }
      )
    }

  }
  addFileInput() {
    const newFileId = this.fileInputs.length;
    this.fileInputs.push({ id: newFileId, file: null });
  }

  removeFileInput(fileId: number) {
    this.fileInputs = this.fileInputs.filter(fileInput => fileInput.id !== fileId);
  }

  handleFileInput(event: any, inputId: number) {
    if (event.target.files.length > 0) {
      this.fileInputs[inputId].file = event.target.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();

    this.fileInputs.forEach((input, index) => {
      if (input.file) {
        formData.append(`filePaths[]`, input.file, input.file.name);
      }
    });

    this.activitiesService.createWork(formData, this.activityId).subscribe(
      response => this.router.navigate(['activities']),
      error => console.error('Error submitting activity', error)
    );
  }


  annuler() {
    this.router.navigate(['activities']);
  }
}
