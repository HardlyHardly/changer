import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ){}

  public logout(): void{
    this.authService
    this.router.navigate([''])
  }
}
