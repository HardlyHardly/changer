import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CreateOrder } from '../interfaces/createOrderI';
import { CurrenciesCalculateI } from '../interfaces/currenciesCalculateI';
import { UserResponse } from '../interfaces/userRessponseI';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private httpWithoutInterceptor: HttpClient;

  private baseUrl: string = 'https://6091-95-47-122-109.eu.ngrok.io';

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
  ) { 
    this.httpWithoutInterceptor = new HttpClient(httpBackend);
  }

  public changeCurrencies(data: CurrenciesCalculateI): Observable<number>{
    return this.http.post<number>(this.baseUrl + '/crypto/calculate', data)
    .pipe(catchError(this.formatErrors))
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  public createOrder(data: CreateOrder, accessHeader: string): Observable<any>{
    return this.http.post<any>(this.baseUrl + '/orders', data, {
      headers: {
        'Authorization': 'Bearer ' + accessHeader
      }
    })
  }

  public registerUserFromOrder(data: {email: string}){
    return this.http.post<UserResponse>(this.baseUrl + '/users/register', data)
    .pipe(catchError(this.formatErrors))
  }

}
