import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { UserResponseI } from 'src/app/interfaces/userRessponseI';
import { DatabaseService } from '../database.service';
import { LoginService } from '../../services/login.service';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorConfigService } from 'src/app/services/error-config.service';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  errorField: boolean = false;

  userLoginForm: FormGroup = new FormGroup({
    'email': new FormControl(''),
    'password': new FormControl('')
  })

  userRegistrationForm: FormGroup = new FormGroup({
    'email': new FormControl(''),
    'password': new FormControl(''),
    'check-password': new FormControl('')
  })

  changeDialogLogin: boolean = true;

  constructor(
    private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dataBaseService: DatabaseService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private errorConfigService: ErrorConfigService
  ){
    this.changeDialogLogin = this.data;
  }

  public loginModal(): Observable<boolean>{
    return this.loginService.$ModalLogin()
  }

  public changeDialog(): void{
    this.changeDialogLogin = !this.changeDialogLogin;
  }
  
  public login(): void{
    this.authService
    .login(this.userLoginForm.value)
    .pipe(
      catchError((error) => {
        this.errorConfigService.errorConfig(error);
        return throwError(error)
      })
    )
    .subscribe((res: UserResponseI) => {
      if(res){
        const {accessToken, refreshToken} = res.tokens;
        const {role, email} = res;
        localStorage.setItem('id', `${res.id}`);
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        localStorage.setItem('user', JSON.stringify({role, email}))
        this.dialog.closeAll();
        this.router.navigate(['Identity', 'Account', 'Manage'])
      } 
    })
  }

  public checkBothPasswords(): boolean{
    this.errorField = this.userRegistrationForm.get('password')?.value === this.userRegistrationForm.get('check-password')?.value;
    return this.errorField;
  }

  public registr(): void{
    this.dataBaseService
    .register({
      email: this.userRegistrationForm.get('email')?.value,
      password: this.userRegistrationForm.get('password')?.value
    }).pipe(
      catchError((error) => {
        this.errorConfigService.errorConfig(error.error);
        return throwError(error)
      })
    )
    .subscribe((userTokens: UserResponseI) => {
      if(userTokens){
        const {accessToken, refreshToken} = userTokens.tokens;
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        this.dialog.closeAll();
        this.router.navigate(['Identity', 'Account', 'Manage'])
      }
    })
  }





}
