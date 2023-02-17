import { HttpBackend, HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CreateOrder } from '../interfaces/createOrderI';
import { CurrenciesCalculateI } from '../interfaces/currenciesCalculateI';
import { UserResponse } from '../interfaces/userRessponseI';
import { UserAccessService } from './user-access.service';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private httpWithoutInterceptor: HttpClient;

  private baseUrl: string = 'http://localhost:3500';

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
    private readonly userAccessService: UserAccessService
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
    console.log(accessHeader)
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

  public getOrders(): Observable<any[]>{
    
    return this.http.get<any[]>(this.baseUrl + '/orders', {
      headers: {
        'Authorization': 'Bearer ' + this.userAccessService.getAccessToken(),
      }
    })
  }

  public getOrdersPromise(): Promise<Response>{
    return fetch(this.baseUrl + '/orders', {
      headers: {
        'Authorization': 'Bearer ' + this.userAccessService.getAccessToken(),
      },
      method: 'GET',
      mode: 'cors'
    })
  }



}
