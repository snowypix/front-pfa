import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivitiesService } from '../activities.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Activity {
  intitule: string;
  type: string;
  matiere: string;
  dateRemise: string;
  created_at: string;
  class: string;
  group: string;
  description: string;
  filePaths: File[];
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
    filePaths: []
  };
  errorPage: boolean = false;
  fileInputs: any[] = [{ id: 0, file: null }];
  activityId: string | null;
  workSubmitted: string = '';
  constructor(
    private activitiesService: ActivitiesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.activityId = "";
  }
  ngOnInit() {
    this.activityId = this.route.snapshot.paramMap.get('id');
    this.activitiesService.getbyId(this.activityId).subscribe(
      response => this.activity = response as Activity,
      error => this.router.navigate(["studentactivities"])
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
