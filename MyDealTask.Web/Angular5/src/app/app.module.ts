import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { FormsModule } from '@angular/forms';

import { MatSnackBarModule, MatSidenavModule, MatOptionModule, MatMenuModule, MatDatepickerModule, MatListModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconRegistry, MatCardModule, MatTableModule, MatTabsModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { Configuration } from './app.constants';

import { HttpClientModule } from '@angular/common/http';
import { DataService } from './shared/services/data-service.module';


import { HomeComponent } from './home/home.component';
import { NameListComponent } from './nameList/nameList.component';

import { NgUploaderModule } from 'ngx-uploader';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NameListComponent    
  ],
  imports: [
    HttpClientModule,
    
    BrowserModule,
    BrowserAnimationsModule,
    
    AppRoutingModule,
    FormsModule,
    MaterialModule,

      MatSnackBarModule, MatSidenavModule, MatOptionModule, MatMenuModule, MatDatepickerModule, MatListModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatCardModule, MatTableModule, MatTabsModule,
    NgUploaderModule

  ],
  providers: [Configuration,
    HttpClientModule, 
    DataService,
    MatIconRegistry
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
