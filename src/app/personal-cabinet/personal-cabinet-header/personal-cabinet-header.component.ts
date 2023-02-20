import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-personal-cabinet-header',
  templateUrl: './personal-cabinet-header.component.html',
  styleUrls: ['./personal-cabinet-header.component.scss']
})
export class PersonalCabinetHeaderComponent implements OnInit{
  constructor(
    private authService: AuthService
  ){}

  ngOnInit(): void {
    
  }

  public getUser(): IUser | null{
    return this.authService.getUser();
  }
}
