import { HttpBackend, HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CreateOrder } from '../interfaces/createOrderI';
import { CurrenciesCalculateI } from '../interfaces/currenciesCalculateI';
import { orderDataResponseI } from '../interfaces/orderDataResponseI';
import {  UserLoginDataI } from '../interfaces/userLoginData';
import { userRegisterDataI } from '../interfaces/userRegisterData';
import { UserResponseI } from '../interfaces/userRessponseI';
import { UserAccessService } from './user-access.service';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  private baseUrl: string = 'http://localhost:3500';

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
    private readonly userAccessService: UserAccessService
  ) { 
  }

  public changeCurrencies(data: CurrenciesCalculateI): Observable<number>{
    return this.http.post<number>(this.baseUrl + '/crypto/calculate', data)
    .pipe(catchError(this.formatErrors))
  }

  private formatErrors(error: any) {
    return throwError(error);
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
    return this.http.post<UserResponseI>(this.baseUrl + '/users/register', data)
    .pipe(catchError(this.formatErrors))
  }

  public getOrders(): Observable<orderDataResponseI[]>{
    return this.http.get<orderDataResponseI[]>(this.baseUrl + '/orders', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      }
    }).pipe(
      catchError((error: any) => {
        console.log(error.status)
        if(error.status === 401){
          this.RefreshToken(localStorage.getItem('refreshToken'))
          .subscribe((tokens: UserResponseI) => {
            const {accessToken, refreshToken} = tokens.tokens;
            this.userAccessService.setAccessToken(accessToken);
            this.userAccessService.setRefreshToken(refreshToken);
          })
        }
        return throwError(error)
        })
      )
  }

  private RefreshToken(refreshToken: string | null): Observable<any>{
    return this.http.post(this.baseUrl + '/refresh', '', {
      headers: {
        'Authorization': 'Bearer ' + refreshToken,
      }
    })
  }

  public login(userData: UserLoginDataI): Observable<UserResponseI>{
    return this.http.post<UserResponseI>(this.baseUrl + '/users/login', userData)
  }

  public register(userData: userRegisterDataI): Observable<UserResponseI>{
    return this.http.post<UserResponseI>(this.baseUrl + '/users/register', userData)
  }


}
