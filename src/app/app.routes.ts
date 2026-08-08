import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProjectDetails } from './pages/project-details/project-details';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'projects/:id',
    component: ProjectDetails
  }
];
