"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var app_routing_1 = require('./app.routing');
var app_component_1 = require('./app.component');
var welcome_component_1 = require('./home/welcome.component');
//import { HichartComponent } from './charts/hichart.component';
var oilChart_component_1 = require('./home/oilChart.component');
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var main_component_1 = require('./home/main.component');
//import { UiSwitchModule } from '@youmesoft/ng2-ui-switch';
//import { SwitchComponent } from 'angular2-bootstrap-switch/components';
// import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
//import { ChartModule } from 'angular2-highcharts';
var amcharts3_angular_1 = require("@amcharts/amcharts3-angular");
var flashlights_component_1 = require('./home/flashlights.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                app_routing_1.routing,
                forms_1.FormsModule,
                ng2_bs3_modal_1.Ng2Bs3ModalModule,
                amcharts3_angular_1.AmChartsModule /*UiSwitchModule,
                ChartModule.forRoot(require('highcharts'),
                AmChartsModule )*/
            ],
            declarations: [
                app_component_1.AppComponent,
                welcome_component_1.WelcomeComponent,
                /* HichartComponent ,*/
                oilChart_component_1.oilChartComponent,
                flashlights_component_1.flashLightsComponent,
                main_component_1.MainComponent
            ],
            providers: [amcharts3_angular_1.AmChartsService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map