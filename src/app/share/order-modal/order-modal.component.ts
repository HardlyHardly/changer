import { Component, ErrorHandler, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ChangeI } from 'src/app/interfaces/changeI';
import { CryptoI } from 'src/app/interfaces/cryptoI';
import { orderDataResponseI } from 'src/app/interfaces/orderDataResponseI';
import { UserResponseI } from 'src/app/interfaces/userRessponseI';
import { DatabaseService } from '../database.service';
import { GlobaldataService } from '../globaldata.service';
import { LoginService } from '../../services/login.service';
import { OrderDataService } from '../order-data.service';
import { OrderModalService } from '../order-modal.service';
import { HomeSelectService } from 'src/app/services/home-select.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorConfigService } from 'src/app/services/error-config.service';
import { AuthService } from 'src/app/services/auth.service';
import { ChangePasswordService } from 'src/app/services/change-password.service';
import { ChangeCurrencyService } from 'src/app/services/change-currency.service';
import { ICurrency } from 'src/app/interfaces/ICurrency';


@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit{

  showPromoFieldCond: boolean = false;

  userEmail: string = '';

  public amountTo: number = 0;

  public amountFrom: number = 1;

  cryptos: CryptoI[] = [];
  changed: ChangeI[] = [];

  userForm = new FormGroup({
    'card': new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
    'fio': new FormControl('', Validators.minLength(3)),
    'wallet': new FormControl('', [Validators.required, Validators.minLength(40), Validators.pattern(/^[A-Za-z0-9]*$/)]), 
    'access': new FormControl(false, Validators.required)
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
    private errorConfigService: ErrorConfigService,
    private authService: AuthService,
    private changePasswrodService: ChangePasswordService,
    private changeCurrencyService: ChangeCurrencyService,
    @Inject(MAT_DIALOG_DATA) public email: string
  ){
    this.changeUserForm = this.orderModalService.getChangeUserForm();
    this.homeSelectService
    .$getSelectedCrypto()
    .subscribe((selectedCrypto: CryptoI | null) => (this.selectedCrypto = selectedCrypto))
    this.homeSelectService
    .$getSelectedChanged()
    .subscribe((selectedChanged: ChangeI | CryptoI | null) => (this.selectedChanged = selectedChanged))
    if(this.authService.isAuthenticated()){
      this.userEmail = this.changePasswrodService.checkEmail();
    }
  }

  ngOnInit(): void {
    if(this.email !== null){
      this.userEmail = this.email
    }
    this.initCryptos();
    this.initChanged();
    this.setCalculatedDataFrom();
  }

  private initCryptos(){
    this.changeCurrencyService
    .getCurrencies()
    .subscribe((res: ICurrency[]) => {
      this.cryptos = res.map((obj: ICurrency): CryptoI => 
      ({...obj, 'type': 'CRYPTO'}))
      .filter((obj: CryptoI) => (obj.symbol !== 'RUB'));
    })
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
    this.setCalculatedData(this.selectedCrypto.symbol, this.selectedChanged.symbol, this.amountFrom)
    .subscribe((amonuntTo: number) => {
      this.amountTo = amonuntTo;
    })
  }

  public setCalculatedDataTo(): void{
    if(this.selectedCrypto && this.selectedChanged)
    this.setCalculatedData(this.selectedCrypto.symbol, this.selectedChanged.symbol, this.amountTo)
    .subscribe((amonuntFrom: number) => {
      this.amountFrom = amonuntFrom;
    })
  }

  public createOrder(): void{
    if(this.userForm.get('wallet')?.errors){
      this.errorConfigService.errorConfig('Некоректные данные');
      return
    }
    if(this.userForm.value.access === false){
      this.errorConfigService.errorConfig('Примите соглашение');
      return
    }
    


    const accessToken = localStorage.getItem('access_token');
    

    if(this.authService.isAuthenticated()){
      if(this.selectedCrypto && this.selectedChanged){
        if(this.selectedChanged.type === 'BANK'){
          this.dataBaseService
          .createOrder({
            symbolFrom: this.selectedCrypto?.symbol,
            valueFrom: this.amountFrom,
            symbolTo: this.selectedChanged?.symbol,
            valueTo: this.amountTo,
            card: this.userForm.value.card,
            fio: this.userForm.value.fio,
          }, accessToken as string)
          .subscribe((res: orderDataResponseI) => {
            if(res)
            this.saveUserWalletToLocalStorage();
            this.orderModalService.resetChangeUserForm();
            this.saveLastOrderData(res);
            this.dialog.closeAll();
            this.router.navigate(['Payment']);
            this.resetTimer();
            this.orderDataService.isOrdered.next(res);
            
          })
        }
        if(this.selectedChanged.type === 'CRYPTO'){
          this.dataBaseService
          .createOrder({
            symbolFrom: this.selectedCrypto?.symbol,
            valueFrom: this.amountFrom,
            symbolTo: this.selectedChanged?.symbol,
            valueTo: this.amountTo,
            wallet: this.userForm.value.wallet
          }, accessToken as string)
          .subscribe((res: orderDataResponseI) => {
            if(res)
            this.saveUserWalletToLocalStorage();
            this.orderModalService.resetChangeUserForm();
            this.saveLastOrderData(res);
            this.dialog.closeAll();
            this.router.navigate(['Payment']);
            this.resetTimer();
            this.orderDataService.isOrdered.next(res);
          })
        }
      }
      
    } else {
      if(this.selectedCrypto && this.selectedChanged){
        this.dataBaseService
          .registerUserFromOrder({email: this.userEmail})
          .pipe(
            catchError((error: any) => {
              this.errorConfigService.errorConfig('Вы уже зарегестрированы, войдите в систему')
              return throwError(error)
              })
          )
          .subscribe((body: UserResponseI) => {
            if(body){
              this.dialog.closeAll();
              this.router.navigate(['Payment']);
            } else {
              this.errorConfigService.errorConfig('Вы уже зарегестрированы, войдите в систему')
            }
            const {accessToken, refreshToken} = body.tokens;
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            if(this.selectedCrypto && this.selectedChanged){
              if(this.selectedChanged.type === 'BANK'){
                this.dataBaseService
                .createOrder({
                  symbolFrom: this.selectedCrypto?.symbol,
                  valueFrom: this.amountFrom,
                  symbolTo: this.selectedChanged?.symbol,
                  valueTo: this.amountTo,
                  card: this.userForm.value.card,
                  fio: this.userForm.value.fio,
                }, accessToken)
                .subscribe((res: orderDataResponseI) => {
                  if(res)
                  this.saveUserWalletToLocalStorage();
                  this.saveLastOrderData(res);
                  this.orderModalService.resetChangeUserForm();
                  this.resetTimer();
                  this.orderDataService.isOrdered.next(res);
                })
              }
              if(this.selectedChanged.type === 'CRYPTO'){
                this.dataBaseService
                .createOrder({
                  symbolFrom: this.selectedCrypto?.symbol,
                  valueFrom: this.amountFrom,
                  symbolTo: this.selectedChanged?.symbol,
                  valueTo: this.amountTo,
                  wallet: this.userForm.value.wallet
                }, accessToken)
                .subscribe((res: orderDataResponseI) => {
                  if(res)
                  this.saveUserWalletToLocalStorage();
                  this.saveLastOrderData(res);
                  this.orderModalService.resetChangeUserForm();
                  this.resetTimer();
                  this.orderDataService.isOrdered.next(res);
                })
              }
            }
          })
        
      }
    }
  }

  private saveUserWalletToLocalStorage(): void{
    localStorage.setItem('wallet', this.userForm.value.wallet as string);
  }

  private saveLastOrderData(obj: orderDataResponseI): void{
    localStorage.setItem('last_order', JSON.stringify(obj))
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

  public createOrderBanner(obj: orderDataResponseI): void{
    this.orderDataService.isOrdered.next(obj)
  }

 
  public triggerWallet(): void{
    if(this.userForm.get('wallet')?.invalid){
      this.errorConfigService.errorConfig('Некоректный кошилек');
    }
  }
    

  public redirectOnRules(): void{
    this.dialog.closeAll();
    this.router.navigate(['Rules']);
  }

  private resetTimer(): void{
    localStorage.setItem('save_time', JSON.stringify({minutes: 14, seconds: 59}))
  }
}
