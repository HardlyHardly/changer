import { CardI } from './../../interfaces/cardI';
import { Component, OnInit } from '@angular/core';
import { ChangeI } from 'src/app/interfaces/changeI';
import { CryptoI } from 'src/app/interfaces/cryptoI';
import { GlobaldataService } from 'src/app/share/globaldata.service';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit{

  public styleConditionForDrops: string = 'width: 100%; border-radius: 3px 0 0 3px';
    
  
    changed: ChangeI[] = [];
    cryptos: CryptoI[] = [];
    selectedCrypto: CryptoI | null = null;
    selectedChanged: ChangeI | CryptoI | null = null;
    selectedCardFilter: string = 'All';
    display: boolean = false;
    cards: CardI[] = [];


    constructor(
      private readonly dataService: GlobaldataService
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


    
}
