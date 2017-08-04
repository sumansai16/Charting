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
var flashLightsComponent = (function () {
    function flashLightsComponent(_http) {
        this._http = _http;
        this.redL = false;
        this.greenL = false;
        this.green_flash = false;
        this.amberL = false;
        this.amber_flash = false;
    }
    flashLightsComponent.prototype.ngOnInit = function () {
        var _this = this;
        Rx_1.Observable.interval(1000).flatMap(function () {
            return _this._http.get('http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo');
        })
            .subscribe(function (response) {
            _this.jsonlist = response.json();
            //console.log(response);
            _this.datalist = _this.jsonlist[0];
            _this.plcstate = _this.datalist.plcstate;
        });
    };
    flashLightsComponent = __decorate([
        core_1.Component({
            selector: 'lights-component',
            templateUrl: 'app/home/flashlights.component.html',
            styleUrls: ['app/home/flashlights.component.css']
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], flashLightsComponent);
    return flashLightsComponent;
}());
exports.flashLightsComponent = flashLightsComponent;
//# sourceMappingURL=flashlights.component.js.map