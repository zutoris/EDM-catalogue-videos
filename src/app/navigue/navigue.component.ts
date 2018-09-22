import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import { Video } from '../models/video';

@Component({
  selector: 'app-navigue',
  templateUrl: './navigue.component.html',
  styleUrls: ['./navigue.component.scss']
})
export class NavigueComponent implements OnInit {

  videosTab:Video[];

  constructor(private videoService:VideoService) { }

  ngOnInit() {
    this.videosTab=[];
    let video1 = new Video("1","Tata Yoyo","", "Annie Cordie");
    let video2 = new Video("2","Mexico","", "?");
    this.videosTab.push(video1);
    this.videosTab.push(video2);
  }

}
