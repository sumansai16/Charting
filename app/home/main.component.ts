import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component, ElementRef, ViewChild, OnInit, OnDestroy }    from '@angular/core';
import { Http, Response,HttpModule, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BrowserModule }          from '@angular/platform-browser';
//import { ChartModule }            from 'angular2-highcharts'; 
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import { AmChartsService, AmChartsModule } from "@amcharts/amcharts3-angular";
//import { oilChartComponent } from './oilChart.component';
//import { flashLightsComponent } from './flashlights.component';

import { ChartModule }            from 'angular2-highcharts'; 

@Component({
    selector: 'main',
    templateUrl: 'app/home/main.component.html',
    styleUrls : ['app/home/main.component.css'],
     providers : [AmChartsService]

})

export class MainComponent implements OnInit, OnDestroy {

    @ViewChild('modal') modal : ModalComponent
    @ViewChild('modalSetHp') modalSetHp : ModalComponent
    jsonlist:any[];
    loading: boolean;
    datalist: any;
    cosmoList : {};
    cb1 : boolean = true;
    tanklevelhisp : any;
    tanklevelhihisp : any;
    tanklevelhisp1 : any;
    tanklevelhihisp1 : any;
    pumpstatus1 : any;
    plcstate : any;
    pumpstatus : any;
    pumpStatusBoolean : boolean;
    editMode: boolean = false;

    private charts: any;
    private timer : any;
    tankLevelValue : any;
    result: Observable<any>;
    resp: any;

