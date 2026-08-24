import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProjectDetails } from './pages/project-details/project-details';
import { CertificationDetails } from './pages/certification-details/certification-details';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    data: { seo: 'home' }
  },
  {
    path: 'projects/:id',
    component: ProjectDetails,
    data: { seo: 'project' }
  },
  {
    path: 'certifications/:id',
    component: CertificationDetails,
    data: { seo: 'certification' }
  },
  {
    path: '**',
    component: NotFound,
    data: { seo: 'notFound' }
  }
];
