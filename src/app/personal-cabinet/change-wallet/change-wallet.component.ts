import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { CryptoI } from 'src/app/interfaces/cryptoI';
import { ICurrency } from 'src/app/interfaces/ICurrency';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ChangeWalletDialogComponent } from 'src/app/share/change-wallet-dialog/change-wallet-dialog.component';
import { ChangeCurrencyService } from 'src/app/services/change-currency.service';
import { ErrorConfigService } from 'src/app/services/error-config.service';



@Component({
  selector: 'app-change-wallet',
  templateUrl: './change-wallet.component.html',
  styleUrls: ['./change-wallet.component.scss']
})
export class ChangeWalletComponent implements OnInit, AfterViewInit{

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) 
  sort!: MatSort;


  cryptos: CryptoI[] = [];

  ngOnInit(): void {
    this.cryptosInit();
  }

  private cryptosInit(){
    this.changeCurrencyService.getCurrencies().subscribe((cryptos: ICurrency[]) => {
      console.log(cryptos)
      this.cryptos = cryptos.map((obj: ICurrency):
      CryptoI => ({...obj, 'image': obj.image, type: 'CRYPTO', 'price': obj.price, 'wallet': obj.wallet, 'id': obj.id}));
      this.cryptos = this.cryptos.sort((a: any,b: any) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
        this.dataSource.data = this.cryptos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }





  displayedColumns: string[] = ['todo', 'id', 'symbol', 'name', 'price', 'wallet', 'image'];
  dataSource: MatTableDataSource<CryptoI> = new MatTableDataSource();

  

  constructor(
    private changeCurrencyService: ChangeCurrencyService,
    private dialog: MatDialog,
    private errorConfigService: ErrorConfigService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  edit(crypto: CryptoI): void{
    const dialogRef = this.dialog.open(ChangeWalletDialogComponent, {
      data: crypto
    });

    dialogRef
    .afterClosed()
    .subscribe(() => this.cryptosInit());
  }

  create(): void{
    const dialogRef = this.dialog.open(ChangeWalletDialogComponent);

    dialogRef
    .afterClosed()
    .subscribe(() => this.cryptosInit())
  }

  delete(id: number): void{
    this.changeCurrencyService
    .deleteCurrency(id)
    .subscribe(() => 
    this.errorConfigService
    .errorConfig(`Продукт с id:${id} успешно удален`))
    this.cryptosInit();
  }

  
}

