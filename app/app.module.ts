import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { routing } from './app.routing';
import { AppComponent }  from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { HichartComponent } from './charts/hichart.component';
import { oilAmChartComponent } from './charts/oilAmChart.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
//import { UiSwitchModule } from '@youmesoft/ng2-ui-switch';

import { ProductModule } from './products/product.module';
import { ChartModule } from 'angular2-highcharts';
 import { AmChartsModule } from "@amcharts/amcharts3-angular";


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule,
    ProductModule,Ng2Bs3ModalModule , /*UiSwitchModule,*/
    ChartModule.forRoot(require('highcharts'),
    AmChartsModule )
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    HichartComponent ,
    oilAmChartComponent  
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
