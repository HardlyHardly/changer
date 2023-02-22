import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { orderDataResponseI } from '../interfaces/orderDataResponseI';
import { baseUrl } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {


  constructor(
    private http: HttpClient
  ) { }

  public changeStatus(body: {id: number, status: string}): Observable<any>{
    const url = `${baseUrl}/orders/update`
    return this.http.post(url, body, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  }

  setCurrentOrderId(value: number): void{
    localStorage.setItem('last_order', value.toString());
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
