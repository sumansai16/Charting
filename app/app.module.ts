import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { routing } from './app.routing';
import { AppComponent }  from './app.component';
//import { WelcomeComponent } from './home/welcome.component';
//import { HichartComponent } from './charts/hichart.component';
// import { oilChartComponent } from './home/oilChart.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MainComponent } from './home/main.component';

//import { UiSwitchModule } from '@youmesoft/ng2-ui-switch';
//import { SwitchComponent } from 'angular2-bootstrap-switch/components';
// import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';

//import { ChartModule } from 'angular2-highcharts';
import { AmChartsModule, AmChartsService } from "@amcharts/amcharts3-angular";
//import { flashLightsComponent } from './home/flashlights.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule,
    Ng2Bs3ModalModule ,
    AmChartsModule /*UiSwitchModule,
    ChartModule.forRoot(require('highcharts'),
    AmChartsModule )*/
  ],
  declarations: [
    AppComponent,
   /* WelcomeComponent, */
   /* HichartComponent ,*/
   /* oilChartComponent, */
   /* flashLightsComponent, */
    MainComponent
      ],
  providers:[ AmChartsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
