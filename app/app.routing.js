"use strict";
var router_1 = require('@angular/router');
var welcome_component_1 = require('./home/welcome.component');
var hichart_component_1 = require('./charts/hichart.component');
var appRoutes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'welcome', component: welcome_component_1.WelcomeComponent },
    { path: 'charts', component: hichart_component_1.HichartComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map