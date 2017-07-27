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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var HichartComponent = (function () {
    function HichartComponent(_http) {
        var _this = this;
        this._http = _http;
        Rx_1.Observable.interval(2000).flatMap(function () {
            return _this._http.get('https://nextapi-xto.azurewebsites.net/api/ChartDemo/GetAll');
        })
            .subscribe(function (response) {
            _this.options = {
                title: { text: 'angular2-highcharts example' },
                series: [{
                        name: 's1',
                        type: 'area',
                        data: response.json(),
                        allowPointSelect: true
                    }],
                xAxis: {
                    type: 'datetime'
                }
            };
        });
    }
    HichartComponent = __decorate([
        core_1.Component({
            selector: 'hi-chart',
            styles: ["\n      chart {\n        display: block;\n      }\n      button {\n        display: block;\n        width: 100%;\n        height: 25px;\n      }\n  "],
            template: "\n        <chart [options]=\"options\">\n        </chart>\n        <button (click)=\"addPoint()\">Click to add random points</button>\n    "
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HichartComponent);
    return HichartComponent;
}());
exports.HichartComponent = HichartComponent;
/*
@NgModule({
  imports:      [BrowserModule, ChartModule, HttpModule],
  declarations: [AppComponent],
  bootstrap:    [AppComponent]
})
class AppModule { }


platformBrowserDynamic().bootstrapModule(AppModule);
*/ 
//# sourceMappingURL=hichart.component.js.map