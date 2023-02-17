import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginVar: boolean = false;

  loginModalVar: boolean = false;

  constructor() { }

  public isLoggin(): boolean{
    if(localStorage.getItem('accessToken')){
      this.loginVar = true;
    } 
    return this.loginVar
  }

  public setIsLoggin(value: boolean): void{
    this.loginVar = value;
  }

  public $ModalLogin(): Observable<boolean>{
    return new Observable((suber) => {
      suber.next(this.loginModalVar)
    })
  }

  public openOrCloseModal(): void{
    this.loginModalVar = !this.loginModalVar;
  }
}
