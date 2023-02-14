import { CardI } from './../../interfaces/cardI';
import { Component, OnInit } from '@angular/core';
import { ChangeI } from 'src/app/interfaces/changeI';
import { CryptoI } from 'src/app/interfaces/cryptoI';
import { GlobaldataService } from 'src/app/share/globaldata.service';
import { DatabaseService } from 'src/app/share/database.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserResponse } from 'src/app/interfaces/userRessponseI';



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

    public amountTo: number = 0;

    public amountFrom: number = 0;
    
  
    changed: ChangeI[] = [];
    cryptos: CryptoI[] = [];
    selectedCrypto: CryptoI | null = null;
    selectedChanged: ChangeI | CryptoI | null = null;
    selectedCardFilter: string = 'All';
    display: boolean = false;
    cards: CardI[] = [];


    constructor(
      private readonly dataService: GlobaldataService,
      private readonly dataBaseService: DatabaseService,
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

    public openChangeDialog(){
      this.display = true;
    }

    private initCards(){
      this.cards = this.dataService.getCards()
    }

    private initCryptos(){
      this.cryptos = this.dataService.getCryptos()
    }

    private initChanged(){
      this.changed = this.dataService.getChanged()
    }

    public setCalculatedDataFrom(): void{
      if(this.selectedCrypto && this.selectedChanged)
      this.setCalculatedData(this.selectedCrypto.index, this.selectedChanged.index, this.amountFrom)
      .subscribe((amonuntTo: number) => {
        this.amountTo = amonuntTo;
      })
    }

    public setCalculatedDataTo(): void{
      if(this.selectedCrypto && this.selectedChanged)
      this.setCalculatedData(this.selectedCrypto.index, this.selectedChanged.index, this.amountTo)
      .subscribe((amonuntFrom: number) => {
        this.amountFrom = amonuntFrom;
      })
    }
    

    private setCalculatedData(symbolFrom: string, symbolTo: string, amount: number): Observable<number>{
      return this.dataBaseService.
        changeCurrencies({
          symbolFrom,
          symbolTo,
          amount
        })
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
    

    public createOrder(): void{
      if(this.selectedCrypto && this.selectedChanged){
        this.dataBaseService
          .registerUserFromOrder({email: this.userEmail})
          .subscribe((body: UserResponse) => {

            console.log(body)
            const {accessToken} = body.tokens;
            if(this.selectedCrypto && this.selectedChanged){
              if(this.selectedChanged.type === 'BANK'){
                this.dataBaseService
                .createOrder({
                  symbolFrom: this.selectedCrypto?.index,
                  valueFrom: this.amountFrom,
                  symbolTo: this.selectedChanged?.index,
                  valueTo: this.amountTo,
                  card: this.userForm.value.card,
                  fio: this.userForm.value.fio,
                }, accessToken)
                .subscribe((res: null) => {
                  console.log(res);
                })
              }
              if(this.selectedChanged.type === 'CRYPTO'){
                this.dataBaseService
                .createOrder({
                  symbolFrom: this.selectedCrypto?.index,
                  valueFrom: this.amountFrom,
                  symbolTo: this.selectedChanged?.index,
                  valueTo: this.amountTo,
                  wallet: this.userForm.value.wallet
                }, accessToken)
                .subscribe((res: null) => {
                  console.log(res);
                })
              }
            }
          })
        
      }
    }

    
}
