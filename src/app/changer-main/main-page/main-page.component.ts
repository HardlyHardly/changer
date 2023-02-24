import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginDialogComponent } from 'src/app/share/login-dialog/login-dialog.component';
import { LoginService } from 'src/app/services/login.service';
import { OrderModalService } from 'src/app/share/order-modal.service';
import { OrderModalComponent } from 'src/app/share/order-modal/order-modal.component';
import { map, Observable, of, Subscription } from 'rxjs';
import { OrderDataService } from 'src/app/share/order-data.service';
import { orderDataResponseI } from 'src/app/interfaces/orderDataResponseI';
import { DatabaseService } from 'src/app/share/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [DialogService]
})
export class MainPageComponent implements OnInit, OnDestroy {

  order: orderDataResponseI | null = null;

  modalVar: boolean = false;

  private isOrderedSubscription!: Subscription;

  private modalSubscription!: Subscription;

  constructor(
    private readonly loginService: LoginService,
    private readonly dialog: MatDialog,
    private readonly orderModalService: OrderModalService,
    private databaseService: DatabaseService,
    private authService: AuthService,
    private orderdataService: OrderDataService
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
    this.modalSubscription = this.orderModalService
    .$eventFromHomePage
    .subscribe((event: string) => {
      if(event === 'event'){
        this.dialog.open(OrderModalComponent, {
          disableClose: true
        })
      }
    })  

    this.isOrderedSubscription = this.orderdataService
    .isOrdered$
    .subscribe((value: orderDataResponseI | null) => {
      this.order = value
    })




    
  }

  removeOrder(value: null): void{
    this.order = value;
  }

  removeOrderFromPayvment(): void{
    this.orderdataService
    .removeOrderObservable$
    .subscribe((value: null) => this.order = null);
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
    this.orderModalService.eventFromHomePage.next('');
    this.isOrderedSubscription.unsubscribe();
  }

  
}
