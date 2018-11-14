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

  videosTab:Video[]; // liste des vidéos affichées
  videosSubscription:Subscription;

  datesTab:string[]; // ensemble des dates
  filtreDate:string; // date sélectionnée
  videoSelectionnee:Video;

  constructor(private videoService:VideoService) {
    this.datesTab = this.videoService.datesTab;
  }

  ngOnInit() {
    //this.videoService.loadBdd();
    //this.videosTab=this.videoService.videosTab;
    this.videosSubscription = 
      this.videoService.videosSubject.subscribe(
        (v: any)=>{
          this.videosTab = v;
        }
        );

    // initialisation avec la première date du tableau
    this.filtreDate = this.videoService.datesTab[0];
    this.charge();
  }

  onSauvegarde(){
    this.videoService.saveBdd();
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
