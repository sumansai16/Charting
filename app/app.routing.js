"use strict";
var router_1 = require('@angular/router');
var welcome_component_1 = require('./home/welcome.component');
var main_component_1 = require('./home/main.component');
var appRoutes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'welcome', component: welcome_component_1.WelcomeComponent },
    { path: 'main', component: main_component_1.MainComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map