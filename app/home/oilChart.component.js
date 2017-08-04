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
var oilChartComponent = (function () {
    function oilChartComponent(AmCharts, _http) {
        var _this = this;
        this.AmCharts = AmCharts;
        this._http = _http;
        Rx_1.Observable.interval(100).flatMap(function () {
            return _this._http.get('http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo');
        })
            .subscribe(function (response) {
            _this.jsonlist = response.json();
            _this.datalist = _this.jsonlist[0];
        });
    }
    oilChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.charts = this.AmCharts.makeChart("chartdiv", {
            "type": "serial",
            "depth3D": 100,
            "angle": 30,
            "pathToImages": "https://www.amcharts.com/lib/3/images/",
            "dataProvider": this.generateChartData(),
            "valueAxes": [{
                    "stackType": "100%",
                    "gridAlpha": 0,
                    "minimum": 0,
                    "maximum": 193
                }],
            "graphs": [{
                    "type": "column",
                    "topRadius": 1,
                    "columnWidth": 1,
                    "showOnAxis": true,
                    "lineThickness": 2,
                    "lineAlpha": 0.5,
                    "lineColor": "#FFFFFF",
                    "fillColors": "green",
                    "fillAlphas": 0.8,
                    "valueField": "value1",
                    "autoGridCount": false,
                    "max": 192
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
                    "valueField": "value2",
                }],
            "responsive": {
                "enabled": true
            },
            "categoryField": "category",
            "categoryAxis": {
                "axisAlpha": 0,
                "labelOffset": 20,
                "gridAlpha": 0
            }
        });
        /*
        this.charts.chartBackground.css({
        background:'transaparent !important'
        
        });
        */
        /* Update chart for every 1sec */
        this.timer = setInterval(function () {
            // This must be called when making any changes to the chart
            _this.AmCharts.updateChart(_this.charts, function () {
                _this.charts.dataProvider = _this.generateChartData();
            });
        }, 100);
    };
    oilChartComponent.prototype.generateChartData = function () {
        var chartData = [];
        chartData.push({ "category": "Oil Level in the Tank", "value1": this.jsonlist ? this.jsonlist[0].tanklevel : null, "value2": 50 });
        //  chartData.push({"category":"Oil Level in the Tank", "value1": 193 /*,"value2":70  */  });
        return chartData;
    };
    ;
    oilChartComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.timer);
        this.AmCharts.destroyChart(this.charts);
    };
    oilChartComponent = __decorate([
        core_1.Component({
            selector: 'oil-amchart',
            styles: ["\n      #chartdiv {\n\t  width: 300px;\n    min-width: 150px;\n    font-size: 11px;\n    height: 275px;\n    max-height: 500px;\n    min-height:200px;\n}\t\t\n  "],
            template: "\n    <div id=\"chartdiv\"></div>\n    "
        }), 
        __metadata('design:paramtypes', [amcharts3_angular_1.AmChartsService, http_1.Http])
    ], oilChartComponent);
    return oilChartComponent;
}());
exports.oilChartComponent = oilChartComponent;
//# sourceMappingURL=oilChart.component.js.map