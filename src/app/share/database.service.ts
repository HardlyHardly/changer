import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CurrenciesCalculateI } from '../interfaces/currenciesCalculateI';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private httpWithoutInterceptor: HttpClient;

  private baseUrl: string = 'https://9965-195-49-215-148.eu.ngrok.io';

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

}
