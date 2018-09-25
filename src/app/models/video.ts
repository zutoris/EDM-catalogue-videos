export class Video {

    cheminImage:string;
    cheminVideo:string;
    
    constructor(
        public id:number,
        public chemin:string,
		public titre:string,
        public date:string,
        public compositeur:string){
            let n:number = this.chemin.lastIndexOf("/");
            this.cheminImage =  "http://ecole-musique-sautron.fr/".concat(this.chemin.slice(0,n)).concat("/vignettes").concat(this.chemin.slice(n,this.chemin.length-3)).concat("jpg");
            this.cheminVideo = "http://ecole-musique-sautron.fr/".concat(this.chemin);
    }
}
