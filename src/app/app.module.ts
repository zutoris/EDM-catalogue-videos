import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { NavigueComponent } from './navigue/navigue.component';

const appRoutes  =[
  { path: '', component:NavigueComponent },
  { path: 'admin', component:AdminComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    NavigueComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  videosTab:any[];


 }
