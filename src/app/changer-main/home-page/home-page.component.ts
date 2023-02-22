import { CardI } from './../../interfaces/cardI';
import { Component, OnInit } from '@angular/core';
import { ChangeI } from 'src/app/interfaces/changeI';
import { CryptoI } from 'src/app/interfaces/cryptoI';
import { GlobaldataService } from 'src/app/share/globaldata.service';
import { DatabaseService } from 'src/app/share/database.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserResponseI } from 'src/app/interfaces/userRessponseI';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { OrderModalComponent } from 'src/app/share/order-modal/order-modal.component';
import { OrderModalService } from 'src/app/share/order-modal.service';
import { HomeSelectService } from 'src/app/services/home-select.service';
import { ChangeCurrencyService } from 'src/app/services/change-currency.service';
import { ICurrency } from 'src/app/interfaces/ICurrency';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit{

    userEmail: string = '';

    showPromoFieldCond: boolean = false;

    changeUserForm: boolean = false;

    userFormSwitchCond: 'CRYPTO' | 'BANK' | '' = '';
    
    userForm = new FormGroup({
      'card': new FormControl(''),
      'fio': new FormControl(''),
      'wallet': new FormControl('')
    })

    
    
  
    changed: ChangeI[] = [];
    cryptos: CryptoI[] = [];
    selectedCrypto: CryptoI | null = null;
    selectedChanged: ChangeI | CryptoI | null = null;
    selectedCardFilter: string = 'All';
    display: boolean = false;
    cards: CardI[] = [];


    constructor(
      private readonly dataService: GlobaldataService,
      private readonly homeSelectService: HomeSelectService,
      private readonly orderModalService: OrderModalService,
      private changeCurrencyService: ChangeCurrencyService
    ){
    }

    ngOnInit(): void {
      this.initCards();
      this.initCryptos();
      this.initChanged();
    }


    public filterCards(event: Event){
      const cur = event.target as HTMLInputElement;
      this.initCards()
      this.selectedCardFilter = cur.value;
      if(cur.value !== 'All'){
        this.cards = this.cards.filter((el: CardI) => el.valute === cur.value || el.type === cur.value)
      }
    }

    public setSelectedCrypto(newValue: CryptoI | null): void{
      this.homeSelectService.setSelectedCrypto(newValue)
    }

    public setSelectedChanged(newValue: ChangeI | CryptoI | null): void{
      this.homeSelectService.setSelectedChanged(newValue)
    }

    public openChangeDialog(){
      this.display = true;
    }

    private initCards(){
      this.cards = this.dataService.getCards()
    }

    private initCryptos(){
      this.changeCurrencyService
      .getCurrencies()
      .subscribe((res: ICurrency[]) => {
        this.cryptos = res.map((obj: ICurrency): CryptoI => 
        ({...obj, 'type': 'CRYPTO'}))
        .filter((obj: CryptoI) => (obj.symbol !== 'RUB'));
      })
    }

    private initChanged(){
      this.changed = this.dataService.getChanged()
    }
    

    

    public changeForm(): void{
      this.changeUserForm = !this.changeUserForm;
    }
    
    public showPromoField(): void{
      this.showPromoFieldCond = !this.showPromoFieldCond;
    }

    public resetForm(): void{
      this.changeUserForm = false;
    }

    public openOrderDialog(): void{
      this.orderModalService.eventFromHomePage.next('event');
    }

    
    
    
    

    
}
