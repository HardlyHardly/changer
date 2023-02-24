import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { orderDataResponseI } from '../interfaces/orderDataResponseI';
import { baseUrl } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  removeOrderSubject: BehaviorSubject<null> = new BehaviorSubject<null>(null);
  removeOrderObservable$: Observable<null> = this.removeOrderSubject.asObservable();
 

  isOrdered: BehaviorSubject<orderDataResponseI | null> = new BehaviorSubject<orderDataResponseI | null>(null);
  isOrdered$: Observable<orderDataResponseI | null> = this.isOrdered.asObservable();


  constructor(
    private http: HttpClient
  ) { }

  public changeStatus(body: {id: number, status: string}): Observable<any>{
    console.log(body);
    const url = `${baseUrl}/orders/update`
    return this.http.post(url, body, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  }

  setLastOrder(value: orderDataResponseI): void{
    localStorage.setItem('last_order', JSON.stringify(value));
  }

  getLastOrder(): orderDataResponseI{
    return JSON.parse(localStorage.getItem('last_order') as any);
  }

  public getCurrentOrderById(id: number): Observable<orderDataResponseI>{
    const url = `${baseUrl}/orders/${id}`
    console.log(url)
    return this.http.get<orderDataResponseI>(url, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  }

  


}
