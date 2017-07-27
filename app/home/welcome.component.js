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
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var WelcomeComponent = (function () {
    function WelcomeComponent(_http) {
        var _this = this;
        this._http = _http;
        this.cb1 = true;
        this.editMode = false;
        /* another api
      Observable.interval(2000).flatMap(() => {
          return this._http.get('http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpVals')
          })
          .subscribe((response)=>{
             this.jsonlist = response.json();
             console.log("json list is " + this.jsonlist);
        });
        */
        Rx_1.Observable.interval(1000).flatMap(function () {
            return _this._http.get('http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo');
        })
            .subscribe(function (response) {
            _this.jsonlist = response.json();
            //console.log(response);
            _this.datalist = _this.jsonlist[0];
            _this.pumpStatusBoolean = (_this.datalist.pumpstatus == "ON") ? true : false;
            _this.flowratesp = _this.jsonlist[0].flowratesp;
            _this.tanklevelsp = _this.jsonlist[0].tanklevelsp;
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
    WelcomeComponent.prototype.setHighPoints = function (tankLevelHigh, tankLevelHighHigh) {
        //url : string = 'http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/PostSPs'
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        // let data = {flowratesp,tanklevelsp};
        //let data = {"tankLevelHigh":tankLevelHigh, "tankLevelHighHigh": tankLevelHighHigh};
        var data = { "tanklevelsp": tankLevelHigh, "flowratesp": tankLevelHighHigh };
        this.editMode = false;
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/PostSPs', data, options)
            .subscribe(function (response) {
            //  console.log(data);
            //  console.log(response);
            //this.modal.close();
        });
    };
    /* Toggle Button changing pumpstatus */
    WelcomeComponent.prototype.pumpBooleanChange = function (pumpStatusBoolean) {
        this.datalist.pumpstatus = (pumpStatusBoolean == true) ? 'ON' : 'OFF';
        console.log(this.datalist.pumpstatus);
    };
    // User Email and Phone no details submission on pageload
    WelcomeComponent.prototype.userDetailsForm = function (emailId, phoneNo) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var userData = { "emailaddress": emailId, "phonenumber": phoneNo };
        // console.log(JSON.stringify(userData));
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/PostUserInfo', userData, options)
            .subscribe(function (response) {
            _this.modal.close();
        });
    };
    /*OnClick Edit */
    WelcomeComponent.prototype.editingMode = function () {
        this.editMode = true;
        this.flowratesp1 = this.jsonlist[0].flowratesp;
        this.tanklevelsp1 = this.jsonlist[0].tanklevelsp;
    };
    /* on Click Configure Set Points, Open Modal
    openLoginDialog(){
       // this.flowratesp = this.jsonlist[0].flowratesp;
       //  this.tanklevelsp = this.jsonlist[0].tanklevelsp;
         console.log("when open dialog" + this.flowratesp + " and " + this.tanklevelsp);
         return this.modal.open();
    }
    */
    WelcomeComponent.prototype.ngOnInit = function () {
        this.modal.open();
    };
    __decorate([
        core_1.ViewChild('modal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], WelcomeComponent.prototype, "modal", void 0);
    WelcomeComponent = __decorate([
        core_1.Component({
            selector: 'welcome',
            templateUrl: 'app/home/welcome.component.html',
            styleUrls: ['app/home/welcome.component.css']
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], WelcomeComponent);
    return WelcomeComponent;
}());
exports.WelcomeComponent = WelcomeComponent;
//# sourceMappingURL=welcome.component.js.map