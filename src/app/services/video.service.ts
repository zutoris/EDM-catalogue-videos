import { Injectable } from '@angular/core';
import { Video } from '../models/video';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videosTab:Video[];
  private videosAfficheesTab:Video[];
  datesTab = []; // ensemble des dates de concert
  videosSubject = new Subject();
  dateSubject = new Subject();
  aucuneDate:string = "(aucune)";

  constructor(private httpClient:HttpClient) { 
    this.videosAfficheesTab = [];
    this.videosTab = [];

    let url = 'http://www.ecole-musique-sautron.fr/data/video-list.json';
    //let heuredebut:Date=new Date();
  	this.httpClient
      .get<any>(url)
      .subscribe(
        (response) => {
          //let heureTelechargementFini:Date=new Date();
          //console.log(response);
          this.videosTab=response;
          this.buildDatesList();
          //let heureTriFini:Date=new Date();
          this.dateSubject.next(this.datesTab[0]);
          this.charge(this.datesTab[0]);
          this.emitVideoSubject();

          //console.log("nombre de vidéos importées : " + this.videosTab.length);
          //console.log("Durée téléchargement : "+(heureTelechargementFini.getTime()-heuredebut.getTime())+" ms");
          //console.log("Durée tri:"+(heureTriFini.getTime()-heureTelechargementFini.getTime()));
        },(error)=>{
          console.log('error in calling get : '+JSON.stringify(error));
        }
      );
  }

  emitVideoSubject(){
		this.videosSubject.next(this.videosAfficheesTab);
	}

  // Constitution de la liste des dates de concert
  buildDatesList(){
    // recessement des dates
    let intermediateTab = [];
    for (let v of this.videosTab){
      let trouve:boolean = false;
      for (let d of intermediateTab){
        if (d.dateValue === v.date){
          trouve = true;
          break;
        }
      }
      if (!trouve){
        // écriture des dates sous forme 'aaaammjj' pour faciliter la comparaison
        let dateNumerique:number = parseInt(v.date.substring(6, 10) + v.date.substring(3, 5) + v.date.substring(0, 2));
        intermediateTab.push({dateValue:v.date, numericValue:dateNumerique});
      }
    }

    // tri des dates dans l'ordre décroissant
    let nombreDates:number = intermediateTab.length;
    for (let i:number = 0; i < nombreDates; i++){
      let maxDate:number = undefined;
      let indexMax:number = undefined;
      for (let j:number = 0; j < nombreDates; j++){
        let elementDateJ = intermediateTab[j];
        if (elementDateJ != undefined && (maxDate == undefined || maxDate < elementDateJ.numericValue)){
          maxDate = elementDateJ.numericValue;
          indexMax = j;
        }
      }  
      this.datesTab.push(intermediateTab[indexMax].dateValue);
      intermediateTab[indexMax] = undefined;
    }
  }

  charge(filtreDate:string){
    this.videosAfficheesTab = [];

    //si pas de filtre sur l'interprète ou l'instrument, alors on part de videosTab, pour affichage également les vidéos n'ayant pas de 'LienInterpreteVideo'.
    for (let vid of this.videosTab){
      if (filtreDate === this.aucuneDate
        || filtreDate === vid.date){
        this.videosAfficheesTab.push(vid);
      }
    }    
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    //return throwError(      'Something bad happened; please try again later.');
  };
}
