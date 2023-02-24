import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { FullScreenService } from 'src/app/services/full-screen.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy{
  resizeObservable$: Observable<Event> = fromEvent(window, 'resize');
  resizeSubscription$: Subscription = this.resizeObservable$.subscribe()




  toggleFullScreen: boolean = false;

  constructor(
    private fullScreenService: FullScreenService
  ){}

  ngOnInit(): void {
    this.fullScreenService
    .$toggleFullScreen
    .subscribe((bool: boolean) => {
      this.toggleFullScreen = bool;
    })
    this.resizeObservable$.subscribe((event: Event) => {
      const cur = event.currentTarget as any;
      if(cur.innerWidth >= 1025){
        this.fullScreenService.fullScreenSubject.next(false);
      }
    })

  }


  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe()
  }



}
