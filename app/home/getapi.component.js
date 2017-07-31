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
var GetApiComponent = (function () {
    function GetApiComponent(_http) {
        var _this = this;
        this._http = _http;
        Rx_1.Observable.interval(2000).flatMap(function () {
            return _this._http.get('http://nextapi-xto.azurewebsites.net/swagger/#!/RodPumpDemo/ApiRodPumpDemoGetRodPumpValsGet');
        })
            .subscribe(function (response) {
            console.log(response);
        });
    }
    GetApiComponent = __decorate([
        core_1.Component({
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
            styleUrls: ['app/home/welcome.component.css']
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GetApiComponent);
    return GetApiComponent;
}());
exports.GetApiComponent = GetApiComponent;
//# sourceMappingURL=getapi.component.js.map