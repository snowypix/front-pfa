import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivitiesService } from '../activities.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Activity {
  intitule: string;
  type: string;
  matiere: string;
  dateRemise: string;
  files: File[];
  created_at: string;
  class: string;
  group: string;
  description: string;
}

@Component({
  selector: 'app-create-activity',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-activity.component.html',
  styleUrl: './create-activity.component.css'
})
export class CreateActivityComponent {
  fileControls: FormControl[] = [];
  data: Activity;

  constructor(
    private formBuilder: FormBuilder,
    private activitiesService: ActivitiesService,
    private http: HttpClient
  ) {
    this.data = {
      intitule: '',
      type: '',
      matiere: '',
      dateRemise: '',
      files: [],
      created_at: '',
      class: '',
      group: '',
      description: ''
    };
  }

  addFileInput() {
    const fileControl = this.formBuilder.control(null);
    this.fileControls.push(fileControl);
  }

  onSubmit() {
    const activity: Activity = {
      intitule: this.data.intitule,
      type: this.data.type,
      matiere: 'this.data.matiere',
      dateRemise: this.data.dateRemise,
      files: this.getFileData(),
      created_at: this.data.created_at,
      class: 'this.data.class',
      group: 'this.data.group',
      description: this.data.description
    };
    console.log(this.getFileData);

    this.activitiesService.create(activity).subscribe(
      (response: any) => {
        // Handle successful response
      },
      (error) => {
        // Handle error
      }
    );
  }

  private getFileData(): File[] {
    const fileData: File[] = [];
    const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    fileInputs.forEach((input: HTMLInputElement) => {
      if (input.files && input.files.length > 0) {
        for (let i = 0; i < input.files.length; i++) {
          fileData.push(input.files[i]);
        }
      }
    });
    return fileData;
  }
}