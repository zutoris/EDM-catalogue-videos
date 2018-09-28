import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import { Video } from '../models/video';
import { Interprete } from '../models/interprete';
import { Instrument } from '../models/instrument';
import{ Subscription} from 'rxjs';

@Component({
  selector: 'app-navigue',
  templateUrl: './navigue.component.html',
  styleUrls: ['./navigue.component.scss']
})
export class NavigueComponent implements OnInit {

  videosTab:Video[]; // liste des vidéos affichées
  videosSubscription:Subscription;

  tousInterpreteTab:Interprete[]; // ensemble des interprètes
  filtreInterprete:Interprete = new Interprete(-1, "(aucun)"); // interprète sélectionné

  constructor(private videoService:VideoService) {
    this.tousInterpreteTab = this.videoService.tousInterpreteTab;
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
    this.filtreInterprete = interprete;
    this.charge();
  }
  onEffaceFiltreInterprete(){
    this.filtreInterprete =  new Interprete(-1, "(aucun)");
    this.charge();
  }

  onFiltreInstrument(instrument:Instrument){
    console.log("onFiltreInstrument "+instrument.id);
    //TODO
    this.charge();
  }

}
