import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/share/database.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit{

  constructor(
    private readonly dataBaseService: DatabaseService
  ){}

  ngOnInit(): void {
    this.dataBaseService
    .getOrders()
    .subscribe((res: any) => console.log(res))

    this.dataBaseService
    .getOrdersPromise()
    .then((res: any) => (res.json()))
    .then((res: any) => console.log(res))
    .catch((err) => console.log('promise error', err));
  }
}
