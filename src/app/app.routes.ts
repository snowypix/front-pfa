import { Routes } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityComponent } from './activity/activity.component';
import { ActivitiesEtudComponent } from './activities-etud/activities-etud.component';
import { ActivityEtudComponent } from './activity-etud/activity-etud.component';
import { LoginComponent } from './login/login.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SubmissionsPageComponent } from './submissions-page/submissions-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'activities', component: ActivitiesComponent },
    { path: 'studentactivities', component: ActivitiesEtudComponent },
    { path: 'activity/create', component: CreateActivityComponent },
    { path: 'activity/:id', component: ActivityEtudComponent },
    { path: 'homeworks', component: ActivitiesEtudComponent },
    { path: 'homeworks/:id', component: ActivityEtudComponent },
    { path: 'submissions', component: SubmissionsPageComponent },
    { path: 'admin', component: AdminPageComponent },
    { path: '**', component: LoginComponent }
];
