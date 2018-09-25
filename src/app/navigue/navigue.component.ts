import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import { Video } from '../models/video';
import{ Subscription} from 'rxjs';

@Component({
  selector: 'app-navigue',
  templateUrl: './navigue.component.html',
  styleUrls: ['./navigue.component.scss']
})
export class NavigueComponent implements OnInit {

  videosTab:Video[];
  videosSubscription:Subscription;

  constructor(private videoService:VideoService) { }

  ngOnInit() {
    //this.videoService.loadBdd();
    //this.videosTab=this.videoService.videosTab;
    this.videosSubscription = 
      this.videoService.videosSubject.subscribe(
        (v: any)=>{
          this.videosTab = v;
        }
        );

    this.videoService.emitVideoSubject();
  }

  onSauvegarde(){
    this.videoService.saveBdd();
  }
}
