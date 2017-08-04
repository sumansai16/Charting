
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component, OnInit, OnDestroy }    from '@angular/core';
import { Http, Response,HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BrowserModule }          from '@angular/platform-browser';
import { ChartModule }            from 'angular2-highcharts'; 
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { AmChartsService, AmChartsModule } from "@amcharts/amcharts3-angular";

@Component({
    selector: 'oil-amchart',
    styles: [`
      #chartdiv {
	  width: 300px;
    min-width: 150px;
    font-size: 11px;
    height: 275px;
    max-height: 500px;
    min-height:200px;
}		
  `],
    template: `
    <div id="chartdiv"></div>
    `
})
export class oilChartComponent implements OnDestroy, OnInit {
    private charts: any;
    private timer : any;
    jsonlist : any;
    datalist: any;
    tankLevelValue : any;
    result: Observable<any>;
    resp: any;

    
constructor(private AmCharts: AmChartsService, private _http: Http) {
Observable.interval(100).flatMap(() => {
          return this._http.get('http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo')
          })
          .subscribe((response)=>{
             this.jsonlist = response.json();
             this.datalist = this.jsonlist[0];
    }
    }
  
  
ngOnInit() { 

 this.charts = this.AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "depth3D":100,
    "angle":30,
  "pathToImages": "https://www.amcharts.com/lib/3/images/",
    "dataProvider": this.generateChartData(),
    "valueAxes": [{
        "stackType": "100%",
        "gridAlpha": 0,
        "minimum": 0,
        "maximum": 193
        //"maximum":193
       // "strictMinMax":true
    }],
    "graphs": [{
        "type":"column",
        "topRadius":1,
        "columnWidth":1,
        "showOnAxis":true,
        "lineThickness": 2,
        "lineAlpha": 0.5,
        "lineColor": "#FFFFFF",
        "fillColors": "green",
        "fillAlphas": 0.8,
        "valueField": "value1",
        "autoGridCount" : false,
        "max":192
    },{
        "type":"column",
        "topRadius":1,
        "columnWidth":1 ,
        "showOnAxis":true,
        "lineThickness": 2,
        "lineAlpha": 0.5,
        "lineColor": "#cdcdcd",
        "fillColors": "#cdcdcd",
        "fillAlphas": 0.5,
        "valueField": "value2",
    }],
    "responsive": {
      "enabled" : true
    },
    "categoryField": "category",
    "categoryAxis": {
        "axisAlpha": 0,
        "labelOffset":20,
        "gridAlpha":0
    }
});
/*
this.charts.chartBackground.css({
background:'transaparent !important'

});
*/
/* Update chart for every 1sec */
    this.timer = setInterval(() => {
      // This must be called when making any changes to the chart
      this.AmCharts.updateChart(this.charts, () => {
        this.charts.dataProvider = this.generateChartData();
       
      });
    }, 100);
}

generateChartData(){     
     let chartData: any= [];
     chartData.push({"category":"Oil Level in the Tank", "value1": this.jsonlist ? this.jsonlist[0].tanklevel : null ,"value2": 50 });
   //  chartData.push({"category":"Oil Level in the Tank", "value1": 193 /*,"value2":70  */  });
     return chartData;
   };

ngOnDestroy() {
      clearInterval(this.timer);
    this.AmCharts.destroyChart(this.charts);
}

}