import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, debounceTime, delay, distinctUntilChanged, Observable, throwError } from 'rxjs';
import { orderDataResponseI } from 'src/app/interfaces/orderDataResponseI';
import { ErrorConfigService } from 'src/app/services/error-config.service';
import { OrderDataService } from 'src/app/share/order-data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{

  currentOrderId: number = +(localStorage.getItem('last_order') as string);

  minutes: number = 14;
  seconds: number = 60;


  $timer: Observable<{minutes: number, seconds: number}> = new Observable((suber) =>{
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
    private router: Router
  ){}


  ngOnInit(): void {
    this.dialog.closeAll();
    this.$timer
    .subscribe((time: {minutes: number, seconds: number}) => {
      this.minutes = time.minutes;
      this.seconds = time.seconds;
    })
    this.initOrder();
  }

  private resetSeconds(): void{
    this.seconds = 60;
  }

  private initOrder(): void{
    this.orderDataService
    .getCurrentOrderById(+(localStorage.getItem('last_order') as string))
    .pipe(
      catchError((error) => {
        this.errorConfigService.errorConfig('Вы не авторизованы')
        return throwError(error)})
    )
    .subscribe((data: orderDataResponseI) => {
      console.log(data)
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

  public changeOrderStatus(status: string): void{
    this.orderDataService
    .changeStatus({id: this.currentOrderId, status})
    .subscribe(() => {
      this.errorConfigService.errorConfig('Ваш заказ ' + status)
      if(status === 'отменен'){
        this.dialog.closeAll();
        localStorage.removeItem('last_order');
        this.router.navigate(['Identity','Account','Manage'])
      } else {
        this.router.navigate(['Identity','Account','Manage'])
      }
    })
  }




}
