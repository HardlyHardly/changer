import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { role, UserResponseI } from '../interfaces/userRessponseI';
import { baseUrl} from '../share/database.service';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { UserLoginDataI } from '../interfaces/userLoginData';
import { IUser } from '../interfaces/IUser';
import { tokenI } from '../interfaces/tokenI';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private dialog: MatDialog
  ) { }

  isAuthenticated() {

    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken || !refreshToken) {
      this.logout()
      return false;
    }

    try {
      jwt_decode(accessToken);
      jwt_decode(refreshToken);
      return true;
    } catch (error) {
      this.logout()
      this.clearLocalStorage();
      return false;
    }
  }

  public refreshToken(): Observable<UserResponseI>{
    const url = `${baseUrl}/refresh`;
  
    return this.http.post<UserResponseI>(url, null, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('refresh_token'),
      }
    }).pipe(
      map((response: any) => {
        const {accessToken, refreshToken} = response.tokens
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        return accessToken;
      })
    )
  }

  private clearLocalStorage() {
    localStorage.clear();
  }

  public logout() {
    this.clearLocalStorage();
    this.dialog.closeAll();
    this.router.navigate(['']);
  }

  public login(userData: UserLoginDataI): Observable<UserResponseI>{
    const url = `${baseUrl}/users/login`
    return this.http.post<UserResponseI>(url, userData)
  }


  public getUser(): IUser | null{
    return JSON.parse(localStorage.getItem('user') as string)
  }


}
