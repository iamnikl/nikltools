import { NiklFrame, select } from "./frame.js";
import { nikltools } from "../../main.js";

interface ComponentVariable {
    name:string,
    value:any
};

export class NiklComponent {
    name: string | undefined;
    url: string;
    component: any;
    variables:ComponentVariable[];
    constructor(componentName?:string) {
        this.name = componentName;
        this.url = "";
        this.component;
        this.variables = [];
    }
    import(componentName?:string, callback?:CallableFunction) {
        this.name = componentName || this.name
        this.component = new NiklFrame(`../../../../../../../../../../../../../../../../components/${this.name}.htm`, true, undefined, () => {
            this.prepare();
            this.getTarget();
            this.globalizeScripts();
            this.resolveVariables();

            if(callback) {
                callback()
            }
        });
    }
    prepare() {
        // find scripts:
        this.component.file = this.component.file.replace("<script>", `<script data-nikltools-script="true" class="js-comp-${this.name}">`);
        this.component.file = this.component.file.replace('<script type="module">', `<script type="module" data-nikltools-script="true" class="js-comp-${this.name}">`);
        this.handleSlots()
    }
    handleSlots() {

    }
    globalizeScripts() {
        const runScript = (val:string) => {
            eval(val)
        }
        document.querySelectorAll("body script[data-nikltools-script=true]").forEach(script => {
            let clone = script.cloneNode(true);
            let newEl = document.head.appendChild(clone);

            script.remove()
            //@ts-ignore
            runScript(newEl.innerHTML)
        })
    }
    resolveVariables() {
        this.variables.forEach(variable => {
            if(document.querySelector("html")?.innerHTML.includes(`{${variable.name}}`)) {
                // @ts-ignore
                document.querySelector("html").innerHTML = document.querySelector("html")?.innerHTML.replace(`{${variable.name}}`, variable.value)
            } else {
                throw new Error("Variable not found! | NIKLFRAME");
            }
        })
    }
    getTarget() {
        let insertContent = `
        <!-- ${this.name} | NiklFrame Component -->
        ${this.component.file}
        `
        if(document.body.innerHTML.toLowerCase().includes(`<NiklComponent:${this.name}>`.toLowerCase()) &&
            document.body.innerHTML.toLowerCase().includes(`</NiklComponent:${this.name}>`.toLowerCase())
        ) {
            document.body.innerHTML = document.body.innerHTML.replace(`<NiklComponent:${this.name}>`.toLowerCase(), insertContent);;
            document.body.innerHTML = document.body.innerHTML.replace(`</NiklComponent:${this.name}>`, "");

            document.querySelectorAll("slot").forEach((slot) => {
                let slotName = slot.getAttribute("name");
                
                if(document.querySelector(`[name="${slotName}"]`)) {
                    let slotNode = document.querySelector(`[slot="${slotName}"]`)?.cloneNode(true);
                    //@ts-ignore
                    slot.insertAdjacentElement("afterend", slotNode);

                    document.querySelectorAll(`[slot="${slotName}"]`)[1]?.remove()
                    slot.remove();
                } else {
                    throw new Error("Slot not found! | NIKLFRAMES")
                }
            })
        }
        else if(
            document.body.innerHTML.toLowerCase().includes(`<NiklComponent:${this.name} />`.toLowerCase())
        ) {
            document.body.innerHTML = document.body.innerHTML.replace(`<NiklComponent:${this.name} />`.toLowerCase(), insertContent)
        } else {
            throw new Error("Error - Component not found or invalid reference | NIKLFRAMES");
        }
    }
    setVariable(variable:string, value:any):void {
        this.variables.push({name: variable, value:value})
    }
}
