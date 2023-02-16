import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { orderDataResponseI } from '../interfaces/orderDataResponseI';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  public orderData: BehaviorSubject<orderDataResponseI | null> = new BehaviorSubject<orderDataResponseI | null>(null);
  public $getOrderData: Observable<orderDataResponseI | null> = this.orderData.asObservable();

  constructor() { }

}
