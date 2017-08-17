import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import {HichartComponent} from './charts/hichart.component';
import {oilChartComponent} from './home/oilChart.component';
import { MainComponent } from './home/main.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: 'welcome', component: WelcomeComponent },
  { path: 'main', component: MainComponent }

];

export const routing: ModuleWithProviders =
               RouterModule.forRoot(appRoutes);
