import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurrency } from '../interfaces/ICurrency';
import { baseUrl } from '../share/database.service';

@Injectable({
  providedIn: 'root'
})
export class ChangeCurrencyService {

  constructor(
    private http: HttpClient
  ) { }

  public createCurrency(body: ICurrency, image: File | null ): Observable<any>{
    const url = `${baseUrl}/currencies`

    const formData = new FormData();

    if(body){
      formData.append('symbol', body.index);
      formData.append('name', body.name);
      formData.append('price', body.price.toString());
      formData.append('wallet', body.wallet);
    }
    if(image){
      formData.append('image', image)
    }
    

    return this.http.post<any>(url, formData, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  }

  public updateCurrency(body: {id: number, wallet: string}): Observable<any>{
    console.log(body)
    const url = `${baseUrl}/currencies`
    

    return this.http.put<any>(url, body, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  }

  public deleteCurrency(id: number): Observable<any>{
    const url = `${baseUrl}/currencies/${id}`
    return this.http.delete(url, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  }

  public getCurrencies(): Observable<ICurrency[]>{
    const url = `${baseUrl}/currencies`
    return this.http.get<ICurrency[]>(url, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  }
}
