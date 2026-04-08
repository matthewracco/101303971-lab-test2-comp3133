import { Routes } from '@angular/router';
import { MissionDetailsComponent } from './components/missiondetails/missiondetails.component';
import { MissionListComponent } from './components/missionlist/missionlist.component';

export const routes: Routes = [
  { path: '', component: MissionListComponent },
  { path: 'missions/:id', component: MissionDetailsComponent },
  { path: '**', redirectTo: '' }
];
