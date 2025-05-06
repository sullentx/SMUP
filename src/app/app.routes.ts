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
      {
        path: 'medic-consultation',
        loadComponent: () => import('./features/consultation/components/pages/medic-consultation/medic-consultation.component')
          .then(c => c.ConsultationPageComponent)
      },
      {
        path: 'medic-intervention',
        loadComponent: () => import('./features/consultation/components/pages/medic-intervention/medic-intervention.component')
          .then(c => c.MedicInterventionPageComponent)
      },
      {
        path: 'medic-canalization',
        loadComponent: () => import('./features/consultation/components/pages/medic-canalization/medic-canalization.component')
          .then(c => c.MedicCanalizationPageComponent)
      },
      {
        path: 'medic-order',
        loadComponent: () => import('./features/consultation/components/pages/medic-order/medic-order.component')
          .then(c => c.MedicOrderPageComponent)
      },
      {
        path: 'medic-prescription',
        loadComponent: () => import('./features/consultation/components/pages/medic-prescription/medic-prescription.component')
          .then(c => c.MedicPrescriptionPageComponent)
      },
      {
        path: 'medic-order-register',
        loadComponent: () => import('./features/consultation/components/pages/medic-order-register/medic-order-register.component')
          .then(c => c.MedicOrderRegisterPageComponent)
      },
      {
        path: 'general-catalog',
        loadComponent: () => import('./features/catalogs/components/pages/general-catalog/general-catalog.component')
          .then(c => c.GeneralCatalogPageComponent)
      },
      {
        path: 'study-catalog',
        loadComponent: () => import('./features/catalogs/components/pages/study-catalog/study-catalog.component')
          .then(c => c.StudyCatalogPageComponent)
      },
      { path: '', redirectTo: 'medications', pathMatch: 'full' }
    ]
  }
];
