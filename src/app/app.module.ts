import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangerMainModule } from './changer-main/changer-main.module';
import { PersonalCabinetModule } from './personal-cabinet/personal-cabinet.module';
import { ShareModule } from './share/share.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChangerMainModule,
    PersonalCabinetModule,
    ShareModule,
    BrowserAnimationsModule,
  ],
  exports: [
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
