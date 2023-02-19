import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginModalVar: boolean = false;

  constructor() { }




  public $ModalLogin(): Observable<boolean>{
    return new Observable((suber) => {
      suber.next(this.loginModalVar)
    })
  }

  public openOrCloseModal(): void{
    this.loginModalVar = !this.loginModalVar;
  }

  public openCustomModal(bool: boolean): void{
    this.loginModalVar = bool;
  }
}
