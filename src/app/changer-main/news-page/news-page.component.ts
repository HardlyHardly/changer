import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit{
  news: any[] = [];
  ngOnInit(){
    this.getNews();
  }

  private getNews(){
    axios('https://cosmochanger.cc/Home/News').then((res: any) => {
      const {data} = res;
      const $ = cheerio.load(data);

      let content = [];

      $('.type-card', data).each(() => {
        const title = $(this).find('div').hasClass('title');
      })
    })
  }
}
