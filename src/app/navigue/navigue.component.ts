import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import { Video } from '../models/video';
import { Interprete } from '../models/interprete';
import{ Subscription} from 'rxjs';

@Component({
  selector: 'app-navigue',
  templateUrl: './navigue.component.html',
  styleUrls: ['./navigue.component.scss']
})
export class NavigueComponent implements OnInit {

  videosTab:Video[]; // liste des vidéos affichées
  videosSubscription:Subscription;

  tousInterpreteTab:Interprete[];
  filtreInterprete:number[] = [];

  constructor(private videoService:VideoService) {
    this.tousInterpreteTab = this.videoService.tousInterpreteTab;
    for (let i = 0;i<3;i++){
      this.filtreInterprete[i]=0;
    }
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

    this.videoService.emitVideoSubject();
  }

  onSauvegarde(){
    this.videoService.saveBdd();
  }

  charge(){
    this.videoService.charge(this.filtreInterprete);
    this.videoService.emitVideoSubject();
  }

  onFiltreInterprete(interprete:Interprete){
    console.log("onInterprete "+interprete.id);
    let trouve:boolean = false;
    for (let i in this.filtreInterprete){
      if (this.filtreInterprete[i] === interprete.id){
        trouve=true;
        this.filtreInterprete.splice(parseInt(i),1);
        this.tousInterpreteTab[interprete.id].boutonActif = false;
      }
    }
    if (!trouve){
      this.filtreInterprete.push(interprete.id);
      this.tousInterpreteTab[interprete.id].boutonActif = true;
    }

    this.charge();
  }
  /*onInterprete(idInterprete:number){
    console.log("onInterprete "+idInterprete);
    let trouve:boolean = false;
    for (let i in this.filtreInterprete){
      if (this.filtreInterprete[i] === idInterprete){
        trouve=true;
        this.filtreInterprete.splice(parseInt(i),1);
      }
    }
    if (!trouve){
      this.filtreInterprete.push(idInterprete);
    }

    this.charge();
  }*/
}
