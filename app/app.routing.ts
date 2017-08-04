import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import {HichartComponent} from './charts/hichart.component';
import {oilChartComponent} from './home/oilChart.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: 'welcome', component: WelcomeComponent }

];

export const routing: ModuleWithProviders =
               RouterModule.forRoot(appRoutes);
