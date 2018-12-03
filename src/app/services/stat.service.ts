import { Injectable } from '@angular/core';
import { Video } from '../models/video';
import { Stat } from '../models/stat';
import { AppSettings } from '../appSettings';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private httpClient:HttpClient) { 
  }

  enregistreStat(videoRegardee:Video){
    let heureDebut:Date = new Date();
    this.httpClient
	    .get<Stat[]>("https://" + AppSettings.FIREBASE_ENDPOINT + ".firebaseio.com/statistiques.json")
	    .subscribe(
	      (response) => {
          let stats:Stat[];
          stats = response;
          console.log("Lecture stat faite.");
          
          if (stats == undefined){
            stats = [];
          }
          let trouve:boolean = false;
          let indiceTab:number;
          for (var i=0;i<stats.length && !trouve;i++){
            if (stats[i].idVideo === videoRegardee.id){
              trouve = true;
              indiceTab = i;
            }
          }

          if (trouve){
            console.log("Stat déjà existante pour cette vidéo ("+stats[indiceTab].nombreVues+" vues).");
            stats[indiceTab].nombreVues++;
            stats[indiceTab].dernierAcces = Date.now();
          } else {
            console.log("Nouvelle stat créée.");
            let newStat = new Stat(videoRegardee.id, 1, Date.now());
            stats.push(newStat);
          }

          this.httpClient
            .put("https://" + AppSettings.FIREBASE_ENDPOINT + ".firebaseio.com/statistiques.json",
            stats)
            .subscribe(
              () => {
                let heureFin:Date = new Date();
                console.log("stats enregistrées - " +(heureFin.getTime()-heureDebut.getTime())+" ms");
              },(error)=>{
                this.handleError(error);
                console.log('error en stockant les stats : '+JSON.stringify(error));
              }
            );

        },(error)=>{
          this.handleError(error);
	        console.log('error en lisant la stat'+JSON.stringify(error));
	      }
	    );
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
  }
}
