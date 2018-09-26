import { Video } from './video';
import { Interprete } from './interprete';
import { Instrument } from './instrument';

export class LienInterpreteVideo {
    constructor(public interprete:Interprete, public instrument:Instrument, public video:Video){
    }
}