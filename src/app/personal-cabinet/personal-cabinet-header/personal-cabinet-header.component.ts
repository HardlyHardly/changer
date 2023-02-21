import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/IUser';
import { AuthService } from 'src/app/services/auth.service';
import { FullScreenService } from 'src/app/services/full-screen.service';

@Component({
  selector: 'app-personal-cabinet-header',
  templateUrl: './personal-cabinet-header.component.html',
  styleUrls: ['./personal-cabinet-header.component.scss']
})
export class PersonalCabinetHeaderComponent implements OnInit{



  fullScreen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private fullScreenService: FullScreenService
  ){}

  ngOnInit(): void {
    
  }

  public getUser(): IUser | null{
    return this.authService.getUser();
  }

  public redirectOnMainPage(): void{
    this.dialog.closeAll();
    this.router.navigate([''])
  }

  public toggleFullScreen(): void{
    this.fullScreen = !this.fullScreen;
    this.fullScreenService.fullScreenSubject.next(this.fullScreen);
  }
}
