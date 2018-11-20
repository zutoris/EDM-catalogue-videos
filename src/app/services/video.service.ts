import { Injectable } from '@angular/core';
import { Video } from '../models/video';
import { Concert } from '../models/concert';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videosTab:Video[];
  private videosAfficheesTab:Video[];
  private concertsTab:Concert[]; // ensemble des dates de concert
  videosSubject = new Subject();
  concertSubject = new Subject();

  constructor(private httpClient:HttpClient) { 
    this.videosAfficheesTab = [];
    this.videosTab = [];

    let urlListeConcert = 'http://www.ecole-musique-sautron.fr/data/concerts-list.json';
  	this.httpClient
      .get<any>(urlListeConcert)
      .subscribe(
        (response) => {
          this.concertsTab = response;
          this.buildDatesList();
          this.concertSubject.next(this.concertsTab);
        },(error)=>{
          console.log('error in calling concerts-list.json : '+JSON.stringify(error));
        }
      );

    let url = 'http://www.ecole-musique-sautron.fr/data/video-list.json';
    //let heuredebut:Date=new Date();
  	this.httpClient
      .get<any>(url)
      .subscribe(
        (response) => {
          //let heureTelechargementFini:Date=new Date();
          //console.log(response);
          this.videosTab=response;
          //let heureTriFini:Date=new Date();
          if (this.concertsTab == undefined){
            console.log("Erreur : téléchargement des dates plus long que celui des vidéos.")
          }
          this.repartitVideosParConcert();
          this.charge(this.concertsTab[0]);
          this.emitVideoSubject();
          //console.log("nombre de vidéos importées : " + this.videosTab.length);
          //console.log("Durée téléchargement : "+(heureTelechargementFini.getTime()-heuredebut.getTime())+" ms");
          //console.log("Durée tri:"+(heureTriFini.getTime()-heureTelechargementFini.getTime()));
        },(error)=>{
          console.log('error in calling video-list.json : '+JSON.stringify(error));
        }
      );
  }

  emitVideoSubject(){
		this.videosSubject.next(this.videosAfficheesTab);
	}

  // Constitution de la liste des dates de concert
  buildDatesList(){
    let identifiant:number = 0;
    for (let c of this.concertsTab){
      c.id = identifiant++;
    }
  }

  charge(concertChoisi:Concert){
    this.videosAfficheesTab = concertChoisi.videos;
  }

  repartitVideosParConcert(){
    for (let concert of this.concertsTab){
      concert.videos = [];
    }
    let dernierConcert:Concert;
    for (let vid of this.videosTab){
      if (dernierConcert !== undefined && vid.date == dernierConcert.date){
        dernierConcert.videos.push(vid);
      }else{
        for (let concert of this.concertsTab){
          if (vid.date == concert.date){
            concert.videos.push(vid);
            dernierConcert = concert;
            break;
          }
        }
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