   // _http1:any;
    data: any;
    constructor(public _http: Http, private AmCharts: AmChartsService,) {
        
        Observable.interval(500).flatMap(() => {
                return this._http.get('http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo')
          })
                .subscribe((response)=>{
                this.jsonlist = response.json();
//console.log(response);
                this.datalist = this.jsonlist[0];
                this.pumpStatusBoolean = (this.datalist.pumpstatus == "ON") ? true : false;
                this.pumpstatus = this.datalist.pumpstatus;
                this.tanklevelhisp = this.jsonlist[0].tanklevelhisp;
                this.tanklevelhihisp = this.jsonlist[0].tanklevelhihisp;
                this.plcstate= this.jsonlist[0].plcstate;
             //console.log("json list is " + this.jsonlist);
           //  this.cb1 = (this.jsonlist[0].pumpstatus == 'ON') ? true : false;
             
             //this.flowratesp = this.jsonlist[0].flowratesp;
            // this.tanklevelsp = this.jsonlist[0].tanklevelsp;

            // console.log(this.jsonlist[0].tanklevel,this.jsonlist[0].flowrate);
            // console.log("running status" + this.cb1);
        });


/*
        setTimeout(() => {this.loadUser()},2000);
  */
        /*
      Observable.interval(2000).flatMap( () => {
          return this._http.request('http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpVals')
      }).subscribe((res: Response) => {
                this.data = res.json();
                // this.datalist = JSON.parse(this.data);
               console.log("type of data " + typeof this.data[0]);


                //console.log(" stored data list is " + this.datalist);
       } )*/
                
                /*
      this.datalist = ():any[] => {
        this.loading = true;
        this._http.request('http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo')
            .subscribe(
                this.loading = false;
               // console.log(this.data[0]);
                return this.data[0];
                */

}
    /* method used for first api */
  /*    
    findObjFromArray(type) {
        if (this.jsonlist) {

                /*
           return this.jsonlist.find(obj => {
               console.log("obj['dName'] is " + obj[type]);
             return obj['dName'] === type;
            })
            
           * / 
            return this.jsonlist[0];
        }
        return {};
    }
*/

/*
    getUser() {
    return this._http.get(`http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo`)
    .map((res:Response) => res.json());
  }
loadUser(){
  this.getUser().subscribe(data => this.cosmoList = data);
  console.log("type of cosmolist is " + typeof (this.cosmoList));
}
*/

/* Updates Database with tanklevel high and high */
setHighPoints(tankLevelHigh, tankLevelHighHigh) {
    //url : string = 'http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/PostSPs'
    
    let headers = new Headers();
headers.append('Content-Type', 'application/json');
// let data = {flowratesp,tanklevelsp};
 //let data = {"tankLevelHigh":tankLevelHigh, "tankLevelHighHigh": tankLevelHighHigh};
 let data = {"pumpstatus": this.pumpstatus ,"tanklevelhisp":tankLevelHigh, "tanklevelhihisp": tankLevelHighHigh};
 this.editMode = false;

 let options = new RequestOptions({ headers: headers });
     return this._http.post('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/PostSPs', data, options)
         .subscribe((response:Response) => {
              console.log(data);
              console.log(response);
             //this.modal.close();
         })
}


/* Toggle Button changing pumpstatus */
pumpBooleanChange(pumpStatusBoolean){
    this.datalist.pumpstatus = (pumpStatusBoolean== true) ? 'ON': 'OFF';
    console.log(this.datalist.pumpstatus);

    let headers = new Headers();
 headers.append('Content-Type', 'application/json');
 let setPointData = {"pumpstatus": this.datalist.pumpstatus, "tanklevelhisp": this.tanklevelhisp, "tanklevelhihisp": this.tanklevelhihisp };
 //console.log(JSON.stringify(setPointData));
let options = new RequestOptions({ headers: headers });
     return this._http.post('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/PostSPs', setPointData, options)
         .subscribe((response:Response) => {
          console.log("Set points submitted successfully");
         })

}

// User Email and Phone no details submission on pageload
userDetailsForm(emailId, phoneNo) {
    
    let headers = new Headers();
headers.append('Content-Type', 'application/json');
 let userData = {"emailaddress": emailId, "phonenumber": phoneNo};
// console.log(JSON.stringify(userData));
 

 let options = new RequestOptions({ headers: headers });
     return this._http.post('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/PostUserInfo', userData, options)
         .subscribe((response:Response) => {
             this.modal.close();
         })
  
}

/*OnClick Edit */
editingMode():void{
    this.editMode = true;
    this.tanklevelhisp1  = this.jsonlist[0].tanklevelhisp;
    this.tanklevelhihisp1  = this.jsonlist[0].tanklevelhihisp;
}

/* on Click Configure Set Points, Open Modal
openLoginDialog(){
   // this.flowratesp = this.jsonlist[0].flowratesp;
   //  this.tanklevelsp = this.jsonlist[0].tanklevelsp;
     console.log("when open dialog" + this.flowratesp + " and " + this.tanklevelsp);
     return this.modal.open();
}
*/
configureHp(){
   // this.editMode = true;
    this.tanklevelhisp1  = this.jsonlist[0].tanklevelhisp;
    this.tanklevelhihisp1  = this.jsonlist[0].tanklevelhihisp;
    this.pumpstatus1 = (this.jsonlist[0].pumpstatus = "ON") ? true : false;;
    this.modalSetHp.open();
}
/* Updates API from Edit Glyphicon xs resolution */
updateSetPoints(tankLevelHighInput, tankLevelHighHighInput, pumpStatusInput) {
    //url : string = 'http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/PostSPs'
    
    let headers = new Headers();
headers.append('Content-Type', 'application/json');
// let data = {flowratesp,tanklevelsp};
 //let data = {"tankLevelHigh":tankLevelHigh, "tankLevelHighHigh": tankLevelHighHigh};
 
 let data = {"pumpstatus": (pumpStatusInput = true) ? "ON" : "OFF" ,"tanklevelhisp":tankLevelHighInput, "tanklevelhihisp": tankLevelHighHighInput};
 //this.editMode = false;

 let options = new RequestOptions({ headers: headers });
     return this._http.post('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/PostSPs', data, options)
         .subscribe((response:Response) => {
              console.log(JSON.stringify(data));
              console.log(response);
             this.modalSetHp.close();
         })
}

pumpstatus1Change(pumpStatusInput){
this.pumpstatus1 = (pumpStatusInput= true)? "ON" : "OFF" ;
}
ngOnInit(){
  this.modal.open();
  this.createChart();
}

createChart() { 

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
