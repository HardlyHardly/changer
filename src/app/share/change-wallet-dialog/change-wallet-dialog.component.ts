import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CryptoI } from 'src/app/interfaces/cryptoI';
import { ChangeCurrencyService } from 'src/app/services/change-currency.service';
import { ErrorConfigService } from 'src/app/services/error-config.service';

@Component({
  selector: 'app-change-wallet-dialog',
  templateUrl: './change-wallet-dialog.component.html',
  styleUrls: ['./change-wallet-dialog.component.scss']
})
export class ChangeWalletDialogComponent implements OnInit{

  public image: File | null = null;
  public imageURL: string = '';

  cryptoForm: FormGroup = new FormGroup({
    'symbol': new FormControl('', Validators.required),
    'name': new FormControl('', Validators.required),
    'price': new FormControl('', Validators.required),
    'wallet': new FormControl('', Validators.required)
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public crypto: CryptoI,
    private changeCurrencyService: ChangeCurrencyService,
    private errorConfigService: ErrorConfigService
  ){}

  ngOnInit(): void {
    if(this.isEditMode()){
      this.cryptoForm.patchValue(this.crypto)
    }
  }



  compliteForm(): void{
    if(this.isEditMode()){
      this.changeCurrencyService
      .updateCurrency({
        wallet: this.cryptoForm.value.wallet,
        id: this.crypto.id ? this.crypto.id : 0
      })
      .subscribe(() => {
        this.errorConfigService.errorConfig('Успешно обновлен')
      })
    } else {
      this.changeCurrencyService
      .createCurrency({
        symbol: this.cryptoForm.value.symbol,
        name: this.cryptoForm.value.name,
        price: this.cryptoForm.value.price,
        wallet: this.cryptoForm.value.wallet,
        image: this.imageURL.split(';')[1]
      })
      .subscribe(() => {
        this.errorConfigService.errorConfig('Успешно создан')
      })
    }
    
  }

  onFileSelected(event: Event){
    const cur = event.target as HTMLInputElement;
    if(cur.files){
      this.image = cur.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
        console.log(this.imageURL.split(';')[1])
      }
      reader.readAsDataURL(this.image)
    }
  }

  public isEditMode(): boolean{
    return !!this.crypto;
  }
}
