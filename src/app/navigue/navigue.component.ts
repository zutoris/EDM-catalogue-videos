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
  instrumentsTab:Instrument[]; // ensemble des instruments

  tousInterpreteTab:Interprete[]; // ensemble des interprètes
  filtreInterprete:Interprete = new Interprete(-1, "(aucun)"); // interprète sélectionné
  filtreInstrument:Instrument = new Instrument(-1, "(aucun)"); // instrument sélectionné

  constructor(private videoService:VideoService) {
    this.tousInterpreteTab = this.videoService.tousInterpreteTab;
    this.instrumentsTab = this.videoService.instrumentsTab;
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
    this.videoService.charge(this.filtreInterprete, this.filtreInstrument);
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
    this.filtreInstrument = instrument;
    this.charge();
  }
  onEffaceFiltreInstrument(){
    this.filtreInstrument =  new Instrument(-1, "(aucun)");
    this.charge();
  }

}
