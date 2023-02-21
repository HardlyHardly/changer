import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginDialogComponent } from 'src/app/share/login-dialog/login-dialog.component';
import { LoginService } from 'src/app/services/login.service';
import { OrderModalService } from 'src/app/share/order-modal.service';
import { OrderModalComponent } from 'src/app/share/order-modal/order-modal.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [DialogService]
})
export class MainPageComponent implements OnInit {

  modalVar: boolean = false;

  constructor(
    private readonly loginService: LoginService,
    private readonly dialog: MatDialog,
    private readonly orderModalService: OrderModalService
    ){}

  public openOrCloseModalLogin(): void{
    this.loginService
    .$ModalLogin()
    .subscribe((bool: boolean) => {
      this.modalVar = bool;
      this.dialog.open(LoginDialogComponent, {
        data: bool
      })
    })
  }

  ngOnInit(): void {
    this.orderModalService
    .$eventFromHomePage
    .subscribe((event: string) => {
      if(event === 'event'){
        this.dialog.open(OrderModalComponent, {
          disableClose: true
        })
      } else {
        return
      }
    })   
  }

  
}
