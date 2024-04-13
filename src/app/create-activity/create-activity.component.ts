import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivitiesService } from '../activities.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxFileDropComponent, NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { log } from 'console';

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
interface FileName {
  fileName: string
}
@Component({
  selector: 'app-create-activity',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxFileDropModule],
  templateUrl: './create-activity.component.html',
  styleUrl: './create-activity.component.css'
})
export class CreateActivityComponent {
  data: Activity;
  filepath: FileName
  public files: NgxFileDropEntry[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private activitiesService: ActivitiesService,
    private http: HttpClient
  ) {
    this.data = {
      intitule: '',
      type: '',
      matiere: 'xx',
      dateRemise: '',
      created_at: '',
      class: 'x',
      group: 'x',
      description: '',
      filePaths: ''
    };
    this.filepath = { fileName: '' }
  }
  public uploadFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file)
          // Headers
          // Get the token from wherever you have stored it (e.g., local storage, a service, etc.)
          const token = localStorage.getItem('token'); // Replace with your actual token

          // Add the token to the request headers
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          this.http.post('http://localhost:8000/api/activities/create/file', formData, { headers: headers })
            .subscribe(
              response => {
                this.filepath = response as FileName
              })

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }



  }

  onSubmit() {
    this.data.filePaths = "http://localhost:8000/uploads/" + this.filepath.fileName
    console.log(this.data);

    this.activitiesService.create(this.data).subscribe(
      (response: any) => {

      },
      (error) => {
      }
    );
  }
  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }
}