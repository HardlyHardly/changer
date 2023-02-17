import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { userRegisterDataI } from 'src/app/interfaces/userRegisterData';
import { UserResponseI } from 'src/app/interfaces/userRessponseI';
import { DatabaseService } from '../database.service';
import { LoginService } from '../login.service';
import { UserAccessService } from '../user-access.service';

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
    private userAccessService: UserAccessService,
    private router: Router,
    private dialog: MatDialog,
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
    this.dataBaseService
    .login(this.userLoginForm.value)
    .subscribe((res: UserResponseI) => {
      if(res){
        const {accessToken, refreshToken} = res.tokens;
        this.userAccessService.setAccessToken(accessToken)
        this.userAccessService.setRefreshToken(refreshToken)
        this.dialog.closeAll();
        this.router.navigate(['Identity', 'Account', 'Manage'])
      } else {
        console.log('err login')
      }
    })
  }

  public checkBothPasswords(): boolean{
    this.errorField = this.userRegistrationForm.get('password')?.value === this.userRegistrationForm.get('check-password')?.value;
    console.log(this.errorField)
    return this.errorField;
  }

  public registr(): void{
    this.dataBaseService
    .register({
      email: this.userRegistrationForm.get('email')?.value,
      password: this.userRegistrationForm.get('password')?.value
    })
    .subscribe((userTokens: UserResponseI) => {
      console.log(userTokens)
      if(userTokens){
        const {accessToken, refreshToken} = userTokens.tokens;
        this.userAccessService.setAccessToken(accessToken);
        this.userAccessService.setRefreshToken(refreshToken);
        this.dialog.closeAll();
        this.router.navigate(['Identity', 'Account', 'Manage'])
      }
    })
  }

 



}
