import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginVar: boolean = false;

  loginModalVar: boolean = false;

  constructor() { }

  public isLoggin(): boolean{
    // this.loginVar = true;
    return this.loginVar
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
