import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import { StatService } from '../services/stat.service';
import { Video } from '../models/video';
import { Subscription} from 'rxjs';
import { Concert } from '../models/Concert';

@Component({
  selector: 'app-navigue',
  templateUrl: './navigue.component.html',
  styleUrls: ['./navigue.component.scss']
})
export class NavigueComponent implements OnInit {

  videosTab:Video[]; // liste des vidéos affichées
  videosSubscription:Subscription;
  dateSubscription:Subscription;

  concertsTab:Concert[]; // ensemble des concerts
  filtreConcert:Concert; // date sélectionnée
  videoSelectionnee:Video;

  constructor(private videoService:VideoService, private statService:StatService) {
  }

  ngOnInit() {
    this.dateSubscription = 
        this.videoService.concertSubject.subscribe(
          (d: any)=>{
            this.concertsTab = d;
            if (this.concertsTab !== undefined){
              this.filtreConcert = this.concertsTab[0];
            }
          }
        );

    this.videosSubscription = 
      this.videoService.videosSubject.subscribe(
        (v: any)=>{
          this.videosTab = v;
        }
      );
  }

  charge(){
    this.videoService.charge(this.filtreConcert);
    this.videoService.emitVideoSubject();
  }

  onFiltreDate(conc:Concert){
    console.log("onFiltreDate "+conc.date);
    this.filtreConcert = conc;
    this.charge();
  }

  onRegardeVideo(video:Video){
    this.videoSelectionnee = video;
    this.statService.enregistreStat(video);
  }
}
