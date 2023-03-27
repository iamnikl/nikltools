import { random } from "./modules/random.js";
import { range, repeat } from "./modules/loops/loops.js";
export const nikltools = {
    random: random,
    range: (start, end) => { range(start, end); },
    repeat: (start, callback) => { repeat(start, callback); }
};
