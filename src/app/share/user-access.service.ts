import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService {

  private accessToken: string = '';
  private refreshToken: string = '';

  constructor() { }

  public getAccessToken(): string{
    return this.accessToken
  }

  public setAccessToken(value: string): void{
    localStorage.setItem('accessToken', value)
    this.accessToken = value;
  }

  public getRefreshToken(): string{
    return this.refreshToken
  }

  public setRefreshToken(value: string): void{
    localStorage.setItem('refreshToken', value)
    this.refreshToken = value;
  }

  

  


}
