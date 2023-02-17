import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ChangeI } from 'src/app/interfaces/changeI';
import { CryptoI } from 'src/app/interfaces/cryptoI';
import { orderDataResponseI } from 'src/app/interfaces/orderDataResponseI';
import { UserResponseI } from 'src/app/interfaces/userRessponseI';
import { DatabaseService } from '../database.service';
import { ErrorLoginDialogComponent } from '../error-login-dialog/error-login-dialog.component';
import { GlobaldataService } from '../globaldata.service';
import { HomeSelectService } from '../home-select.service';
import { LoginService } from '../login.service';
import { OrderDataService } from '../order-data.service';
import { OrderModalService } from '../order-modal.service';
import { UserAccessService } from '../user-access.service';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit{

  showPromoFieldCond: boolean = false;

  userEmail: string = '';

  public amountTo: number = 0;

  public amountFrom: number = 0;

  cryptos: CryptoI[] = [];
  changed: ChangeI[] = [];

  userForm = new FormGroup({
    'card': new FormControl(''),
    'fio': new FormControl(''),
    'wallet': new FormControl('')
  })



  selectedCrypto: CryptoI | null = null;
  selectedChanged: ChangeI | CryptoI | null = null;
  changeUserForm: boolean;

  constructor(
    private readonly orderModalService: OrderModalService,
    private readonly homeSelectService: HomeSelectService,
    private readonly dataService: GlobaldataService,
    private readonly dataBaseService: DatabaseService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly orderDataService: OrderDataService,
    private readonly loginService: LoginService,
    private readonly userAccessService: UserAccessService
  ){
    this.changeUserForm = this.orderModalService.getChangeUserForm();
    this.homeSelectService
    .$getSelectedCrypto()
    .subscribe((selectedCrypto: CryptoI | null) => (this.selectedCrypto = selectedCrypto))
    this.homeSelectService
    .$getSelectedChanged()
    .subscribe((selectedChanged: ChangeI | CryptoI | null) => (this.selectedChanged = selectedChanged))
  }

  ngOnInit(): void {
    this.initCryptos();
    this.initChanged();
  }

  private initCryptos(){
    this.cryptos = this.dataService.getCryptos();
  }

  private initChanged(){
    this.changed = this.dataService.getChanged();
  }

  private setCalculatedData(symbolFrom: string, symbolTo: string, amount: number): Observable<number>{
    return this.dataBaseService.
      changeCurrencies({
        symbolFrom,
        symbolTo,
        amount
      })
  }

  public setCalculatedDataFrom(): void{
    if(this.selectedCrypto && this.selectedChanged)
    this.setCalculatedData(this.selectedCrypto.index, this.selectedChanged.index, this.amountFrom)
    .subscribe((amonuntTo: number) => {
      this.amountTo = amonuntTo;
    })
  }

  public setCalculatedDataTo(): void{
    if(this.selectedCrypto && this.selectedChanged)
    this.setCalculatedData(this.selectedCrypto.index, this.selectedChanged.index, this.amountTo)
    .subscribe((amonuntFrom: number) => {
      this.amountFrom = amonuntFrom;
    })
  }

  public createOrder(): void{
    if(this.selectedCrypto && this.selectedChanged){
      this.dataBaseService
        .registerUserFromOrder({email: this.userEmail})
        .pipe(
          catchError((error: any) => {
            if(error.status === 500){
              this.dialog.open(ErrorLoginDialogComponent, {
                data: error.error
              })
            }
            return throwError(error)
            })
        )
        .subscribe((body: UserResponseI) => {
          if(body){
            this.loginService.setIsLoggin(true)
            this.dialog.closeAll();
            this.router.navigate(['Payment']);
          }
          const {accessToken, refreshToken} = body.tokens;
          this.userAccessService.setAccessToken(accessToken);
          this.userAccessService.setRefreshToken(refreshToken);
          if(this.selectedCrypto && this.selectedChanged){
            if(this.selectedChanged.type === 'BANK'){
              this.dataBaseService
              .createOrder({
                symbolFrom: this.selectedCrypto?.index,
                valueFrom: this.amountFrom,
                symbolTo: this.selectedChanged?.index,
                valueTo: this.amountTo,
                card: this.userForm.value.card,
                fio: this.userForm.value.fio,
              }, accessToken)
              .subscribe((res: orderDataResponseI) => {
                if(res)
                this.orderDataService.orderData.next(res);
              })
            }
            if(this.selectedChanged.type === 'CRYPTO'){
              this.dataBaseService
              .createOrder({
                symbolFrom: this.selectedCrypto?.index,
                valueFrom: this.amountFrom,
                symbolTo: this.selectedChanged?.index,
                valueTo: this.amountTo,
                wallet: this.userForm.value.wallet
              }, accessToken)
              .subscribe((res: orderDataResponseI) => {
                if(res)
                this.orderDataService.orderData.next(res);
              })
            }
          }
        })
      
    }
  }

  public changeForm(){
    if(this.selectedChanged && this.selectedCrypto && this.amountFrom !== 0 && this.amountTo !== 0)
    this.orderModalService.showHideChangeUserForm();
    this.getChangeUserForm();
  }

  public resetForm(){
    if(this.selectedChanged && this.selectedCrypto && this.amountFrom !== 0 && this.amountTo !== 0)
    this.orderModalService.resetChangeUserForm();
    this.getChangeUserForm();
  }

  public showPromoField(): void{
    this.showPromoFieldCond = !this.showPromoFieldCond;
  }

  private getChangeUserForm(): void{
    this.orderModalService
    .$changeUserForm
    .subscribe((changeUserForm: boolean) => (
      this.changeUserForm = changeUserForm
    ))
  }

  public closeAllDialogs(): void{
    this.dialog.closeAll();
  }

 

    
}
