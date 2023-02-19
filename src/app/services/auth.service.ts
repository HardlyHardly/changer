import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserResponseI } from '../interfaces/userRessponseI';
import { baseUrl, DatabaseService } from '../share/database.service';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { UserLoginDataI } from '../interfaces/userLoginData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public checkIsAuthenticated = false;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,

  ) { }

  isAuthenticated() {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken || !refreshToken) {
      this.logout()
      this.checkIsAuthenticated = false;
      return false;
    }

    try {
      jwt_decode(accessToken);
      jwt_decode(refreshToken);
      this.checkIsAuthenticated = true;
      return true;
    } catch (error) {
      this.logout()
      this.clearLocalStorage();
      this.checkIsAuthenticated = false;
      return false;
    }
  }

  public refreshToken(): Observable<UserResponseI>{
    const url = `${baseUrl}/refresh`;
  
    return this.http.post<UserResponseI>(url, null, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(''),
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
    console.log('logout')
    this.clearLocalStorage();
    this.router.navigate(['']);
  }

  public login(userData: UserLoginDataI): Observable<UserResponseI>{
    const url = `${baseUrl}/users/login`
    return this.http.post<UserResponseI>(url, userData)
  }
}
