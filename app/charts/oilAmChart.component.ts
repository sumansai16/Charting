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
      #chartdiv {background: #3f3f4f;color:#ffffff;	
	width		: 100%;
	height		: 500px;
	font-size	: 11px;
}			
  `],
    template: `
    <div id="chartdiv" [style.width.%]="100" [style.height.px]="500"></div>
    `
})
export class oilAmChartComponent implements OnDestroy {
    private charts: any;
    jsonlist : any;
    tankLevelValue : any;

    constructor(private AmCharts: AmChartsService, private _http: Http) {
        console.log(this.AmCharts);
      Observable.interval(2000).flatMap(() => {
          return this._http.get('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo')
          })
          .subscribe((response)=>{
           this.jsonlist = response.json();  
           this.tankLevelValue = this.jsonlist[0].tanklevel;    
           console.log(this.tankLevelValue);  
        });
    
    let chartData = [{"category":"Oil Level in the Tank", "value1": this.tankLevelValue, "value2":70}];

 this.charts = this.AmCharts.makeChart("chartdiv", {
    "theme": "dark",
    "type": "serial",
    "depth3D":100,
    "angle":30,
    "autoMargins":false,
    "marginBottom":100,
    "marginLeft":350,
    "marginRight":300,
    "pathToImages": "https://www.amcharts.com/lib/3/images/",
    "dataProvider": chartData,
    "valueAxes": [{
        "stackType": "100%",
        "gridAlpha": 0
    }],
    "graphs": [{
        "type":"column",
        "topRadius":1,
        "columnWidth":1,
        "showOnAxis":true,
        "lineThickness": 2,
        "lineAlpha": 0.5,
        "lineColor": "#FFFFFF",
        "fillColors": "#8d003b",
        "fillAlphas": 0.8,
        "valueField": "value1"
    },{
        "type":"column",
        "topRadius":1,
        "columnWidth":1,
        "showOnAxis":true,
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
        "labelOffset":40,
        "gridAlpha":0
    }
});
}

ngOnDestroy() {
    this.AmCharts.destroyChart(this.charts);
}

}




/*
@NgModule({
  imports:      [BrowserModule, ChartModule, HttpModule],
  declarations: [AppComponent],
  bootstrap:    [AppComponent]
})
class AppModule { }


platformBrowserDynamic().bootstrapModule(AppModule);
*/