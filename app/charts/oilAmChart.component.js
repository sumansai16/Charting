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
var amcharts3_angular_1 = require("@amcharts/amcharts3-angular");
var oilAmChartComponent = (function () {
    function oilAmChartComponent(AmCharts, _http) {
        var _this = this;
        this.AmCharts = AmCharts;
        this._http = _http;
        console.log(this.AmCharts);
        Rx_1.Observable.interval(2000).flatMap(function () {
            return _this._http.get('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo');
        })
            .subscribe(function (response) {
            _this.jsonlist = response.json();
            _this.tankLevelValue = _this.jsonlist[0].tanklevel;
            console.log(_this.tankLevelValue);
        });
        var chartData = [{ "category": "Oil Level in the Tank", "value1": this.tankLevelValue, "value2": 70 }];
        this.charts = this.AmCharts.makeChart("chartdiv", {
            "theme": "dark",
            "type": "serial",
            "depth3D": 100,
            "angle": 30,
            "autoMargins": false,
            "marginBottom": 100,
            "marginLeft": 350,
            "marginRight": 300,
            "pathToImages": "https://www.amcharts.com/lib/3/images/",
            "dataProvider": chartData,
            "valueAxes": [{
                    "stackType": "100%",
                    "gridAlpha": 0
                }],
            "graphs": [{
                    "type": "column",
                    "topRadius": 1,
                    "columnWidth": 1,
                    "showOnAxis": true,
                    "lineThickness": 2,
                    "lineAlpha": 0.5,
                    "lineColor": "#FFFFFF",
                    "fillColors": "#8d003b",
                    "fillAlphas": 0.8,
                    "valueField": "value1"
                }, {
                    "type": "column",
                    "topRadius": 1,
                    "columnWidth": 1,
                    "showOnAxis": true,
                    "lineThickness": 2,
                    "lineAlpha": 0.5,
                    "lineColor": "#cdcdcd",
                    "fillColors": "#cdcdcd",
                    "fillAlphas": 0.5,
                    "valueField": "value2"
                }],
            "categoryField": "category",
            "categoryAxis": {
                "axisAlpha": 0,
                "labelOffset": 40,
                "gridAlpha": 0
            }
        });
    }
    oilAmChartComponent.prototype.ngOnDestroy = function () {
        this.AmCharts.destroyChart(this.charts);
    };
    oilAmChartComponent = __decorate([
        core_1.Component({
            selector: 'oil-amchart',
            styles: ["\n      #chartdiv {background: #3f3f4f;color:#ffffff;\t\n\twidth\t\t: 100%;\n\theight\t\t: 500px;\n\tfont-size\t: 11px;\n}\t\t\t\n  "],
            template: "\n    <div id=\"chartdiv\" [style.width.%]=\"100\" [style.height.px]=\"500\"></div>\n    "
        }), 
        __metadata('design:paramtypes', [amcharts3_angular_1.AmChartsService, http_1.Http])
    ], oilAmChartComponent);
    return oilAmChartComponent;
}());
exports.oilAmChartComponent = oilAmChartComponent;
/*
@NgModule({
  imports:      [BrowserModule, ChartModule, HttpModule],
  declarations: [AppComponent],
  bootstrap:    [AppComponent]
})
class AppModule { }


platformBrowserDynamic().bootstrapModule(AppModule);
*/ 
//# sourceMappingURL=oilAmChart.component.js.map