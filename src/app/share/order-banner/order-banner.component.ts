import { Component, Input, OnInit } from '@angular/core';
import { orderDataResponseI } from 'src/app/interfaces/orderDataResponseI';

@Component({
  selector: 'app-order-banner',
  templateUrl: './order-banner.component.html',
  styleUrls: ['./order-banner.component.scss']
})
export class OrderBannerComponent implements OnInit{
  @Input() public lastOrder: orderDataResponseI | null = null;

  ngOnInit(): void {
    
  }

  

}
