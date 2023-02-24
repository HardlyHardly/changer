import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChangePasswordService } from 'src/app/services/change-password.service';
import { ErrorConfigService } from 'src/app/services/error-config.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  newPass: string = '';
  newPassCheck: string = '';
  newEmail: string = '';

  constructor(
    private changePasswordService: ChangePasswordService,
    private errorConfigService: ErrorConfigService
  ){}

  public checkPasswords(e?: Event): boolean{
    return this.newPass === this.newPassCheck;
  }

  public isAdmin(): boolean{
    return this.changePasswordService.checkRole() === 'admin'
  }

  public changePassword(): void{
    if(this.changePasswordService.checkRole() === 'admin'){
      if(this.checkPasswords()){
        if(this.newEmail === this.changePasswordService.checkEmail()){
          this.changePasswordService
          .changeAdminPassword({
            password: this.newPass
          })
          .subscribe((answer: string) => {
            this.resetFields();
            this.errorConfigService.errorConfig('Ваш пароль был успешно изменен')
          })
        } else {
          this.changePasswordService
          .changeAdminPassword({
            password: this.newPass,
            email: this.newEmail
          })
          .subscribe((answer: string) => {
            this.resetFields();
            this.errorConfigService.errorConfig('Ваш пароль был успешно изменен')
          })
        }
        
      }
    } else {
      if(this.checkPasswords()){
        this.changePasswordService
        .changeUserPassword({password: this.newPass})
        .subscribe((answer: string) => {
          console.log(answer);
          this.resetFields();
          this.errorConfigService.errorConfig('Ваш пароль был успешно изменен')
        })
      }
    }
  }

  private resetFields(): void{
    this.newPass = '';
    this.newPassCheck = '';
    this.newEmail = '';
  }
}
