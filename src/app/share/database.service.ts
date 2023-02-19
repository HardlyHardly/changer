import { HttpBackend, HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CreateOrder } from '../interfaces/createOrderI';
import { CurrenciesCalculateI } from '../interfaces/currenciesCalculateI';
import { orderDataResponseI } from '../interfaces/orderDataResponseI';
import {  UserLoginDataI } from '../interfaces/userLoginData';
import { userRegisterDataI } from '../interfaces/userRegisterData';
import { UserResponseI } from '../interfaces/userRessponseI';



export const baseUrl: string = 'http://localhost:3500';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  

  constructor(
    private http: HttpClient,
  ) { 
  }

  public changeCurrencies(data: CurrenciesCalculateI): Observable<number>{
    return this.http.post<number>(baseUrl + '/crypto/calculate', data)
    .pipe(catchError(this.formatErrors))
  }

  private formatErrors(error: any) {
    return throwError(error);
  }

  public createOrder(data: CreateOrder, accessHeader: string): Observable<any>{
    console.log(accessHeader)
    return this.http.post<any>(baseUrl + '/orders', data, {
      headers: {
        'Authorization': 'Bearer ' + accessHeader
      }
    })
  }

  public registerUserFromOrder(data: {email: string}){
    return this.http.post<UserResponseI>(baseUrl + '/users/register', data)
    .pipe(catchError(this.formatErrors))
  }

  public getOrders(): Observable<orderDataResponseI[]>{
    return this.http.get<orderDataResponseI[]>(baseUrl + '/orders', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      }
    })
  }

  public register(userData: userRegisterDataI): Observable<UserResponseI>{
    return this.http.post<UserResponseI>(baseUrl + '/users/register', userData)
  }


}
