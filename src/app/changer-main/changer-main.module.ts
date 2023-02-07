import { ShareModule } from './../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangerMainRoutingModule } from './changer-main-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { PartnersPageComponent } from './partners-page/partners-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import {MatSelectModule} from '@angular/material/select';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainPageComponent,
    RulesPageComponent,
    PartnersPageComponent,
    ContactsPageComponent,
    NewsPageComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    ChangerMainRoutingModule,
    ShareModule,
    MatSelectModule,
    DropdownModule,
    FormsModule
  ]
})
export class ChangerMainModule { }
