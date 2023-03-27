import { random } from "./modules/random.js";
import { range, repeat } from "./modules/loops/loops.js";
import { NiklFrame } from "./modules/niklframes/frame.js";

export const nikltools = {
    random: random,
    range: (start:number, end:number) => { range(start,end) },
    repeat: (start:number, callback:CallableFunction) => { repeat(start,callback) }
}


