import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import { Video } from '../models/video';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-navigue',
  templateUrl: './navigue.component.html',
  styleUrls: ['./navigue.component.scss']
})
export class NavigueComponent implements OnInit {

  videosTab:Video[]; // liste des vidéos affichées
  videosSubscription:Subscription;
  dateSubscription:Subscription;

  datesTab:string[]; // ensemble des dates
  filtreDate:string; // date sélectionnée
  videoSelectionnee:Video;

  constructor(private videoService:VideoService) {
    this.datesTab = this.videoService.datesTab;
  }

  ngOnInit() {
    this.videosSubscription = 
      this.videoService.videosSubject.subscribe(
        (v: any)=>{
          this.videosTab = v;
        }
      );

    this.dateSubscription = 
        this.videoService.dateSubject.subscribe(
          (d: any)=>{
            this.filtreDate = d;
          }
        );
  }

  charge(){
    this.videoService.charge(this.filtreDate);
    this.videoService.emitVideoSubject();
  }

  onFiltreDate(dateC:string){
    console.log("onFiltreDate "+dateC);
    this.filtreDate = dateC;
    this.charge();
  }
  onEffaceFiltreDate(){
    this.filtreDate = this.videoService.aucuneDate;
    this.charge();
  }

  onRegardeVideo(video:Video){
    this.videoSelectionnee = video;
  }
}
