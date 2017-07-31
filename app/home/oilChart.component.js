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
        // console.log(" Amcharts is working " + this.AmCharts);
        Rx_1.Observable.interval(1000).flatMap(function () {
            return _this._http.get('http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo');
        })
            .subscribe(function (response) {
            _this.jsonlist = response.json();
            //console.log(response);
            _this.datalist = _this.jsonlist[0];
            //      this.pumpStatusBoolean = (this.datalist.pumpstatus == "ON") ? true : false;
            //   this.tanklevelhisp = this.jsonlist[0].tanklevelhisp;
            //  this.tanklevelhihisp = this.jsonlist[0].tanklevelhihisp;
            //   console.log("working data list is " + this.datalist);    
        });
    }
    oilChartComponent.prototype.ngOnInit = function () {
        /* Observable code
       Observable.interval(2000).flatMap(() => {
           return this._http.get('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo')
           })
           .subscribe((response)=>{
            this.jsonlist = response.json();
            this.datalist = this.jsonlist[0];
            this.tankLevelValue = this.jsonlist[0].tanklevel;
            
         });*/
        var _this = this;
        /**/
        // */
        //   let chartData = [{"category":"Oil Level in the Tank", "value1": 55 /*this.tankLevelValue*/, "value2":70}];
        /* this._http.get('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo')
                      .map( response => response.json())
                      .subscribe(resp => this.resp = resp);
         
         console.log("this.resp " + this.resp);  */
        this.charts = this.AmCharts.makeChart("chartdiv", {
            "type": "serial",
            "depth3D": 100,
            "angle": 30,
            "pathToImages": "https://www.amcharts.com/lib/3/images/",
            "dataProvider": this.generateChartData(),
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
            "responsive": {
                "enabled": true
            },
            "categoryField": "category",
            "categoryAxis": {
                "axisAlpha": 0,
                "labelOffset": 40,
                "gridAlpha": 0
            }
        });
        /* Update chart for every 2sec */
        this.timer = setInterval(function () {
            // This must be called when making any changes to the chart
            _this.AmCharts.updateChart(_this.charts, function () {
                _this.charts.dataProvider = _this.generateChartData();
            });
        }, 1000);
    };
    /*
    getObservableData(){
      return Observable.interval(2000).flatMap(
              () => this._http.get('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo')
                               .map( res => res.json())               )
    }
    */
    oilChartComponent.prototype.generateChartData = function () {
        // console.log("at oninit jsonlist is" + this.datalist.tanklevel);
        /*
                 this.getObservableData()
                              .subscribe(
                                          (data)=> { /* this.datalist = JSON.stringify(data) ; */
        /*console.log("this.data is " + this.data); }
    );
*/
        // console.log("Data list is " + this.datalist);
        /* chart data generation code */
        var chartData = [];
        // let  tankLevelVal : any =  this.datalist.tanklevel;
        chartData.push({ "category": "Oil Level in the Tank", "value1": this.jsonlist ? this.jsonlist[0].tanklevel : null, "value2": 70 });
        // console.log("chartdata is " + JSON.stringify(chartData));
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
            styles: ["\n      #chartdiv {\n        background: #3f3f4f;color:#ffffff;\t\n\twidth\t\t: 100%;\n\theight\t\t: 500px;\n\tfont-size\t: 11px;\n}\t\t\t\n  "],
            template: "\n    <div id=\"chartdiv\"  ></div>\n    "
        }), 
        __metadata('design:paramtypes', [amcharts3_angular_1.AmChartsService, http_1.Http])
    ], oilChartComponent);
    return oilChartComponent;
}());
exports.oilChartComponent = oilChartComponent;
/*
@NgModule({
  imports:      [BrowserModule, ChartModule, HttpModule],
  declarations: [AppComponent],
  bootstrap:    [AppComponent]
})
class AppModule { }


platformBrowserDynamic().bootstrapModule(AppModule);
*/ 
//# sourceMappingURL=oilChart.component.js.map