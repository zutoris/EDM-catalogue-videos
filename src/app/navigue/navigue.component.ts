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
  datesTab:string[]; // ensemble des dates
  filtreInterprete:Interprete = new Interprete(-1, "(aucun)"); // interprète sélectionné
  filtreInstrument:Instrument = new Instrument(-1, "(aucun)"); // instrument sélectionné
  filtreDate:string; // date sélectionnée
  videoSelectionnee:Video;

  constructor(private videoService:VideoService) {
    this.tousInterpreteTab = this.videoService.tousInterpreteTab;
    this.instrumentsTab = this.videoService.instrumentsTab;
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
    this.videoService.charge(this.filtreInterprete, this.filtreInstrument, this.filtreDate);
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
