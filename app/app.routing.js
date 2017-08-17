"use strict";
var router_1 = require('@angular/router');
//import { WelcomeComponent } from './home/welcome.component';
//import {HichartComponent} from './charts/hichart.component';
//import {oilChartComponent} from './home/oilChart.component';
var main_component_1 = require('./home/main.component');
var appRoutes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    // { path: 'welcome', component: WelcomeComponent },
    { path: 'main', component: main_component_1.MainComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map