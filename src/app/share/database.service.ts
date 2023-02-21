import { HttpBackend, HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { CreateOrder } from '../interfaces/createOrderI';
import { CryptoI } from '../interfaces/cryptoI';
import { CurrenciesCalculateI } from '../interfaces/currenciesCalculateI';
import { ICurrency } from '../interfaces/ICurrency';
import { orderDataResponseI } from '../interfaces/orderDataResponseI';
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
    return throwError(error.error);
  }

  public createOrder(data: CreateOrder, accessHeader: string): Observable<any>{
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

  public getOrdersForUser(): Observable<orderDataResponseI[]>{
    const url = `${baseUrl}/orders/${localStorage.getItem('id')}`
    return this.http.get<orderDataResponseI[]>(url, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      }
    })
  }

  public getOrdersForAdmin(): Observable<orderDataResponseI[]>{
    const url = `${baseUrl}/orders/`
    return this.http.get<orderDataResponseI[]>(url, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      }
    })
  }

  public register(userData: userRegisterDataI): Observable<UserResponseI>{
    return this.http.post<UserResponseI>(baseUrl + '/users/register', userData)
    .pipe(catchError(this.formatErrors))
  }




}
