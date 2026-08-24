import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    data: { seo: 'home' }
  },
  {
    path: 'projects/:id',
    loadComponent: () => import('./pages/project-details/project-details').then((module) => module.ProjectDetails),
    data: { seo: 'project' }
  },
  {
    path: 'certifications/:id',
    loadComponent: () => import('./pages/certification-details/certification-details').then((module) => module.CertificationDetails),
    data: { seo: 'certification' }
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((module) => module.NotFound),
    data: { seo: 'notFound' }
  }
];
