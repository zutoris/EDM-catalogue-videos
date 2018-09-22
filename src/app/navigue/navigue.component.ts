import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigue',
  templateUrl: './navigue.component.html',
  styleUrls: ['./navigue.component.scss']
})
export class NavigueComponent implements OnInit {

  videosTab:any[];

  constructor() { }

  ngOnInit() {
    this.videosTab=[];
    let video1={"titre":"Tata Yoyo","compositeur":"Annie Cordie"};
    let video2={"titre":"Mexico","compositeur":"?"};
    this.videosTab.push(video1);
    this.videosTab.push(video2);
  }

}
