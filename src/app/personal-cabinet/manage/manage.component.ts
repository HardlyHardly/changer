import { Component, OnInit } from '@angular/core';
import { orderDataResponseI } from 'src/app/interfaces/orderDataResponseI';
import { DatabaseService } from 'src/app/share/database.service';
import { GlobalWindowService, ICustomWindow } from 'src/app/share/global-window.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit{

  private _window: ICustomWindow;

  public ordersData: orderDataResponseI[] = [];

  


  constructor(
    private readonly dataBaseService: DatabaseService,
    private readonly windowRef: GlobalWindowService
  ){
    this._window = this.windowRef.nativeWindow;
  }

  ngOnInit(): void {
    this.dataBaseService
    .getOrders()
    .subscribe((ordersData: orderDataResponseI[]) => {
      console.log(ordersData);
      this.ordersData = ordersData;
      this.ordersData = this.ordersData
      .map((el: orderDataResponseI) =>
      ({...el, createdAt: el.createdAt.split('T')[0].split('-').reverse().join('.')})
      )
    });
  }
}
