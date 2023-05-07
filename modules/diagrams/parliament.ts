const styleDefinitions:string = /*html*/`
    <style>
        .ntools-parliament-diagram {
            width: 90%;
            aspect-ratio: 2/1;
            border: 1px solid grey;
            display: grid;
            place-items: center;
            overflow: hidden;
        }
        .ntools-inner-parliament {
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: nowrap;
        }
    </style>
`
export class Parliament {
    name: string;
    seats: number;
    fractions: Fraction[];
    rendered: boolean;
    innerCircle: any;
    outerLabels: boolean;

    constructor(name:string, seats:number, innerCircle:boolean | undefined = false) {
        this.name = name;
        // @ts-ignore
        this.seats = seats.toFixed(0);
        this.fractions = [];
        this.rendered = false;
        this.innerCircle = innerCircle;
        this.outerLabels = false;
        console.log(innerCircle)
    }
    
    set setSeats(fractions:Fraction[]) {
        this.fractions = fractions;
    }
    newFraction(name:string, seats:number, color:string) {
        this.fractions.push({name: name, seats:seats, color: color})
    }
    config(configuration:Configuration) {
        if(configuration?.innerCircle || configuration?.innerCircle === false) this.innerCircle = configuration.innerCircle;
        if(configuration?.outerLabels) this.outerLabels = true;
    }
    render() {
        if(!this.rendered) {
            // Insert Style Definitions
            document.head.insertAdjacentHTML("beforeend", styleDefinitions);

            let diagramWrapper = document.createElement("div");
                diagramWrapper.classList.add("ntools-parliament-diagram");
            document.body.appendChild(diagramWrapper)

            diagramWrapper.innerHTML = /*html*/`
                <canvas class="ntools-inner-parliament"></canvas>
            `

            this.rendered = true;
        }
        

        // canvas modifications
        const canvas:HTMLCanvasElement = document.querySelector("canvas") || document.createElement("canvas");
        const ctx:CanvasRenderingContext2D | any = canvas.getContext("2d");

        // ----
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;


        // Daten für das Diagramm
        // Kreis-Mittelpunkt und Radius
        const x = canvas.width / 2;
        const y = canvas.height / 1.5;
        const radius = Math.min(canvas.width, canvas.height) / 1.8;

        // Startwinkel für das erste Daten-Teilstück
        let startAngle = Math.PI;

        // Schleife für jedes Daten-Teilstück
        for (let i in this.fractions) {
            let percentage = (this.fractions[i].seats / this.seats)*100;
            const angle = (Math.PI * percentage) / 100;
            const endAngle = startAngle + angle;

            ctx.fillStyle = this.fractions[i].color;

            // Teilstück zeichnen
            ctx?.beginPath();
            ctx?.moveTo(x, y);
            ctx?.arc(x, y, radius, startAngle, endAngle);
            ctx?.closePath();
            ctx?.fill();

            // Textbeschriftung für das Teilstück
            if(this.outerLabels) {
                ctx.font = "15px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx?.fillText(this.fractions[i].name, x + (Math.cos(startAngle + (angle / 2)) * (radius + canvas.width / 15)), y + (Math.sin(startAngle + (angle / 2)) * (radius + canvas.width / 15)));    
            }
            // Startwinkel für das nächste Teilstück aktualisieren
            startAngle = endAngle;
        }
        if(this.innerCircle) {
            ctx.fillStyle = "white";
            ctx?.beginPath()
            ctx?.arc(x, y, radius / 3, 0, Math.PI * 2);
            ctx?.closePath()
            ctx?.fill();
        }
    }
    static hi() {
        console.log("Hi")
    }
}
interface Fraction {
    name:string,
    seats:number,
    color:string
}
interface Configuration {
    innerCircle:boolean | undefined,
    outerLabels:boolean | undefined,
}
// Prozente der Sitzverteilung berechnen! | 07.05.23 - Niklas