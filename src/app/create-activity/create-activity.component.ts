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
  selector: 'app-create-activity',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent {
  matiere = this.route.snapshot.queryParams['matiere'];
  class = this.route.snapshot.queryParams['class'];
  group = this.route.snapshot.queryParams['group'];
  data: Activity = {
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
  fileInputs: any[] = [{ id: 0, file: null }];

  constructor(
    private activitiesService: ActivitiesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

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
    formData.append('intitule', this.data.intitule);
    formData.append('matiere', this.matiere);
    formData.append('class', this.class);
    formData.append('group', this.group);
    formData.append('type', this.data.type);
    formData.append('description', this.data.description);
    formData.append('dateRemise', this.data.dateRemise || '');

    this.fileInputs.forEach((input, index) => {
      if (input.file) {
        formData.append(`filePaths[]`, input.file, input.file.name);
      }
    });

    this.activitiesService.create(formData).subscribe(
      response => this.router.navigate(['activities']),
      error => console.error('Error submitting activity', error)
    );
  }


  annuler() {
    this.router.navigate(['activities']);
  }
}
