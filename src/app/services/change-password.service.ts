import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { role } from '../interfaces/userRessponseI';
import { baseUrl } from '../share/database.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(
    private http: HttpClient
  ) { }

  public checkRole(): role{
    return JSON.parse(localStorage.getItem('user') as any).role;
  }

  public checkEmail(): string{
    return JSON.parse(localStorage.getItem('user') as any).email;
  }

  public changeAdminPassword(body: {password: string, email?: string}): Observable<string>{
    const url = `${baseUrl}/admins`;
    return this.http.put<string>(url, body, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      }
    })
  }

  public changeUserPassword(body: {password: string}){
    const url = `${baseUrl}/users`;
    return this.http.put<string>(url, body, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      }
    })
  }


}
