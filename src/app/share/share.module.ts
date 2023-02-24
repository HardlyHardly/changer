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
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ChangeWalletDialogComponent } from './change-wallet-dialog/change-wallet-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderBannerComponent } from './order-banner/order-banner.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginDialogComponent,
    OrderModalComponent,
    SpinnerComponent,
    ChangeWalletDialogComponent,
    OrderBannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginDialogComponent,
    OrderModalComponent,
    SpinnerComponent,
    OrderBannerComponent
  ]
})
export class ShareModule { }
