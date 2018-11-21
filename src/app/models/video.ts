export class Video {
    id:number;
    date:string;
    titre:string;
    compositeur:string;
    cheminVideo:string;
    cheminImage:string;
    /** Indique si la vidéo est dans un format lisible par un navigateur. */
    formatCompatible:boolean;
}
