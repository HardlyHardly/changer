import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  checkIsAuthenticated: boolean = false;

  @Output() public openModalE: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private loginService: LoginService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    // this.authService.
    // $checkIsAunthenticated
    // .subscribe((bool: boolean) => {
    //   this.checkIsAuthenticated = bool
    //   console.log(bool)
    // });
    this.checkUserLogin();
  }

  public checkUserLogin(): void{
    console.log(this.authService.isAuthenticated());
    this.checkIsAuthenticated = this.authService.isAuthenticated()
  }



  public openModal(bool: boolean): void{
    this.loginService.openCustomModal(bool)
    this.openModalE.emit(bool);
  }

  public logout(){
    this.authService.logout();
    this.checkUserLogin();
  }




}
