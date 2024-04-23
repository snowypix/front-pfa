import { Routes } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityComponent } from './activity/activity.component';
import { ActivitiesEtudComponent } from './activities-etud/activities-etud.component';
import { ActivityEtudComponent } from './activity-etud/activity-etud.component';
import { LoginComponent } from './login/login.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'activities', component: ActivitiesComponent },
    { path: 'activity/create', component: CreateActivityComponent },
    { path: 'activity/:id', component: ActivityComponent },
    { path: 'homeworks', component: ActivitiesEtudComponent },
    { path: 'homeworks/:id', component: ActivityEtudComponent },
    { path: 'admin', component: AdminPageComponent },
    { path: '**', component: LoginComponent }
];
