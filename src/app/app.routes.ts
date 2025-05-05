import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/components/pages/home-page/home-page.component')
          .then(c => c.HomePageComponent)
      },
      {
        path: 'medications',
        children: [
          {
            path: '',
            loadComponent: () => import('./features/medications/components/pages/medication-list/medication-list.component')
              .then(c => c.MedicationListComponent)
          },
          {
            path: 'new',
            loadComponent: () => import('./features/medications/components/pages/medication-form/medication-form.component')
              .then(c => c.MedicationFormComponent)
          },
          {
            path: ':id',
            loadComponent: () => import('./features/medications/components/pages/medication-form/medication-form.component')
              .then(c => c.MedicationFormComponent)
          }
        ]
      },
      {
        path: 'registros/alumnos',
        loadComponent: () => import('./features/registros/alumnos/pages/alumnos-page/alumnos-page.component')
          .then(c => c.AlumnosPageComponent)
      },
      {
        path: 'registros/up',
        loadComponent: () => import('./features/registros/personal-up/pages/personal-up-page/personal-up-page.component')
          .then(c => c.PersonalUpPageComponent)
      },
      {
        path: 'registros/pasantes',
        loadComponent: () => import('./features/registros/pasantes/pages/pasantes-page/pasantes-page.component')
          .then(c => c.PasantesPageComponent)
      },
      {
        path: 'registros/externo',
        loadComponent: () => import('./features/registros/personal-externo/pages/personal-externo-page/personal-externo-page.component')
          .then(c => c.PersonalExternoPageComponent)
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];