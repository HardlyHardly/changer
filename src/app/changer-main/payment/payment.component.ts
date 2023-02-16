import { Component, OnInit } from '@angular/core';
import { debounceTime, delay, distinctUntilChanged } from 'rxjs';
import { orderDataResponseI } from 'src/app/interfaces/orderDataResponseI';
import { OrderDataService } from 'src/app/share/order-data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{

  orderData: orderDataResponseI | null = null;

  constructor(
    private readonly orderDataService: OrderDataService
  ){
    

    
  }

  ngOnInit(): void {
    // const curMinutes = new Date().getMinutes();
    // const userHaveTime = new Date().getSeconds();
    // console.log(curMinutes)
    // console.log(userHaveTime)

    this.orderDataService
    .$getOrderData
    .pipe(
      distinctUntilChanged(),
      debounceTime(1000)
      )
    .subscribe((data: orderDataResponseI | null) => {
      if(data !== null)
      this.orderData = data;
    })
  }

  


}
