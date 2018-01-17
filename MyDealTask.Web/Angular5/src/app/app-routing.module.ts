import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';     // Add this
import { NameListComponent } from './nameList/nameList.component';  // Add this

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'nameList',
    component: NameListComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
