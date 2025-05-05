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
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];