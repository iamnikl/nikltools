import { random } from "./modules/random.js";
import { range, repeat } from "./modules/loops/loops.js";
import { diagrams } from "./modules/diagrams/diagrams.mjs";

export const nikltools = {
    random: random,
    range: (start, end) => { range(start, end); },
    repeat: (start, callback) => { repeat(start, callback); },
    diagram: diagrams,
};

let el = new nikltools.diagram.Parliament("Neues Parlament", 500, true)
el.setSeats = [
    { 
        name: "Käspartei", seats: 94, color: "yellow"
    },
    {
        name: "Käsextremen", seats: 78, color: "#890000"
    },
    {
        name: "Pümmel Partei", seats: 63, color: "#108fff"
    },
    { 
        name: "Sackenschädel", seats: 78, color: "#ff5252"
    },
    {
        name: "1-2-3 Betrugs Partei", seats: 63, color: "orange"
    },
    {
        name: "DUDU", seats: 10, color: "black"
    },
    { 
        name: "Kloreiniger WC", seats: 10, color: "#108fff"
    },
    {
        name: "Die Alten", seats: 21, color: "purple"
    },
    {
        name: "Böbel Brocken Partei", seats: 31, color: "green"
    },
    {
        name: "Anti-Hosenfresser", seats: 21, color: "pink"
    },
    {
        name: "Egeltje för Demokratje", seats: 31, color: "lightgreen"
    },
];
el.render()