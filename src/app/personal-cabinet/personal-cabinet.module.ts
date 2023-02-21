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
import { ChangeWalletComponent } from './change-wallet/change-wallet.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent,
    ManageComponent,
    RefComponent,
    ChangePasswordComponent,
    PersonalCabinetHeaderComponent,
    ChangeWalletComponent,
    AdminPanelComponent
  ],
  imports: [
    CommonModule,
    PersonalCabinetRoutingModule,
    RouterModule,
    MatTableModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
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
