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
import {MatTableModule} from '@angular/material/table';
import { ApplyTokenInterceptor } from './interceptors/apply-token.interceptor';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
    RouterModule,
    MatTableModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApplyTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    }
  ]
})
export class PersonalCabinetModule { }
