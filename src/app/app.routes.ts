// filepath: c:\Users\eduar\Desktop\Universidad\5to Cuatri\ESTANCIA 1\SMUP\src\app\app.routes.ts
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'medications',
        loadComponent: () => import('./features/medications/components/pages/medication-list/medication-list.component')
          .then(c => c.MedicationListComponent)
      },
      { path: '', redirectTo: 'medications', pathMatch: 'full' }
    ]
  }
];