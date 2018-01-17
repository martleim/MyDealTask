"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require('rxjs/add/operator/map');
var core_1 = require('@angular/core');
var DataService = (function () {
    function DataService(http, _configuration) {
        this.http = http;
        this._configuration = _configuration;
        this.elementName = "values";
        this._actionUrl = _configuration.ServerWithApiUrl;
    }
    Object.defineProperty(DataService.prototype, "actionUrl", {
        get: function () {
            return this._actionUrl + this.elementName + "/";
        },
        enumerable: true,
        configurable: true
    });
    DataService.prototype.getAll = function () {
        return this.http.get(this.actionUrl);
    };
    DataService.prototype.getSingle = function (id) {
        return this.http.get(this.actionUrl + id);
    };
    DataService.prototype.add = function (item) {
        var toAdd = JSON.stringify(item);
        return this.http.post(this.actionUrl, toAdd);
    };
    DataService.prototype.update = function (id, itemToUpdate) {
        return this.http
            .put(this.actionUrl + id, itemToUpdate);
    };
    DataService.prototype.delete = function (id) {
        return this.http.delete(this.actionUrl + id);
    };
    DataService = __decorate([
        core_1.Injectable()
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
