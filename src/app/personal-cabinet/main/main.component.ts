import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  currentRoute: string = '';

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    // this.router
    // .events
    // .pipe(
    //   filter((event) => event instanceof NavigationEnd)
    // )
    // .subscribe((event: any) => {
    //   console.log(event.url)
    // })
  }
}
