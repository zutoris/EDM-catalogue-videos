import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoService } from './services/video.service';
import { StatService } from './services/stat.service';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  providers: [
    VideoService,
    StatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
