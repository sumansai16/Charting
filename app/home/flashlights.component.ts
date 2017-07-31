import { NgModule, Component /*, ElementRef, ViewChild, OnInit */}    from '@angular/core';
//import { Http, Response,HttpModule, Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Rx';
import { BrowserModule }          from '@angular/platform-browser';
//import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
@Component({
    selector: 'lights-component',
    templateUrl: 'app/home/flashlights.component.html',
    styleUrls : ['app/home/flashlights.component.css']
})

export class flashLightsComponent {
    sim_status : any;
     redL : boolean = false;
     greenL : boolean = false;
     green_flash : boolean = false;
     amberL : boolean = false;
     amber_flash : boolean = false;
/*
if(sim_status = 1){
this.redL = false;
this.greenL = false;
this.amberL = false;
this.amber_flash = false;
this.green_flash = true;
    
} elseif(sim_status = 3){
this.redL = false;
this.greenL = true;
this.amberL = false;
this.amber_flash = false;
this.green_flash = false;
}
elseif(sim_status = 5){
this.redL = false;
this.greenL = true;
this.amberL = false;
this.amber_flash = true;
this.green_flash = false;
}
elseif(sim_status = 6){
this.redL = false;
this.greenL = false;
this.amberL = true;
this.amber_flash = false;
this.green_flash = false;
}
*/

    
}  
    