
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
        background: #3f3f4f;color:#ffffff;	
	width		: 100%;
	height		: 500px;
	font-size	: 11px;
}			
  `],
    template: `
    <div id="chartdiv"  ></div>
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
       // console.log(" Amcharts is working " + this.AmCharts);
Observable.interval(1000).flatMap(() => {
          return this._http.get('http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo')
          })
          .subscribe((response)=>{
             this.jsonlist = response.json();
//console.log(response);
                this.datalist = this.jsonlist[0];
          //      this.pumpStatusBoolean = (this.datalist.pumpstatus == "ON") ? true : false;
          //   this.tanklevelhisp = this.jsonlist[0].tanklevelhisp;
          //  this.tanklevelhihisp = this.jsonlist[0].tanklevelhihisp;
         //   console.log("working data list is " + this.datalist);    
    }
    }
  
  
     ngOnInit() { 


       /* Observable code
      Observable.interval(2000).flatMap(() => {
          return this._http.get('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo')
          })
          .subscribe((response)=>{
           this.jsonlist = response.json();  
           this.datalist = this.jsonlist[0];
           this.tankLevelValue = this.jsonlist[0].tanklevel; 
           
        });*/ 
    
  
    /**/

   // */
 //   let chartData = [{"category":"Oil Level in the Tank", "value1": 55 /*this.tankLevelValue*/, "value2":70}];
/* this._http.get('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo')
              .map( response => response.json())
              .subscribe(resp => this.resp = resp);
 
 console.log("this.resp " + this.resp);  */

 this.charts = this.AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "depth3D":100,
    "angle":30,
    
    "pathToImages": "https://www.amcharts.com/lib/3/images/",
    "dataProvider": this.generateChartData(),
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
        "columnWidth":1 ,
        "showOnAxis":true,
        "lineThickness": 2,
        "lineAlpha": 0.5,
        "lineColor": "#cdcdcd",
        "fillColors": "#cdcdcd",
        "fillAlphas": 0.5,
        "valueField": "value2"
    }],
    "responsive": {
      "enabled" : true
    },
    "categoryField": "category",
    "categoryAxis": {
        "axisAlpha": 0,
        "labelOffset":40,
        "gridAlpha":0
    }
});

/* Update chart for every 2sec */

 this.timer = setInterval(() => {
      // This must be called when making any changes to the chart
      this.AmCharts.updateChart(this.charts, () => {
        this.charts.dataProvider = this.generateChartData();
      });
    }, 1000);
}

/*
getObservableData(){
  return Observable.interval(2000).flatMap(
          () => this._http.get('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo')
                           .map( res => res.json())               )
}
*/
generateChartData(){
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
     let chartData: any= [];
    // let  tankLevelVal : any =  this.datalist.tanklevel;
    
     chartData.push({"category":"Oil Level in the Tank", "value1": this.jsonlist ? this.jsonlist[0].tanklevel : null ,"value2":70 });
   // console.log("chartdata is " + JSON.stringify(chartData));
          return chartData;

   };


ngOnDestroy() {
      clearInterval(this.timer);
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