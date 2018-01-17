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
var NameListComponent = (function () {
    function NameListComponent(route, _dataService, snackBar) {
        this.route = route;
        this._dataService = _dataService;
        this.snackBar = snackBar;
        this.element = {};
        this.editing = false;
        this.pnlFileContent = "";
        _dataService.elementName = "PassengerList";
        this.files = []; // local uploading files array
        this.uploadInput = new core_1.EventEmitter(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = ngx_uploader_1.humanizeBytes;
    }
    NameListComponent.prototype.openSnackBar = function (msg) {
        var config = new material_1.MatSnackBarConfig();
        config.duration = 1500;
        this.snackBar.open(msg, "Ok", config);
    };
    NameListComponent.prototype.deleteElement = function (el) {
        var _this = this;
        this._dataService.delete(el.id)
            .subscribe(function (data) {
            _this.element = data;
            _this.editing = true;
        }, function (error) { return function () {
            _this.openSnackBar('error when deletin');
        }; }, function () {
            _this.openSnackBar('deleted succesfully');
            //this._slimLoadingBarService.complete();
        });
    };
    NameListComponent.prototype.onUploadOutput = function (output) {
        if (output.type === 'allAddedToQueue') {
        }
        else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
            this.files.push(output.file);
            var reader = new FileReader();
            var tmp = this;
            reader.onload = function () {
                var dataURL = reader.result;
                tmp.pnlFileContent = dataURL;
            };
            reader.readAsText(output.file.nativeFile);
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
    NameListComponent.prototype.startUpload = function () {
        var event = {
            type: 'uploadAll',
            url: this._dataService.actionUrl,
            method: 'POST',
            data: null // { foo: 'bar' }
        };
        this.uploadInput.emit(event);
    };
    NameListComponent.prototype.cancelUpload = function (id) {
        this.uploadInput.emit({ type: 'cancel', id: id });
    };
    NameListComponent.prototype.removeFile = function (id) {
        this.uploadInput.emit({ type: 'remove', id: id });
    };
    NameListComponent.prototype.removeAllFiles = function () {
        this.uploadInput.emit({ type: 'removeAll' });
    };
    NameListComponent.prototype.ngOnInit = function () {
        var _this = this;
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
    NameListComponent = __decorate([
        core_1.Component({
            selector: 'app-nameList',
            templateUrl: './nameList.component.html',
            styleUrls: ['./nameList.component.css']
        })
    ], NameListComponent);
    return NameListComponent;
}());
exports.NameListComponent = NameListComponent;
