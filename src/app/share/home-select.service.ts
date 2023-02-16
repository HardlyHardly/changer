import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeI } from '../interfaces/changeI';
import { CryptoI } from '../interfaces/cryptoI';

@Injectable({
  providedIn: 'root'
})
export class HomeSelectService {

  private selectedCrypto: CryptoI | null = null;
  private selectedChanged: ChangeI | CryptoI | null = null;

  constructor() { }

  public setSelectedCrypto(value: CryptoI | null): void{
    this.selectedCrypto = value;
  }

  public $getSelectedCrypto(): Observable<CryptoI | null>{
    return new Observable((suber) => {
      suber.next(this.selectedCrypto)
    })
  }

  public setSelectedChanged(value: ChangeI | CryptoI | null): void{
    this.selectedChanged = value;
  }

  public $getSelectedChanged(): Observable<ChangeI | CryptoI | null>{
    return new Observable((suber) => {
      suber.next(this.selectedChanged)
    })
  }




}
