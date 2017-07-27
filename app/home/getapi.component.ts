import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component }    from '@angular/core';
import { Http, Response,HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BrowserModule }          from '@angular/platform-browser';
//import { ChartModule }            from 'angular2-highcharts'; 
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

@Component({
    selector: 'get-api',
    /*styles: [`
      chart {
        display: block;
      }
      button {
        display: block;
        width: 100%;
        height: 25px;
      }
  `],*/
     templateUrl: 'app/home/welcome.component.html',
    styleUrls : ['app/home/welcome.component.css']

})
export class GetApiComponent {
    constructor(private _http: Http) {
      Observable.interval(2000).flatMap(() => {
          return this._http.get('http://nextapi-xto.azurewebsites.net/swagger/#!/RodPumpDemo/ApiRodPumpDemoGetRodPumpValsGet')
          })
          .subscribe((response)=>{
             console.log(response);     
        });
    }
 
}