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
      {
        path: 'profile',
        loadComponent: () => import('./features/user/components/profile-page/profile-page.component')
          .then(c => c.ProfilePageComponent)
      },
      {
        path: 'surveys',
        loadComponent: () => import('./features/surveys/components/pages/surveys-home/surveys-home.component')
          .then(c => c.SurveysHomeComponent)
      },
      {
        path: 'surveys/create',
        loadComponent: () => import('./features/surveys/components/pages/create-survey/create-survey.component')
          .then(c => c.CreateSurveyComponent)
      },
      {
        path: 'surveys/assign-questions',
        loadComponent: () => import('./features/surveys/components/pages/assign-questions/assign-questions.component')
          .then(c => c.AssignQuestionsComponent)
      },
      {
        path: 'surveys/create-question',
        loadComponent: () => import('./features/surveys/components/pages/create-question/create-question.component')
          .then(c => c.CreateQuestionComponent)
      },
      {
        path: 'surveys/select-survey',
        loadComponent: () => import('./features/surveys/components/pages/select-survey/select-survey.component')
          .then(c => c.SelectSurveyComponent)
      },
      {
        path: 'surveys/notify-respondents/:surveyId',
        loadComponent: () => import('./features/surveys/components/pages/notify-respondents/notify-respondents.component')
          .then(c => c.NotifyRespondentsComponent)
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];
