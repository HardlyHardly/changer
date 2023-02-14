import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Output() public openModalE: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    this.checkUserLogin();
  }

  public checkUserLogin(): boolean{
    return this.loginService.isLoggin()
  }

  public openModal(bool: boolean): void{
    this.loginService.openOrCloseModal();
    this.openModalE.emit(bool);
  }
}
