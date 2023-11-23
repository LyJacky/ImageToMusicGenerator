import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainPageComponent } from './main-page/main-page.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
