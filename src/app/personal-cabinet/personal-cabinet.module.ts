import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalCabinetRoutingModule } from './personal-cabinet-routing.module';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ManageComponent } from './manage/manage.component';
import { RefComponent } from './ref/ref.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PersonalCabinetHeaderComponent } from './personal-cabinet-header/personal-cabinet-header.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent,
    ManageComponent,
    RefComponent,
    ChangePasswordComponent,
    PersonalCabinetHeaderComponent
  ],
  imports: [
    CommonModule,
    PersonalCabinetRoutingModule,
    RouterModule
  ]
})
export class PersonalCabinetModule { }
