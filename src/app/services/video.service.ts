import { Injectable } from '@angular/core';
import { Video } from '../models/video';
import { Mediateque } from '../models/mediateque';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LienInterpreteVideo } from '../models/lienInterpreteVideo';
import { Interprete } from '../models/interprete';
import { Instrument } from '../models/instrument';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videosTab:Video[];
  private videosAfficheesTab:Video[];
  private lienInterpreteVideoTab:LienInterpreteVideo[];
  private mediateque:Mediateque;
  instrumentsTab:Instrument[] = [];
  datesTab = []; // ensemble des dates de concert
  tousInterpreteTab:Interprete[] = [];
  videosSubject = new Subject();
  aucuneDate:string = "(aucune)";

  constructor(private httpClient:HttpClient) { 
    this.videosAfficheesTab = [];
    this.videosTab = [];
    
    this.videosTab.push(new Video(1,'data/2018/02-heure-musicale/01-clarinettes.mp4','First Jazzy Piec','16/02/2018','Michel Pellegrino'));
    this.videosTab.push(new Video(2,'data/2018/02-heure-musicale/02-piano-Caroline.mp4','Le Petit Pouce','16/02/2018','S. Gubaidulina'));
    this.videosTab.push(new Video(3,'data/2018/02-heure-musicale/03-guitare-William.mp4','Fanny Du','16/02/2018','R. Helinka'));
    this.videosTab.push(new Video(4,'data/2018/02-heure-musicale/04-trompette-piano-batterie-basse.mp4','Jody Grind','16/02/2018','Horace Silver'));
    this.videosTab.push(new Video(5,'data/2018/02-heure-musicale/05-violoncelle-piano.mp4','allegro de la 5è Sonate','16/02/2018','Vivaldi'));
    let video6 = new Video(6,'data/2018/02-heure-musicale/06-violon-Mathilde.mp4','','16/02/2018','');
    this.videosTab.push(video6);
    this.videosTab.push(new Video(7,'data/2018/02-heure-musicale/07-chant-Louise.mp4','Carme','16/02/2018','Stromae'));
    this.videosTab.push(new Video(8,'data/2018/02-heure-musicale/08-chant-Charlene.mp4','Stay','16/02/2018','Rihanna'));
    let video9 = new Video(9,'data/2018/02-heure-musicale/09-guitare-Raphael-Eric.mp4','Cueca','16/02/2018','trad. bolivien');
    this.videosTab.push(video9);
    this.videosTab.push(new Video(10,'data/2018/02-heure-musicale/10-guitare-Raphael.mp4','Romance','16/02/2018','Fernando Sor'));
    let video11 = new Video(11,'data/2018/02-heure-musicale/11-guitare-Eric.mp4','Un dia de novembre','16/02/2018','Léo Brouwer');
    this.videosTab.push(video11);
    this.videosTab.push(new Video(12,'data/2018/02-heure-musicale/13-Turning-Band-Winehouse.mp4','Back to Black','16/02/2018','Amy Winehouse'));
    this.videosTab.push(new Video(13,'data/2018/02-heure-musicale/15-Turning-Band-Shaka-Ponk.mp4','I\'m Picky','16/02/2018','Shaka Ponk'));
    this.videosTab.push(new Video(14,'data/2018/04-fete-ecole/01-guitares-Monkey_Blues.MP4','Monkey Blues','07/04/2018','Thierry Tisserand'));
    this.videosTab.push(new Video(15,'data/2018/04-fete-ecole/02-guitares-Black_Bird.MP4','Black Bird','07/04/2018','The Beatles'));
    this.videosTab.push(new Video(16,'data/2018/04-fete-ecole/03-jazz-Deeply_Bluesy.MP4','Deeply Bluesy','07/04/2018','M Pellegrino, Alain Pasqiuer'));
    this.videosTab.push(new Video(17,'data/2018/04-fete-ecole/04-jazz-Freylach.MP4','Freylach','07/04/2018','traditionnel, arrangement Alain Pasquier'));
    this.videosTab.push(new Video(18,'data/2018/04-fete-ecole/05-Leforestier.MP4','La petite Fugue','07/04/2018','Maxime Le Forestier'));
    this.videosTab.push(new Video(19,'data/2018/04-fete-ecole/06-eveil-Sylvestre.MP4','Les Yeux fermés','07/04/2018','Anne Sylvestre'));
    this.videosTab.push(new Video(20,'data/2018/04-fete-ecole/07-eveil-Ferrari.MP4','Les Couleurs de la Vie','07/04/2018','Christian Ferrari'));
    this.videosTab.push(new Video(21,'data/2018/04-fete-ecole/08-saxophone-Couleur_Cafe.MP4','Couleur Café','07/04/2018','Serge Gainsbourg'));
    this.videosTab.push(new Video(22,'data/2018/04-fete-ecole/09-saxophone-Blue_Moon.MP4','Blue Moon','07/04/2018',''));
    this.videosTab.push(new Video(23,'data/2018/04-fete-ecole/10-ensemble-enfants.MP4','Les Yeux noirs','07/04/2018',''));
    let video24 = new Video(24,'data/2018/04-fete-ecole/11-violons-Tetris.MP4','Korobeïnki (tetris)','07/04/2018','traditionnel russe');
    this.videosTab.push(video24);
    let video25 = new Video(25,'data/2018/04-fete-ecole/12-violons-Colors_Dance.mp4','Color\'s Dance','07/04/2018','Patt Leg');
    this.videosTab.push(video25);
    let video26 = new Video(26,'data/2018/04-fete-ecole/13-Sol_y_Luna.MP4','Luna y Sol','07/04/2018','Patrick Guillem');
    this.videosTab.push(video26);
    this.videosTab.push(new Video(27,'data/2018/04-fete-ecole/14-Ray_Charles.MP4','What I\’d Say','07/04/2018','Ray Charles'));
    this.videosTab.push(new Video(28,'data/2018/04-fete-ecole/15-Turning_Band-Back_to_Black.MP4','Back to black','07/04/2018','Amy Winehouse'));
    this.videosTab.push(new Video(29,'data/2018/04-fete-ecole/16-Turning_Band-Im_Picky.MP4','I\'m Picky','07/04/2018','Shaka Ponk'));
    this.videosTab.push(new Video(30,'data/2018/04-fete-ecole/17-Mercredis_Orchestra-Panthere_Rose.MP4','La Panthère Rose','07/04/2018','Henri Mancini'));
    this.videosTab.push(new Video(31,'data/2018/04-fete-ecole/18-batterie-fantomes.MP4','composition sur le thème de la nuit (les fantômes)','07/04/2018',''));
    this.videosTab.push(new Video(32,'data/2018/04-fete-ecole/19-chorale_ado-Amstrong.MP4','Amstrong','07/04/2018','Claude Nougaro'));
    this.videosTab.push(new Video(33,'data/2018/04-fete-ecole/20-chorale_ado-Zaz.MP4','','07/04/2018','Zaz'));
    this.videosTab.push(new Video(34,'data/2018/04-fete-ecole/21-Black_Keys.MP4','Tighten up','07/04/2018','Black Keys'));
    this.videosTab.push(new Video(35,'data/2018/04-fete-ecole/22-The_Police.MP4','Regatta de Blanc','07/04/2018','The Police'));
    this.videosTab.push(new Video(36,'data/2018/04-fete-ecole/23-Biguine_Blues.MP4','Biguine Blues','07/04/2018','JC Hoareau'));
    this.videosTab.push(new Video(37,'data/2018/04-fete-ecole/24-Green_Onins.MP4','Green Onions','07/04/2018','Booker T & the MG\’s'));
    this.videosTab.push(new Video(38,'data/2018/04-fete-ecole/25-Black_Magic_Woman.MP4','Black Magic Woman','07/04/2018','Peter Green, Carlos Santana'));
    this.videosTab.push(new Video(39,'data/2018/04-fete-ecole/26-Money_for_nothing.MP4','Money for nothing','07/04/2018','Dire Straits'));
    this.videosTab.push(new Video(40,'data/2018/04-fete-ecole/27-Money.MP4','Money','07/04/2018','Pink Floyd'));
    this.videosTab.push(new Video(41,'data/2018/04-fete-ecole/28-The_man_who_sold_the_world.MP4','The man who sold the world','07/04/2018','David Bowie'));
    this.videosTab.push(new Video(42,'data/2018/04-fete-ecole/29-chorale-Lily.MP4','Lily','07/04/2018','Pierre Perret'));
    this.videosTab.push(new Video(43,'data/2018/04-fete-ecole/30-chorale-Piaf.MP4','Sous le ciel de Paris','07/04/2018','Piaf'));
    this.videosTab.push(new Video(44,'data/2018/04-fete-ecole/31-Colore-Les_Innocents.mp4','Colore','07/04/2018','Les Innocents'));
    this.videosTab.push(new Video(45,'data/2018/06-fete-musique/01-chorale-ado.MP4','','21/06/2018',''));
    this.videosTab.push(new Video(46,'data/2018/06-fete-musique/02-chorale-ado.MP4','','21/06/2018',''));
    this.videosTab.push(new Video(47,'data/2018/06-fete-musique/03-Mercredys_Orchestra-Pantere_Rose.MP4','La Panthère Rose','21/06/2018','Henri Mancini'));
    this.videosTab.push(new Video(48,'data/2018/06-fete-musique/04-orchestre-Another_Star-Stevie_Wonder.MP4','Another Star','21/06/2018','Stevie Wonder'));
    this.videosTab.push(new Video(49,'data/2018/06-fete-musique/05-chorale_adulte-Monsieur_attendait.MP4','Monsieur attendait','21/06/2018',''));
    this.videosTab.push(new Video(50,'data/2018/06-fete-musique/06-chorale_adulte-Piaf-Sous_le_ciel_de_Paris.MP4','Sous le ciel de Paris','21/06/2018','Edith Piaf'));
    this.videosTab.push(new Video(51,'data/2018/06-fete-musique/07-Turning_Band-Amy_Winehouse-Back_to_black.MP4','Back to black','21/06/2018','Amy Winehouse'));
    this.videosTab.push(new Video(52,'data/2018/06-fete-musique/09-Turning_Band-Shaka_Ponk-Picky.MP4','I\'m Picky','21/06/2018','Shaka Ponk'));
    this.videosTab.push(new Video(53,'data/2018/06-fete-musique/10-musiques_actuelles-Black_Magic_Woman.MP4','Black Magic Woman','21/06/2018','Peter Green, Carlos Santana'));
    this.videosTab.push(new Video(54,'data/2018/06-fete-musique/11-musiques_actuelles-Dire_Straits-Money_for_nothing.MP4','Money for nothing','21/06/2018','Dire Straits'));
    this.videosTab.push(new Video(55,'data/2018/06-fete-musique/12-musiques_actuelles-The_man_who_sold_the_world.MP4','The man who sold the world','21/06/2018','David Bowie'));
    this.videosTab.push(new Video(56,'data/2018/06-fete-musique/13-cornemuses.MP4','','21/06/2018',''));
    this.videosTab.push(new Video(57,'data/2018/06-musique-actuelle/01-piano-Arsene.MP4','','25/06/2018',''));
    this.videosTab.push(new Video(58,'data/2018/06-musique-actuelle/02-piano-Nathan.MP4','','25/06/2018',''));
    this.videosTab.push(new Video(59,'data/2018/06-musique-actuelle/03-piano-Gustave.MP4','','25/06/2018',''));
    this.videosTab.push(new Video(60,'data/2018/06-musique-actuelle/04-Purple-Augustin-Nathan-guitare-batterie.MP4','','25/06/2018',''));
    this.videosTab.push(new Video(61,'data/2018/06-musique-actuelle/05-blues-Augustin-Gaetan.MP4','','25/06/2018',''));
    this.videosTab.push(new Video(62,'data/2018/06-musique-actuelle/06-piano-Ines.MP4','','25/06/2018',''));
    this.videosTab.push(new Video(63,'data/2018/06-musique-actuelle/07-piano-Marie.MP4','','25/06/2018',''));
    this.videosTab.push(new Video(64,'data/2018/06-musique-actuelle/08-pianos-Prune-Carla.MP4','','25/06/2018',''));
    this.videosTab.push(new Video(65,'data/2018/06-musique-actuelle/09-impro-Raphael-Arthus-Gaetan.MP4','','25/06/2018',''));
    this.videosTab.push(new Video(66,'data/2018/06-musique-actuelle/10-piano-Emilien.MP4','','25/06/2018',''));
    this.videosTab.push(new Video(67,'data/2018/06-musique-actuelle/11-Camille-Noe.MP4','','25/06/2018',''));
    this.videosTab.push(new Video(68,'data/2018/06-musique-actuelle/12-chanteuse-contrebasse-piano-batterie.MP4','','25/06/2018',''));
    this.videosTab.push(new Video(69,'data/2018/06-musique-actuelle/13-batterie-Noe.MP4','','25/06/2018',''));
    this.videosTab.push(new Video(70,'data/2018/06-musique-actuelle/14-Aerosmith.MP4','','25/06/2018','Aerosmith'));
    this.videosTab.push(new Video(71,'data/2018/06-musique-actuelle/15-Queen.MOV','','25/06/2018','Queen'));
    this.videosTab.push(new Video(72,'data/2018/06-piano-classique/01-Guylaine.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(73,'data/2018/06-piano-classique/02-Noham-menuet.MP4','menuet','20/06/2018',''));
    this.videosTab.push(new Video(74,'data/2018/06-piano-classique/03-Noham-Bal_musicien.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(75,'data/2018/06-piano-classique/04-Astrid-L_Homme_qui_en_savait_trop.MP4','L\'Homme qui en savait trop','20/06/2018',''));
    this.videosTab.push(new Video(76,'data/2018/06-piano-classique/05-Sacha-Out_of_Africa.MP4','Out of Africa','20/06/2018',''));
    this.videosTab.push(new Video(77,'data/2018/06-piano-classique/06-Anais.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(78,'data/2018/06-piano-classique/07-Nora-bouggy.MP4','bouggy','20/06/2018',''));
    this.videosTab.push(new Video(79,'data/2018/06-piano-classique/08-Chloe-Shubert.MP4','','20/06/2018','Schubert'));
    this.videosTab.push(new Video(80,'data/2018/06-presentation-instruments/01-clarinette.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(81,'data/2018/06-presentation-instruments/02-cornet.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(82,'data/2018/06-presentation-instruments/03-violoncelle.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(83,'data/2018/06-presentation-instruments/05-cornemuse.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(84,'data/2018/06-presentation-instruments/06-cornemuse2.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(85,'data/2018/06-presentation-instruments/07-harpe.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(86,'data/2018/06-presentation-instruments/08-flute.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(87,'data/2018/06-presentation-instruments/09-accordeon-violon.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(88,'data/2018/06-presentation-instruments/10-eveil-rythmes.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(89,'data/2018/06-presentation-instruments/11-chansons-petits.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(90,'data/2018/06-presentation-instruments/12-chorale-enfants.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(91,'data/2018/06-presentation-instruments/13-chorale-enfants.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(92,'data/2018/06-presentation-instruments/14-chorale-enfants.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(93,'data/2018/06-presentation-instruments/15-piano-Maylis.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(94,'data/2018/06-presentation-instruments/16-piano-Maylis.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(95,'data/2018/06-presentation-instruments/17-piano-Lea.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(96,'data/2018/06-presentation-instruments/18-harpe-Violette.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(97,'data/2018/06-presentation-instruments/19-harpe-Romeo.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(98,'data/2018/06-presentation-instruments/20-harpe-Ines.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(99,'data/2018/06-presentation-instruments/21-piano-Antoine.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(100,'data/2018/06-presentation-instruments/22-harpe-Trycia-Beethoven.MP4','','20/06/2018','Beethoven'));
    this.videosTab.push(new Video(101,'data/2018/06-presentation-instruments/23-harpe-Claire.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(102,'data/2018/06-presentation-instruments/24-piano-jazz-basse-Matheo-Miles_Davis.MP4','','20/06/2018','Miles Davis'));
    this.videosTab.push(new Video(103,'data/2018/06-presentation-instruments/25-piano-jazz-basse-Matheo.MP4','','20/06/2018',''));
    this.videosTab.push(new Video(104,'data/2018/06-trompette-clarinette/01-trompette-Joseph.MP4','','13/06/2018',''));
    this.videosTab.push(new Video(105,'data/2018/06-trompette-clarinette/02-trompette-Alexis.MP4','','13/06/2018',''));
    this.videosTab.push(new Video(106,'data/2018/06-trompette-clarinette/03-clarinette-Emilie.MP4','','13/06/2018',''));
    this.videosTab.push(new Video(107,'data/2018/06-trompette-clarinette/04-trompette-Celian.MP4','','13/06/2018',''));
    this.videosTab.push(new Video(108,'data/2018/06-trompette-clarinette/05-trompette-Arthus.MP4','','13/06/2018',''));
    this.videosTab.push(new Video(109,'data/2018/06-trompette-clarinette/06-clarinette-Gwenaelle.MP4','','13/06/2018',''));
    this.videosTab.push(new Video(110,'data/2018/06-trompette-clarinette/07-trompette-Elie.MP4','','13/06/2018',''));
    this.videosTab.push(new Video(111,'data/2018/06-trompette-clarinette/08-clarinette-Clemence.MP4','','13/06/2018',''));
    this.videosTab.push(new Video(112,'data/2018/06-trompette-clarinette/09-trompette-Joseph-Elie.MP4','','13/06/2018',''));
    this.videosTab.push(new Video(113,'data/2018/06-trompette-clarinette/10-dechiffrage.MP4','','13/06/2018',''));
    this.videosTab.push(new Video(114,'data/2018/06-trompette-clarinette/11-duo-guitares.MP4','','13/06/2018',''));
    this.videosTab.push(new Video(115,'data/2018/06-trompette-clarinette/12-ensemble-FMBB.MP4','','13/06/2018',''));
    this.videosTab.push(new Video(116,'data/2018/06-violon-guitare/01-piano-Heidi.MP4','Le petit poney','22/06/2018',''));
    this.videosTab.push(new Video(117,'data/2018/06-violon-guitare/02-violon-Anaele.MP4','Les Cascades','22/06/2018','K et H Colledge'));
    this.videosTab.push(new Video(118,'data/2018/06-violon-guitare/03-violon-Lou-Eve.MP4','Water music','22/06/2018','G.F. Haendel'));
    this.videosTab.push(new Video(119,'data/2018/06-violon-guitare/04-accordeon-violon.MP4','Ode à la joie','22/06/2018','Beethoven'));
    this.videosTab.push(new Video(120,'data/2018/06-violon-guitare/05-violon-guitare.MP4','The blue bells of Scotland','22/06/2018',''));
    this.videosTab.push(new Video(121,'data/2018/06-violon-guitare/06-guitare-Khylian.MP4','Red river valley','22/06/2018',''));
    this.videosTab.push(new Video(122,'data/2018/06-violon-guitare/07-guitare-Khylian.MP4','Des ronds dans l’eau','22/06/2018','Th. Tisserand'));
    this.videosTab.push(new Video(123,'data/2018/06-violon-guitare/08-piano-Nolwenn.MP4','La chanson de Solveig','22/06/2018','Grieig'));
    this.videosTab.push(new Video(124,'data/2018/06-violon-guitare/09-ensemble-guitares.MP4','Menuet','22/06/2018','G.F. Haendel'));
    this.videosTab.push(new Video(125,'data/2018/06-violon-guitare/10-violon-guitare-piano.MP4','Quizas, quizas, quizas','22/06/2018','trad. cubain'));
    this.videosTab.push(new Video(126,'data/2018/06-violon-guitare/11-violon-guitare-Cielito_lindo.MP4','Cielito lindo','22/06/2018','trad. mexicain'));
    this.videosTab.push(new Video(127,'data/2018/06-violon-guitare/12-guitares-Samba_Lele.MP4','Samba Lele','22/06/2018','trad. brésilien'));
    

    let video53 = new Video(128,'data/2018/06-violon-guitare/13-violon-guitare-Mathilde.MP4','Senhora pastora','22/06/2018','trad. brésilien');
    this.videosTab.push(video53);
    let video54 = new Video(129,'data/2018/06-violon-guitare/14-guitare-ElCondorPassa.MP4','El Condor Passa','22/06/2018','');
    this.videosTab.push(video54);
    this.videosTab.push(new Video(130,'data/2018/06-violon-guitare/15-violon-guitare-Carnavelito.MP4','Carnavelito','22/06/2018','trad. péruvien'));
    let video56 = new Video(131,'data/2018/06-violon-guitare/16-violon-guitare-Kingston_Calypso.MP4','Kingston Calypso','22/06/2018','');
    this.videosTab.push(video56);
    let video57 = new Video(132,'data/2018/06-violon-guitare/17-guitare-Eric-Raphael.MP4','','22/06/2018','');
    this.videosTab.push(video57);
    let video58 = new Video(133,'data/2018/06-violon-guitare/18-violon-guitare-percussion-Cueca.MP4','Cueca','22/06/2018','trad. bolivien');
    this.videosTab.push(video58);
    
    this.mediateque = new Mediateque(this.videosTab);

    let violon=new Instrument(1,"violon");
    this.instrumentsTab.push(violon);
    let guitare=new Instrument(2,"guitare");
    this.instrumentsTab.push(guitare);


    let interprete0 = new Interprete(0, "Clément");
    this.tousInterpreteTab.push(interprete0);
    let interprete1 = new Interprete(1, "Mathilde");
    this.tousInterpreteTab.push(interprete1);
    let interprete2 = new Interprete(2, "Eric");
    this.tousInterpreteTab.push(interprete2);

    this.lienInterpreteVideoTab = [];
    this.lienInterpreteVideoTab.push(new LienInterpreteVideo(interprete1,violon, video6));
    this.lienInterpreteVideoTab.push(new LienInterpreteVideo(interprete1,violon, video24));
    this.lienInterpreteVideoTab.push(new LienInterpreteVideo(interprete1,violon, video25));
    this.lienInterpreteVideoTab.push(new LienInterpreteVideo(interprete1,violon, video26));
    this.lienInterpreteVideoTab.push(new LienInterpreteVideo(interprete1,violon, video53));
    this.lienInterpreteVideoTab.push(new LienInterpreteVideo(interprete1,violon, video56));
    this.lienInterpreteVideoTab.push(new LienInterpreteVideo(interprete1,violon, video58));
    this.lienInterpreteVideoTab.push(new LienInterpreteVideo(interprete2,guitare, video9));
    this.lienInterpreteVideoTab.push(new LienInterpreteVideo(interprete2,guitare, video11));
    this.lienInterpreteVideoTab.push(new LienInterpreteVideo(interprete2,guitare, video54));
    this.lienInterpreteVideoTab.push(new LienInterpreteVideo(interprete2,guitare, video57));
    this.lienInterpreteVideoTab.push(new LienInterpreteVideo(interprete2,guitare, video58));

    this.buildDatesList();

    this.emitVideoSubject();
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

  saveBdd(){
    this.httpClient
    .post("https://edm-videos.fir" 
    +"ebaseio.com/mediateque.json",
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
      .get<Video[]>("https://edm-videos.fir"
      +"ebaseio.com/videos")
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
