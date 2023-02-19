import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Output() public openModalE: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private loginService: LoginService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.checkUserLogin();
  }

  public checkUserLogin(): boolean{

    return this.authService.checkIsAuthenticated;
  }

  public openModal(bool: boolean): void{
    this.loginService.openCustomModal(bool)
    this.openModalE.emit(bool);
  }

  public logout(){
    this.authService.logout();
  }




}
