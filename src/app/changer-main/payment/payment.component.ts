import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { debounceTime, delay, distinctUntilChanged, Observable } from 'rxjs';
import { orderDataResponseI } from 'src/app/interfaces/orderDataResponseI';
import { OrderDataService } from 'src/app/share/order-data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{

  minutes: number = 14;
  seconds: number = 60;


  $timer: Observable<{minutes: number, seconds: number}> = new Observable((suber) =>{
    const ticker = setInterval(() => this.seconds = this.seconds - 1, 1000);
    if(this.seconds === 0){
      this.minutes = this.minutes - 1;
      this.resetSeconds();
    }
    suber.next({minutes: this.minutes, seconds: this.seconds})
  }) 

  orderData: orderDataResponseI | null = null;
  constructor(
    private readonly orderDataService: OrderDataService
  ){
    this.orderDataService
      .$getOrderData
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        )
      .subscribe((data: orderDataResponseI | null) => {
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
        console.log(this.orderData?.createdAt)
      })
    
  }


  ngOnInit(): void {
    this.$timer
    .subscribe(time => (time))
  }

  private resetSeconds(): void{
    this.seconds = 60;
  }
  


}
