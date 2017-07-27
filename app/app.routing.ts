import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import {HichartComponent} from './charts/hichart.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: 'welcome', component: WelcomeComponent },
  { path: 'charts', component: HichartComponent }

];

export const routing: ModuleWithProviders =
               RouterModule.forRoot(appRoutes);
