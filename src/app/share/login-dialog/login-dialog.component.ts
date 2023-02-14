import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  changeDialogLogin: boolean = true;

  constructor(
    private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ){
    this.changeDialogLogin = this.data;
  }

  public loginModal(): Observable<boolean>{
    return this.loginService.$ModalLogin()
  }

  public changeDialog(): void{
    this.changeDialogLogin = !this.changeDialogLogin;
  }
  



}
