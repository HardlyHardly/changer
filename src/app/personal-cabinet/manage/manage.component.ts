import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { orderDataResponseI } from 'src/app/interfaces/orderDataResponseI';
import { UserResponseI } from 'src/app/interfaces/userRessponseI';
import { AuthService } from 'src/app/services/auth.service';
import { ChangePasswordService } from 'src/app/services/change-password.service';
import { DatabaseService } from 'src/app/share/database.service';
import { GlobalWindowService, ICustomWindow } from 'src/app/share/global-window.service';
import { OrderModalComponent } from 'src/app/share/order-modal/order-modal.component';

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
    private readonly windowRef: GlobalWindowService,
    private authService: AuthService,
    private dialog: MatDialog,
    private changePasswordService:  ChangePasswordService
  ){
    this._window = this.windowRef.nativeWindow;
  }

  ngOnInit(): void {
    if((JSON.parse(localStorage.getItem('user') as any)).role === 'admin'){
      this.dataBaseService
      .getOrdersForAdmin()
      .pipe(
        catchError((error) => {
          if(error.status === 401){
            console.log('error orders')
            this.authService
            .refreshToken()
            .subscribe((data: UserResponseI) => {
              const {accessToken, refreshToken} = data.tokens;
              localStorage.setItem('access_token', accessToken);
            })
          }
          return throwError(error)
        })
      )
      .subscribe((ordersData: orderDataResponseI[]) => {
          this.ordersData = this.changeTime(ordersData);
      })
    } else {
        this.dataBaseService
        .getOrdersForUser()
        .subscribe((ordersData: orderDataResponseI[]) => {
          this.ordersData = this.changeTime(ordersData);
        });
   
    }
  }

  private changeTime(arr: orderDataResponseI[]): orderDataResponseI[]{
    const newArr = [...arr];
    return newArr.map((el: orderDataResponseI) =>
    ({...el, createdAt: el.createdAt.split('T')[0].split('-').reverse().join('.')})
    )
  }

  public isAdmin(): boolean{
    return this.authService.getUser()?.role === 'admin' ? true : false;
  }
  
  public createOrder(): void{
    this.dialog.open(OrderModalComponent, {
      data: this.changePasswordService.checkEmail()
    })
  }
}
