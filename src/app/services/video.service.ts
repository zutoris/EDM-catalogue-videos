import { Injectable } from '@angular/core';
import { Video } from '../models/video';
import { Mediateque } from '../models/mediateque';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videosTab:Video[];
  private mediateque:Mediateque;
  videosSubject = new Subject();

  constructor(private httpClient:HttpClient) { 
    this.videosTab = [];
    
    this.videosTab.push(new Video(1,'data/2018/02-heure-musicale/01-clarinettes.mp4','First Jazzy Piec','43147','Michel Pellegrino'));
    this.videosTab.push(new Video(2,'data/2018/02-heure-musicale/02-piano-Caroline.mp4','Le Petit Pouce','43147','S. Gubaidulina'));
    this.videosTab.push(new Video(3,'data/2018/02-heure-musicale/03-guitare-William.mp4','Fanny Du','43147','R. Helinka'));
    this.videosTab.push(new Video(4,'data/2018/02-heure-musicale/04-trompette-piano-batterie-basse.mp4','Jody Grind','43147','Horace Silver'));
    this.videosTab.push(new Video(5,'data/2018/02-heure-musicale/05-violoncelle-piano.mp4','allegro de la 5è Sonate','43147','Vivaldi'));
    this.videosTab.push(new Video(6,'data/2018/02-heure-musicale/06-violon-Mathilde.mp4','','43147',''));
    this.videosTab.push(new Video(7,'data/2018/02-heure-musicale/07-chant-Louise.mp4','Carme','43147','Stromae'));
    this.videosTab.push(new Video(8,'data/2018/02-heure-musicale/08-chant-Charlene.mp4','Stay','43147','Rihanna'));
    this.videosTab.push(new Video(9,'data/2018/02-heure-musicale/09-guitare-Raphael-Eric.mp4','Cueca','43147','trad. bolivien'));
    this.videosTab.push(new Video(10,'data/2018/02-heure-musicale/10-guitare-Raphael.mp4','Romance','43147','Fernando Sor'));
    this.videosTab.push(new Video(11,'data/2018/02-heure-musicale/11-guitare-Eric.mp4','Un dia de novembre','43147','Léo Brouwer'));
    this.videosTab.push(new Video(12,'data/2018/02-heure-musicale/13-Turning-Band-Winehouse.mp4','Back to Black','43147','Amy Winehouse'));
    this.videosTab.push(new Video(13,'data/2018/02-heure-musicale/15-Turning-Band-Shaka-Ponk.mp4','I\'m Picky','43147','Shaka Ponk'));
    this.videosTab.push(new Video(14,'data/2018/04-fete-ecole/01-guitares-Monkey_Blues.MP4','Monkey Blues','43197','Thierry Tisserand'));
    this.videosTab.push(new Video(15,'data/2018/04-fete-ecole/02-guitares-Black_Bird.MP4','Black Bird','43197','The Beatles'));
    this.videosTab.push(new Video(16,'data/2018/04-fete-ecole/03-jazz-Deeply_Bluesy.MP4','Deeply Bluesy','43197','M Pellegrino, Alain Pasqiuer'));
    this.videosTab.push(new Video(17,'data/2018/04-fete-ecole/04-jazz-Freylach.MP4','Freylach','43197','traditionnel, arrangement Alain Pasquier'));
    this.videosTab.push(new Video(18,'data/2018/04-fete-ecole/05-Leforestier.MP4','La petite Fugue','43197','Maxime Le Forestier'));
    this.videosTab.push(new Video(19,'data/2018/04-fete-ecole/06-eveil-Sylvestre.MP4','Les Yeux fermés','43197','Anne Sylvestre'));
    this.videosTab.push(new Video(20,'data/2018/04-fete-ecole/07-eveil-Ferrari.MP4','Les Couleurs de la Vie','43197','Christian Ferrari'));
    /*this.videosTab.push(new Video(21,'data/2018/04-fete-ecole/08-saxophone-Couleur_Cafe.MP4','Couleur Café','43197','Serge Gainsbourg'));
    this.videosTab.push(new Video(22,'data/2018/04-fete-ecole/09-saxophone-Blue_Moon.MP4','Blue Moon','43197',''));
    this.videosTab.push(new Video(23,'data/2018/04-fete-ecole/10-ensemble-enfants.MP4','Les Yeux noirs','43197',''));
    this.videosTab.push(new Video(24,'data/2018/04-fete-ecole/11-violons-Tetris.MP4','Korobeïnki (tetris)','43197','traditionnel russe'));
    this.videosTab.push(new Video(25,'data/2018/04-fete-ecole/12-violons-Colors_Dance.mp4','Color\'s Dance','43197','Patt Leg'));
    this.videosTab.push(new Video(26,'data/2018/04-fete-ecole/13-Sol_y_Luna.MP4','Luna y Sol','43197','Patrick Guillem'));
    this.videosTab.push(new Video(27,'data/2018/04-fete-ecole/14-Ray_Charles.MP4','What I’d Say','43197','Ray Charles'));
    this.videosTab.push(new Video(28,'data/2018/04-fete-ecole/15-Turning_Band-Back_to_Black.MP4','Back to black','43197','Amy Winehouse'));
    this.videosTab.push(new Video(29,'data/2018/04-fete-ecole/16-Turning_Band-Im_Picky.MP4','I\'m Picky','43197','Shaka Ponk'));
    this.videosTab.push(new Video(30,'data/2018/04-fete-ecole/17-Mercredis_Orchestra-Panthere_Rose.MP4','La Panthère Rose','43197','Henri Mancini'));
    this.videosTab.push(new Video(31,'data/2018/04-fete-ecole/18-batterie-fantomes.MP4','composition sur le thème de la nuit (les fantômes)','43197',''));
    this.videosTab.push(new Video(32,'data/2018/04-fete-ecole/19-chorale_ado-Amstrong.MP4','Amstrong','43197','Claude Nougaro'));
    this.videosTab.push(new Video(33,'data/2018/04-fete-ecole/20-chorale_ado-Zaz.MP4','','43197','Zaz'));
    this.videosTab.push(new Video(34,'data/2018/04-fete-ecole/21-Black_Keys.MP4','Tighten up','43197','Black Keys'));
    this.videosTab.push(new Video(35,'data/2018/04-fete-ecole/22-The_Police.MP4','Regatta de Blanc','43197','The Police'));
    this.videosTab.push(new Video(36,'data/2018/04-fete-ecole/23-Biguine_Blues.MP4','Biguine Blues','43197','JC Hoareau'));
    this.videosTab.push(new Video(37,'data/2018/04-fete-ecole/24-Green_Onins.MP4','Green Onions','43197','Booker T & the MG’s'));
    this.videosTab.push(new Video(38,'data/2018/04-fete-ecole/25-Black_Magic_Woman.MP4','Black Magic Woman','43197','Peter Green, Carlos Santana'));
    this.videosTab.push(new Video(39,'data/2018/04-fete-ecole/26-Money_for_nothing.MP4','Money for nothing','43197','Dire Straits'));
    this.videosTab.push(new Video(40,'data/2018/04-fete-ecole/27-Money.MP4','Money','43197','Pink Floyd'));
    this.videosTab.push(new Video(41,'data/2018/04-fete-ecole/28-The_man_who_sold_the_world.MP4','The man who sold the world','43197','David Bowie'));
    this.videosTab.push(new Video(42,'data/2018/04-fete-ecole/29-chorale-Lily.MP4','Lily','43197','Pierre Perret'));
    this.videosTab.push(new Video(43,'data/2018/04-fete-ecole/30-chorale-Piaf.MP4','Sous le ciel de Paris','43197','Piaf'));
    this.videosTab.push(new Video(44,'data/2018/04-fete-ecole/31-Colore-Les_Innocents.mp4','Colore','43197','Les Innocents'));
    this.videosTab.push(new Video(45,'data/2018/06-fete-musique/01-chorale-ado.MP4','','43272',''));
    this.videosTab.push(new Video(46,'data/2018/06-fete-musique/02-chorale-ado.MP4','','43272',''));
    this.videosTab.push(new Video(47,'data/2018/06-fete-musique/03-Mercredys_Orchestra-Pantere_Rose.MP4','La Panthère Rose','43272','Henri Mancini'));
    this.videosTab.push(new Video(48,'data/2018/06-fete-musique/04-orchestre-Another_Star-Stevie_Wonder.MP4','Another Star','43272','Stevie Wonder'));
    this.videosTab.push(new Video(49,'data/2018/06-fete-musique/05-chorale_adulte-Monsieur_attendait.MP4','Monsieur attendait','43272',''));
    this.videosTab.push(new Video(50,'data/2018/06-fete-musique/06-chorale_adulte-Piaf-Sous_le_ciel_de_Paris.MP4','Sous le ciel de Paris','43272','Edith Piaf'));
    this.videosTab.push(new Video(51,'data/2018/06-fete-musique/07-Turning_Band-Amy_Winehouse-Back_to_black.MP4','Back to black','43272','Amy Winehouse'));
    this.videosTab.push(new Video(52,'data/2018/06-fete-musique/09-Turning_Band-Shaka_Ponk-Picky.MP4','I\'m Picky','43272','Shaka Ponk'));
    this.videosTab.push(new Video(53,'data/2018/06-fete-musique/10-musiques_actuelles-Black_Magic_Woman.MP4','Black Magic Woman','43272','Peter Green, Carlos Santana'));
    this.videosTab.push(new Video(54,'data/2018/06-fete-musique/11-musiques_actuelles-Dire_Straits-Money_for_nothing.MP4','Money for nothing','43272','Dire Straits'));
    this.videosTab.push(new Video(55,'data/2018/06-fete-musique/12-musiques_actuelles-The_man_who_sold_the_world.MP4','The man who sold the world','43272','David Bowie'));
    this.videosTab.push(new Video(56,'data/2018/06-fete-musique/13-cornemuses.MP4','','43272',''));
    this.videosTab.push(new Video(57,'data/2018/06-musique-actuelle/01-piano-Arsene.MP4','','43276',''));
    this.videosTab.push(new Video(58,'data/2018/06-musique-actuelle/02-piano-Nathan.MP4','','43276',''));
    this.videosTab.push(new Video(59,'data/2018/06-musique-actuelle/03-piano-Gustave.MP4','','43276',''));
    this.videosTab.push(new Video(60,'data/2018/06-musique-actuelle/04-Purple-Augustin-Nathan-guitare-batterie.MP4','','43276',''));
    this.videosTab.push(new Video(61,'data/2018/06-musique-actuelle/05-blues-Augustin-Gaetan.MP4','','43276',''));
    this.videosTab.push(new Video(62,'data/2018/06-musique-actuelle/06-piano-Ines.MP4','','43276',''));
    this.videosTab.push(new Video(63,'data/2018/06-musique-actuelle/07-piano-Marie.MP4','','43276',''));
    this.videosTab.push(new Video(64,'data/2018/06-musique-actuelle/08-pianos-Prune-Carla.MP4','','43276',''));
    this.videosTab.push(new Video(65,'data/2018/06-musique-actuelle/09-impro-Raphael-Arthus-Gaetan.MP4','','43276',''));
    this.videosTab.push(new Video(66,'data/2018/06-musique-actuelle/10-piano-Emilien.MP4','','43276',''));
    this.videosTab.push(new Video(67,'data/2018/06-musique-actuelle/11-Camille-Noe.MP4','','43276',''));
    this.videosTab.push(new Video(68,'data/2018/06-musique-actuelle/12-chanteuse-contrebasse-piano-batterie.MP4','','43276',''));
    this.videosTab.push(new Video(69,'data/2018/06-musique-actuelle/13-batterie-Noe.MP4','','43276',''));
    this.videosTab.push(new Video(70,'data/2018/06-musique-actuelle/14-Aerosmith.MP4','','43276','Aerosmith'));
    this.videosTab.push(new Video(71,'data/2018/06-musique-actuelle/15-Queen.MOV','','43276','Queen'));
    this.videosTab.push(new Video(72,'data/2018/06-piano-classique/01-Guylaine.MP4','','43271',''));
    this.videosTab.push(new Video(73,'data/2018/06-piano-classique/02-Noham-menuet.MP4','menuet','43271',''));
    this.videosTab.push(new Video(74,'data/2018/06-piano-classique/03-Noham-Bal_musicien.MP4','','43271',''));
    this.videosTab.push(new Video(75,'data/2018/06-piano-classique/04-Astrid-L_Homme_qui_en_savait_trop.MP4','L\'Homme qui en savait trop','43271',''));
    this.videosTab.push(new Video(76,'data/2018/06-piano-classique/05-Sacha-Out_of_Africa.MP4','Out of Africa','43271',''));
    this.videosTab.push(new Video(77,'data/2018/06-piano-classique/06-Anais.MP4','','43271',''));
    this.videosTab.push(new Video(78,'data/2018/06-piano-classique/07-Nora-bouggy.MP4','bouggy','43271',''));
    this.videosTab.push(new Video(79,'data/2018/06-piano-classique/08-Chloe-Shubert.MP4','','43271','Schubert'));
    this.videosTab.push(new Video(80,'data/2018/06-presentation-instruments/01-clarinette.MP4','','43271',''));
    this.videosTab.push(new Video(81,'data/2018/06-presentation-instruments/02-cornet.MP4','','43271',''));
    this.videosTab.push(new Video(82,'data/2018/06-presentation-instruments/03-violoncelle.MP4','','43271',''));
    this.videosTab.push(new Video(83,'data/2018/06-presentation-instruments/05-cornemuse.MP4','','43271',''));
    this.videosTab.push(new Video(84,'data/2018/06-presentation-instruments/06-cornemuse2.MP4','','43271',''));
    this.videosTab.push(new Video(85,'data/2018/06-presentation-instruments/07-harpe.MP4','','43271',''));
    this.videosTab.push(new Video(86,'data/2018/06-presentation-instruments/08-flute.MP4','','43271',''));
    this.videosTab.push(new Video(87,'data/2018/06-presentation-instruments/09-accordeon-violon.MP4','','43271',''));
    this.videosTab.push(new Video(88,'data/2018/06-presentation-instruments/10-eveil-rythmes.MP4','','43271',''));
    this.videosTab.push(new Video(89,'data/2018/06-presentation-instruments/11-chansons-petits.MP4','','43271',''));
    this.videosTab.push(new Video(90,'data/2018/06-presentation-instruments/12-chorale-enfants.MP4','','43271',''));
    this.videosTab.push(new Video(91,'data/2018/06-presentation-instruments/13-chorale-enfants.MP4','','43271',''));
    this.videosTab.push(new Video(92,'data/2018/06-presentation-instruments/14-chorale-enfants.MP4','','43271',''));
    this.videosTab.push(new Video(93,'data/2018/06-presentation-instruments/15-piano-Maylis.MP4','','43271',''));
    this.videosTab.push(new Video(94,'data/2018/06-presentation-instruments/16-piano-Maylis.MP4','','43271',''));
    this.videosTab.push(new Video(95,'data/2018/06-presentation-instruments/17-piano-Lea.MP4','','43271',''));
    this.videosTab.push(new Video(96,'data/2018/06-presentation-instruments/18-harpe-Violette.MP4','','43271',''));
    this.videosTab.push(new Video(97,'data/2018/06-presentation-instruments/19-harpe-Romeo.MP4','','43271',''));
    this.videosTab.push(new Video(98,'data/2018/06-presentation-instruments/20-harpe-Ines.MP4','','43271',''));
    this.videosTab.push(new Video(99,'data/2018/06-presentation-instruments/21-piano-Antoine.MP4','','43271',''));
    this.videosTab.push(new Video(100,'data/2018/06-presentation-instruments/22-harpe-Trycia-Beethoven.MP4','','43271','Beethoven'));
    this.videosTab.push(new Video(101,'data/2018/06-presentation-instruments/23-harpe-Claire.MP4','','43271',''));
    this.videosTab.push(new Video(102,'data/2018/06-presentation-instruments/24-piano-jazz-basse-Matheo-Miles_Davis.MP4','','43271','Miles Davis'));
    this.videosTab.push(new Video(103,'data/2018/06-presentation-instruments/25-piano-jazz-basse-Matheo.MP4','','43271',''));
    this.videosTab.push(new Video(104,'data/2018/06-trompette-clarinette/01-trompette-Joseph.MP4','','43264',''));
    this.videosTab.push(new Video(105,'data/2018/06-trompette-clarinette/02-trompette-Alexis.MP4','','43264',''));
    this.videosTab.push(new Video(106,'data/2018/06-trompette-clarinette/03-clarinette-Emilie.MP4','','43264',''));
    this.videosTab.push(new Video(107,'data/2018/06-trompette-clarinette/04-trompette-Celian.MP4','','43264',''));
    this.videosTab.push(new Video(108,'data/2018/06-trompette-clarinette/05-trompette-Arthus.MP4','','43264',''));
    this.videosTab.push(new Video(109,'data/2018/06-trompette-clarinette/06-clarinette-Gwenaelle.MP4','','43264',''));
    this.videosTab.push(new Video(110,'data/2018/06-trompette-clarinette/07-trompette-Elie.MP4','','43264',''));
    this.videosTab.push(new Video(111,'data/2018/06-trompette-clarinette/08-clarinette-Clemence.MP4','','43264',''));
    this.videosTab.push(new Video(112,'data/2018/06-trompette-clarinette/09-trompette-Joseph-Elie.MP4','','43264',''));
    this.videosTab.push(new Video(113,'data/2018/06-trompette-clarinette/10-dechiffrage.MP4','','43264',''));
    this.videosTab.push(new Video(114,'data/2018/06-trompette-clarinette/11-duo-guitares.MP4','','43264',''));
    this.videosTab.push(new Video(115,'data/2018/06-trompette-clarinette/12-ensemble-FMBB.MP4','','43264',''));
    this.videosTab.push(new Video(116,'data/2018/06-violon-guitare/01-piano-Heidi.MP4','Le petit poney','43273',''));
    this.videosTab.push(new Video(117,'data/2018/06-violon-guitare/02-violon-Anaele.MP4','Les Cascades','43273','K et H Colledge'));
    this.videosTab.push(new Video(118,'data/2018/06-violon-guitare/03-violon-Lou-Eve.MP4','Water music','43273','G.F. Haendel'));
    this.videosTab.push(new Video(119,'data/2018/06-violon-guitare/04-accordeon-violon.MP4','Ode à la joie','43273','Beethoven'));
    this.videosTab.push(new Video(120,'data/2018/06-violon-guitare/05-violon-guitare.MP4','The blue bells of Scotland','43273',''));
    this.videosTab.push(new Video(121,'data/2018/06-violon-guitare/06-guitare-Khylian.MP4','Red river valley','43273',''));
    this.videosTab.push(new Video(122,'data/2018/06-violon-guitare/07-guitare-Khylian.MP4','Des ronds dans l’eau','43273','Th. Tisserand'));
    this.videosTab.push(new Video(123,'data/2018/06-violon-guitare/08-piano-Nolwenn.MP4','La chanson de Solveig','43273','Grieig'));
    this.videosTab.push(new Video(124,'data/2018/06-violon-guitare/09-ensemble-guitares.MP4','Menuet','43273','G.F. Haendel'));
    this.videosTab.push(new Video(125,'data/2018/06-violon-guitare/10-violon-guitare-piano.MP4','Quizas, quizas, quizas','43273','trad. cubain'));
    this.videosTab.push(new Video(126,'data/2018/06-violon-guitare/11-violon-guitare-Cielito_lindo.MP4','Cielito lindo','43273','trad. mexicain'));
    this.videosTab.push(new Video(127,'data/2018/06-violon-guitare/12-guitares-Samba_Lele.MP4','Samba Lele','43273','trad. brésilien'));
    this.videosTab.push(new Video(128,'data/2018/06-violon-guitare/13-violon-guitare-Mathilde.MP4','Senhora pastora','43273','trad. brésilien'));
    this.videosTab.push(new Video(129,'data/2018/06-violon-guitare/14-guitare-ElCondorPassa.MP4','El Condor Passa','43273',''));
    this.videosTab.push(new Video(130,'data/2018/06-violon-guitare/15-violon-guitare-Carnavelito.MP4','Carnavelito','43273','trad. péruvien'));
    this.videosTab.push(new Video(131,'data/2018/06-violon-guitare/16-violon-guitare-Kingston_Calypso.MP4','Kingston Calypso','43273',''));
    this.videosTab.push(new Video(132,'data/2018/06-violon-guitare/17-guitare-Eric-Raphael.MP4','','43273',''));
    this.videosTab.push(new Video(133,'data/2018/06-violon-guitare/18-violon-guitare-percussion-Cueca.MP4','Cueca','43273','trad. bolivien'));
    */
    this.mediateque = new Mediateque(this.videosTab);

    this.emitVideoSubject();

    //src="https://www.gstatic.com/firebasejs/5.5.1/firebase.js"
    // Initialize Firebase
  /*var config = {
    apiKey: "AIzaSyCd1fS942sqrNXfaCx8wCdPon0mTd9ZKQg",
    authDomain: "edm-videos.firebaseapp.com",
    databaseURL: "https://edm-videos.firebaseio.com",
    projectId: "edm-videos",
    storageBucket: "edm-videos.appspot.com",
    messagingSenderId: "630319060067"
  };
  firebase.initializeApp(config);*/
  }
  emitVideoSubject(){
		this.videosSubject.next(this.videosTab);
	}

  saveBdd(){
    this.httpClient
    .post("https://edm-videos.firebaseio.com/mediateque.json",
      this.mediateque)
    .subscribe(
      () => {
        console.log("médiatèque sauvegardée");
      },(error)=>{
        console.log('error lors de la sauvegarde de la médiatèque');
        this.handleError(error);
      }
    );
  }

  loadBdd(){
      this.httpClient
      .get<Video[]>("https://edm-videos.firebaseio.com/videos")
      .subscribe(
        (response) => {
          this.videosTab=response;
          this.emitVideoSubject();
          console.log(response);
        },(error)=>{
          console.log('error');
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
  };
}
