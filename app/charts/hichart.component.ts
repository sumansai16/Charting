import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component }    from '@angular/core';
import { Http, Response,HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BrowserModule }          from '@angular/platform-browser';
import { ChartModule }            from 'angular2-highcharts'; 
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

@Component({
    selector: 'hi-chart',
    styles: [`
      chart {
        display: block;
      }
      button {
        display: block;
        width: 100%;
        height: 25px;
      }
  `],
    template: `
        <chart [options]="options">
        </chart>
        <button (click)="addPoint()">Click to add random points</button>
    `
})
export class HichartComponent {
    constructor(private _http: Http) {
      Observable.interval(2000).flatMap(() => {
          return this._http.get('https://nextapi-xto.azurewebsites.net/api/ChartDemo/GetAll')
          })
          .subscribe((response)=>{
           this.options = {
            title : { text : 'angular2-highcharts example' },
            series: [{
                name: 's1',
                type : 'area',
                data: response.json(),
                allowPointSelect: true
            }],
            xAxis : {
              type : 'datetime'
            }  
          }        
        });
    }
    options: Object;
    chart: Object;  
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