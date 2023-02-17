import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { ErrorLoginDialogComponent } from './error-login-dialog/error-login-dialog.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginDialogComponent,
    OrderModalComponent,
    SpinnerComponent,
    ErrorLoginDialogComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginDialogComponent,
    OrderModalComponent,
    SpinnerComponent
  ]
})
export class ShareModule { }
