"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var app_component_1 = require('./app.component');
var animations_1 = require('@angular/platform-browser/animations');
var material_module_1 = require('./material.module');
var forms_1 = require('@angular/forms');
var material_1 = require('@angular/material');
var app_routing_module_1 = require('./app-routing.module');
var app_constants_1 = require('./app.constants');
var http_1 = require('@angular/common/http');
var data_service_module_1 = require('./shared/services/data-service.module');
var home_component_1 = require('./home/home.component');
var nameList_component_1 = require('./nameList/nameList.component');
var ngx_uploader_1 = require('ngx-uploader');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                nameList_component_1.NameListComponent
            ],
            imports: [
                http_1.HttpClientModule,
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                material_module_1.MaterialModule,
                material_1.MatSnackBarModule, material_1.MatSidenavModule, material_1.MatOptionModule, material_1.MatMenuModule, material_1.MatDatepickerModule, material_1.MatListModule, material_1.MatToolbarModule, material_1.MatIconModule, material_1.MatFormFieldModule, material_1.MatSelectModule, material_1.MatInputModule, material_1.MatCardModule, material_1.MatTableModule, material_1.MatTabsModule,
                ngx_uploader_1.NgUploaderModule
            ],
            providers: [app_constants_1.Configuration,
                http_1.HttpClientModule,
                data_service_module_1.DataService,
                material_1.MatIconRegistry
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
