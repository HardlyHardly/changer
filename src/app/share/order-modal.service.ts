import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderModalService {

  eventFromHomePage: BehaviorSubject<string> = new BehaviorSubject<string>('');
  $eventFromHomePage: Observable<string> = this.eventFromHomePage.asObservable();

  $changeUserForm: Observable<boolean> = new Observable((suber) => (suber.next(this.changeUserForm)))

  private changeUserForm: boolean = false;

  constructor(
    
  ) { }

  public getChangeUserForm(): boolean{
    return this.changeUserForm
  }

  public setChangeUserForm(value: boolean): void{
    this.changeUserForm = value;
  }

  public resetChangeUserForm(): void{
    this.changeUserForm = false;
  }

  public showHideChangeUserForm(): void{
    this.changeUserForm = !this.changeUserForm;
  }








}
