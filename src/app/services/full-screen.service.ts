import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullScreenService {

  fullScreenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  $toggleFullScreen: Observable<boolean> = this.fullScreenSubject.asObservable();

  constructor(

  ) { }
}
