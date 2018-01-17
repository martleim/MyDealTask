"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var material_1 = require('@angular/material');
//import {ElementService, Element_GetParams} from '../../../api/generated/controllers/Element';
var ngx_uploader_1 = require('ngx-uploader');
var AboutComponent = (function () {
    function AboutComponent(route, _dataService, 
        //private elementService:ElementService,
        snackBar) {
        this.route = route;
        this._dataService = _dataService;
        this.snackBar = snackBar;
        this.element = {};
        this.editing = false;
        _dataService.elementName = "Element";
        this.files = []; // local uploading files array
        this.uploadInput = new core_1.EventEmitter(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = ngx_uploader_1.humanizeBytes;
    }
    AboutComponent.prototype.openSnackBar = function (msg) {
        var config = new material_1.MatSnackBarConfig();
        config.duration = 1500;
        this.snackBar.open(msg, "Ok", config);
    };
    AboutComponent.prototype.loadElement = function (el) {
        var _this = this;
        this._dataService.getSingle(el.id)
            .subscribe(function (data) {
            _this.element = data;
            _this.editing = true;
        }, function (error) { return function () {
            _this.openSnackBar('error');
        }; }, function () {
            _this.openSnackBar('success');
            //this._slimLoadingBarService.complete();
        });
    };
    AboutComponent.prototype.saveElement = function () {
        var _this = this;
        var call = null;
        if (this.editing) {
            call = this._dataService.update(this.element.id, this.element);
        }
        else {
            call = this._dataService.add(this.element);
        }
        call.subscribe(function (data) {
            _this.element = data;
            _this.editing = true;
        }, function (error) { return function () {
            _this.openSnackBar('error');
        }; }, function () {
            _this.openSnackBar('success');
            //this._slimLoadingBarService.complete();
        });
    };
    AboutComponent.prototype.onUploadOutput = function (output) {
        if (output.type === 'allAddedToQueue') {
        }
        else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
            this.files.push(output.file);
        }
        else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
            // update current data in files array for uploading file
            var index = this.files.findIndex(function (file) { return typeof output.file !== 'undefined' && file.id === output.file.id; });
            this.files[index] = output.file;
        }
        else if (output.type === 'removed') {
            // remove file from array when removed
            this.files = this.files.filter(function (file) { return file !== output.file; });
        }
        else if (output.type === 'dragOver') {
            this.dragOver = true;
        }
        else if (output.type === 'dragOut') {
            this.dragOver = false;
        }
        else if (output.type === 'drop') {
            this.dragOver = false;
        }
    };
    AboutComponent.prototype.startUpload = function () {
        var event = {
            type: 'uploadAll',
            url: 'http://localhost:53421/Document/sdffdsds/dfsfsdfsf/dfsdsff',
            method: 'POST',
            data: null // { foo: 'bar' }
        };
        this.uploadInput.emit(event);
    };
    AboutComponent.prototype.cancelUpload = function (id) {
        this.uploadInput.emit({ type: 'cancel', id: id });
    };
    AboutComponent.prototype.removeFile = function (id) {
        this.uploadInput.emit({ type: 'remove', id: id });
    };
    AboutComponent.prototype.removeAllFiles = function () {
        this.uploadInput.emit({ type: 'removeAll' });
    };
    AboutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = +this.route.snapshot.paramMap.get('id');
        this.selected = this.route.snapshot.paramMap.get('id');
        this.openSnackBar('Message archived');
        /*var params:Element_GetParams = {
        };
        this.elementService.Element_Get(params).subscribe((data: any[]) => {
          this.values = data},
        error => () => {
            this.openSnackBar('error');
        },
        () => {
            this.openSnackBar('success');
            //this._slimLoadingBarService.complete();
        });*/
        this._dataService
            .getAll()
            .subscribe(function (data) {
            _this.values = data;
        }, function (error) { return function () {
            _this.openSnackBar('error');
        }; }, function () {
            _this.openSnackBar('success');
            //this._slimLoadingBarService.complete();
        });
    };
    AboutComponent = __decorate([
        core_1.Component({
            selector: 'app-about',
            templateUrl: './about.component.html',
            styleUrls: ['./about.component.css']
        })
    ], AboutComponent);
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;
