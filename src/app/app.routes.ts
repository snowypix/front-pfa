import { Routes } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityComponent } from './activity/activity.component';
import { LoginComponent } from './login/login.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'activities', component: ActivitiesComponent },
    { path: 'activity/create', component: CreateActivityComponent },
    { path: 'activity/:id', component: ActivityComponent },
    { path: 'admin', component: AdminPageComponent },
    { path: '**', component: LoginComponent }
];
