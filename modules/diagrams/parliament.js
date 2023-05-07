const styleDefinitions = /*html*/ `
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
`;
export class Parliament {
    constructor(name, seats, innerCircle = false) {
        this.name = name;
        // @ts-ignore
        this.seats = seats.toFixed(0);
        this.fractions = [];
        this.rendered = false;
        this.innerCircle = innerCircle;
        this.outerLabels = false;
        console.log(innerCircle);
    }
    set setSeats(fractions) {
        this.fractions = fractions;
    }
    newFraction(name, seats, color) {
        this.fractions.push({ name: name, seats: seats, color: color });
    }
    config(configuration) {
        if ((configuration === null || configuration === void 0 ? void 0 : configuration.innerCircle) || (configuration === null || configuration === void 0 ? void 0 : configuration.innerCircle) === false)
            this.innerCircle = configuration.innerCircle;
        if (configuration === null || configuration === void 0 ? void 0 : configuration.outerLabels)
            this.outerLabels = true;
    }
    render() {
        if (!this.rendered) {
            // Insert Style Definitions
            document.head.insertAdjacentHTML("beforeend", styleDefinitions);
            let diagramWrapper = document.createElement("div");
            diagramWrapper.classList.add("ntools-parliament-diagram");
            document.body.appendChild(diagramWrapper);
            diagramWrapper.innerHTML = /*html*/ `
                <canvas class="ntools-inner-parliament"></canvas>
            `;
            this.rendered = true;
        }
        // canvas modifications
        const canvas = document.querySelector("canvas") || document.createElement("canvas");
        const ctx = canvas.getContext("2d");
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
            let percentage = (this.fractions[i].seats / this.seats) * 100;
            const angle = (Math.PI * percentage) / 100;
            const endAngle = startAngle + angle;
            ctx.fillStyle = this.fractions[i].color;
            // Teilstück zeichnen
            ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
            ctx === null || ctx === void 0 ? void 0 : ctx.moveTo(x, y);
            ctx === null || ctx === void 0 ? void 0 : ctx.arc(x, y, radius, startAngle, endAngle);
            ctx === null || ctx === void 0 ? void 0 : ctx.closePath();
            ctx === null || ctx === void 0 ? void 0 : ctx.fill();
            // Textbeschriftung für das Teilstück
            if (this.outerLabels) {
                ctx.font = "15px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx === null || ctx === void 0 ? void 0 : ctx.fillText(this.fractions[i].name, x + (Math.cos(startAngle + (angle / 2)) * (radius + canvas.width / 15)), y + (Math.sin(startAngle + (angle / 2)) * (radius + canvas.width / 15)));
            }
            // Startwinkel für das nächste Teilstück aktualisieren
            startAngle = endAngle;
        }
        if (this.innerCircle) {
            ctx.fillStyle = "white";
            ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
            ctx === null || ctx === void 0 ? void 0 : ctx.arc(x, y, radius / 3, 0, Math.PI * 2);
            ctx === null || ctx === void 0 ? void 0 : ctx.closePath();
            ctx === null || ctx === void 0 ? void 0 : ctx.fill();
        }
    }
    static hi() {
        console.log("Hi");
    }
}
// Prozente der Sitzverteilung berechnen! | 07.05.23 - Niklas
