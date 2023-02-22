import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FullScreenService } from 'src/app/services/full-screen.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  toggleFullScreen: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private fullScreenService: FullScreenService
  ){}

  ngOnInit(): void {
    this.fullScreenService
    .$toggleFullScreen
    .subscribe((bool: boolean) => {
      this.toggleFullScreen = bool;
    })
  }

  public logout(): void{
    this.authService.logout();
    this.router.navigate([''])
  }

  public isAdmin(): boolean{
    return this.authService.getUser()?.role === 'admin' ? true : false;
  }
}
