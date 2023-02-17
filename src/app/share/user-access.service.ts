import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService {

  private accessToken: string = '';
  private refreshToken: string = '';

  constructor() { }

  public getAccessToken(): string{
    console.log('access', this.accessToken)
    return this.accessToken
  }

  public setAccessToken(value: string): void{
    localStorage.setItem('accessToken', value)
    this.accessToken = value;
  }

  public getRefreshToken(): string{
    console.log('refresh', this.refreshToken)
    return this.refreshToken
  }

  public setRefreshToken(value: string): void{
    localStorage.setItem('refreshToken', value)
    this.refreshToken = value;
  }

  

  


}
