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
var amcharts3_angular_1 = require("@amcharts/amcharts3-angular");
var MainComponent = (function () {
    function MainComponent(_http, AmCharts) {
        var _this = this;
        this._http = _http;
        this.AmCharts = AmCharts;
        this.cb1 = true;
        this.editMode = false;
        Rx_1.Observable.interval(500).flatMap(function () {
            return _this._http.get('http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo');
        })
            .subscribe(function (response) {
            _this.jsonlist = response.json();
            //console.log(response);
            _this.datalist = _this.jsonlist[0];
            _this.pumpStatusBoolean = (_this.datalist.pumpstatus == "ON") ? true : false;
            _this.pumpstatus = _this.datalist.pumpstatus;
            _this.tanklevelhisp = _this.jsonlist[0].tanklevelhisp;
            _this.tanklevelhihisp = _this.jsonlist[0].tanklevelhihisp;
            _this.plcstate = _this.jsonlist[0].plcstate;
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
    MainComponent.prototype.setHighPoints = function (tankLevelHigh, tankLevelHighHigh) {
        //url : string = 'http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/PostSPs'
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        // let data = {flowratesp,tanklevelsp};
        //let data = {"tankLevelHigh":tankLevelHigh, "tankLevelHighHigh": tankLevelHighHigh};
        var data = { "pumpstatus": this.pumpstatus, "tanklevelhisp": tankLevelHigh, "tanklevelhihisp": tankLevelHighHigh };
        this.editMode = false;
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/PostSPs', data, options)
            .subscribe(function (response) {
            console.log(data);
            console.log(response);
            //this.modal.close();
        });
    };
    /* Toggle Button changing pumpstatus */
    MainComponent.prototype.pumpBooleanChange = function (pumpStatusBoolean) {
        this.datalist.pumpstatus = (pumpStatusBoolean == true) ? 'ON' : 'OFF';
        console.log(this.datalist.pumpstatus);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var setPointData = { "pumpstatus": this.datalist.pumpstatus, "tanklevelhisp": this.tanklevelhisp, "tanklevelhihisp": this.tanklevelhihisp };
        //console.log(JSON.stringify(setPointData));
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/PostSPs', setPointData, options)
            .subscribe(function (response) {
            console.log("Set points submitted successfully");
        });
    };
    // User Email and Phone no details submission on pageload
    MainComponent.prototype.userDetailsForm = function (emailId, phoneNo) {
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
    MainComponent.prototype.editingMode = function () {
        this.editMode = true;
        this.tanklevelhisp1 = this.jsonlist[0].tanklevelhisp;
        this.tanklevelhihisp1 = this.jsonlist[0].tanklevelhihisp;
    };
    /* on Click Configure Set Points, Open Modal
    openLoginDialog(){
       // this.flowratesp = this.jsonlist[0].flowratesp;
       //  this.tanklevelsp = this.jsonlist[0].tanklevelsp;
         console.log("when open dialog" + this.flowratesp + " and " + this.tanklevelsp);
         return this.modal.open();
    }
    */
    MainComponent.prototype.configureHp = function () {
        // this.editMode = true;
        this.tanklevelhisp1 = this.jsonlist[0].tanklevelhisp;
        this.tanklevelhihisp1 = this.jsonlist[0].tanklevelhihisp;
        this.pumpstatus1 = (this.jsonlist[0].pumpstatus = "ON") ? true : false;
        ;
        this.modalSetHp.open();
    };
    /* Updates API from Edit Glyphicon xs resolution */
    MainComponent.prototype.updateSetPoints = function (tankLevelHighInput, tankLevelHighHighInput, pumpStatusInput) {
        //url : string = 'http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/PostSPs'
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        // let data = {flowratesp,tanklevelsp};
        //let data = {"tankLevelHigh":tankLevelHigh, "tankLevelHighHigh": tankLevelHighHigh};
        var data = { "pumpstatus": (pumpStatusInput = true) ? "ON" : "OFF", "tanklevelhisp": tankLevelHighInput, "tanklevelhihisp": tankLevelHighHighInput };
        //this.editMode = false;
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/PostSPs', data, options)
            .subscribe(function (response) {
            console.log(JSON.stringify(data));
            console.log(response);
            _this.modalSetHp.close();
        });
    };
    MainComponent.prototype.pumpstatus1Change = function (pumpStatusInput) {
        this.pumpstatus1 = (pumpStatusInput = true) ? "ON" : "OFF";
    };
    MainComponent.prototype.ngOnInit = function () {
        this.modal.open();
        this.createChart();
    };
    MainComponent.prototype.createChart = function () {
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
    MainComponent.prototype.generateChartData = function () {
        var chartData = [];
        chartData.push({ "category": "Oil Level in the Tank", "value1": this.jsonlist ? this.jsonlist[0].tanklevel : null, "value2": 50 });
        //  chartData.push({"category":"Oil Level in the Tank", "value1": 193 /*,"value2":70  */  });
        return chartData;
    };
    ;
    MainComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.timer);
        this.AmCharts.destroyChart(this.charts);
    };
    __decorate([
        core_1.ViewChild('modal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], MainComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('modalSetHp'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], MainComponent.prototype, "modalSetHp", void 0);
    MainComponent = __decorate([
        core_1.Component({
            selector: 'main',
            templateUrl: 'app/home/main.component.html',
            styleUrls: ['app/home/main.component.css'],
            providers: [amcharts3_angular_1.AmChartsService]
        }), 
        __metadata('design:paramtypes', [http_1.Http, amcharts3_angular_1.AmChartsService])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map