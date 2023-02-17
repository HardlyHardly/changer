import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../login.service';
import { UserAccessService } from '../user-access.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Output() public openModalE: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private loginService: LoginService,
    private userAccessService: UserAccessService
  ){}

  ngOnInit(): void {
    this.checkUserLogin();
  }

  public checkUserLogin(): boolean{
    if(localStorage.getItem('accessToken') !== ''){
      return true
    } else {
      return false
    }
  }

  public openModal(bool: boolean): void{
    this.loginService.openCustomModal(bool)
    this.openModalE.emit(bool);
  }

  public logout(): void{
    this.userAccessService.setAccessToken(''),
    this.userAccessService.setRefreshToken('')
  }
}
