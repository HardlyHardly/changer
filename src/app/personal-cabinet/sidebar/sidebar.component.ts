import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccessService } from 'src/app/share/user-access.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(
    private readonly userAccessService: UserAccessService,
    private readonly router: Router
  ){}

  public logout(): void{
    this.userAccessService.setAccessToken('');
    this.router.navigate([''])
  }
}
