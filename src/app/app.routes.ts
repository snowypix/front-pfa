import { Routes } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityComponent } from './activity/activity.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'activities', component: ActivitiesComponent },
    { path: 'activity/:id', component: ActivityComponent },
    { path: '**', component: LoginComponent }
];
