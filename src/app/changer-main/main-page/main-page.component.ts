import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginDialogComponent } from 'src/app/share/login-dialog/login-dialog.component';
import { LoginService } from 'src/app/share/login.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [DialogService]
})
export class MainPageComponent {

  modalVar: boolean = false;

  constructor(
    private loginService: LoginService,
    public dialog: MatDialog
    ){}

  public openOrCloseModal(): void{
    this.loginService
    .$ModalLogin()
    .subscribe((bool: boolean) => {
      this.modalVar = bool;
      this.dialog.open(LoginDialogComponent, {
        data: bool
      })
    })
  }

  
}
