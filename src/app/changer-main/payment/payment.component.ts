import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, Observer, throwError } from 'rxjs';
import { ICurrency } from 'src/app/interfaces/ICurrency';
import { orderDataResponseI } from 'src/app/interfaces/orderDataResponseI';
import { ChangeCurrencyService } from 'src/app/services/change-currency.service';
import { ErrorConfigService } from 'src/app/services/error-config.service';
import { OrderDataService } from 'src/app/share/order-data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy{

  


  currentOrderId: number = JSON.parse(localStorage.getItem('last_order') as any).id;

  symbolNames: 
  {valueFromName: string, valueToName: string} = 
  {
    valueFromName: '',
    valueToName: ''
  }


  minutes: number = 14;
  seconds: number = 59;


  $timer: Observable<{minutes: number, seconds: number}> = 
  new Observable((suber: Observer<{minutes: number, seconds: number}>) =>{
    const ticker = setInterval(() => {
      this.seconds = this.seconds - 1;
      if(this.seconds === 0){
        this.minutes = this.minutes - 1;
        this.resetSeconds();
      }
      if(this.minutes == 0){
        clearInterval(ticker);
        this.changeOrderStatus('отменен');
      }
    }, 1000);
    
    suber.next({minutes: this.minutes, seconds: this.seconds})
  }) 

  orderData: orderDataResponseI | null = null;
  constructor(
    private readonly orderDataService: OrderDataService,
    private readonly dialog: MatDialog,
    private errorConfigService: ErrorConfigService,
    private router: Router,
    private changeCurrencyService: ChangeCurrencyService,
  ){}


  ngOnInit(): void {
    this.dialog.closeAll();
    this.$timer
    .subscribe((time: {minutes: number, seconds: number}) => {
        if(this.getSaveTime() != null){
          this.seconds = this.getSaveTime()!.seconds;
          this.minutes = this.getSaveTime()!.minutes;
        } else {
          this.minutes = this.minutes,
          this.seconds = this.seconds
        }
    })
    this.initOrder();
    this.initSymbolNames()
  }

  private resetSeconds(): void{
    this.seconds = 59;
  }

  private initOrder(): void{
    this.orderDataService
    .getCurrentOrderById(this.getLastOrder().id)
    .pipe(
      catchError((error) => {
        this.errorConfigService.errorConfig('Вы не авторизованы')
        return throwError(error)})
    )
    .subscribe(() => {
      let data: orderDataResponseI =  this.getLastOrder()
      console.log(data);
      if(data !== null)
        for(let key in data){
          if(key === 'createdAt'){
            data = {
              ...data,
              createdAt: data.createdAt.split("T")[0].split("-").reverse().join('.')
            }
          }
        }
        this.orderData = data;
    })
  }

  public getLastOrder(): orderDataResponseI{
    return JSON.parse(localStorage.getItem('last_order') as any);
  }

  public changeOrderStatus(status: string): void{
    this.orderDataService
    .changeStatus({id: this.currentOrderId, status})
    .subscribe(() => {
      this.errorConfigService.errorConfig('Ваш заказ ' + status)
      if(status === 'отменен'){
        this.dialog.closeAll();
        localStorage.removeItem('last_order');
        this.orderDataService.removeOrderSubject.next(null);
        this.router.navigate(['Identity','Account','Manage'])
      } else {
        localStorage.removeItem('last_order');
        this.orderDataService.removeOrderSubject.next(null);
        this.router.navigate(['Identity','Account','Manage'])
      }
    })
  }

  public getUserWallet(): string{
    return localStorage.getItem('wallet') as string;
  }

  public initSymbolNames(): void{
    this.changeCurrencyService
    .getCurrencies()
    .subscribe((currencies: ICurrency[]) => {
      const arr = [...currencies];
      this.symbolNames.valueFromName = arr.filter((obj: ICurrency) => (obj.symbol === this.getLastOrder().symbolFrom))[0].name;
      this.symbolNames.valueToName = arr.filter((obj: ICurrency) => (obj.symbol === this.getLastOrder().symbolTo))[0].name;
    })
  }


  ngOnDestroy(){
    this.saveTime();
  }


  private saveTime(): void{
    localStorage.setItem('save_time', JSON.stringify({minutes: this.minutes, seconds: this.seconds}))
  }

  private getSaveTime(): {minutes: number, seconds: number} | null{
    return JSON.parse(localStorage.getItem('save_time') as any);
  }



  

}
