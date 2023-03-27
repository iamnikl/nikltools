import { NiklFrame } from "./frame.js";
;
export class NiklComponent {
    constructor(componentName) {
        this.name = componentName;
        this.url = "";
        this.component;
        this.variables = [];
    }
    import(componentName, callback) {
        this.name = componentName || this.name;
        this.component = new NiklFrame(`../../../../../../../../../../../../../../../../components/${this.name}.htm`, true, undefined, () => {
            this.prepare();
            this.getTarget();
            this.globalizeScripts();
            this.resolveVariables();
            if (callback) {
                callback();
            }
        });
    }
    prepare() {
        // find scripts:
        this.component.file = this.component.file.replace("<script>", `<script data-nikltools-script="true" class="js-comp-${this.name}">`);
        this.component.file = this.component.file.replace('<script type="module">', `<script type="module" data-nikltools-script="true" class="js-comp-${this.name}">`);
        this.handleSlots();
    }
    handleSlots() {
    }
    globalizeScripts() {
        const runScript = (val) => {
            eval(val);
        };
        document.querySelectorAll("body script[data-nikltools-script=true]").forEach(script => {
            let clone = script.cloneNode(true);
            let newEl = document.head.appendChild(clone);
            script.remove();
            //@ts-ignore
            runScript(newEl.innerHTML);
        });
    }
    resolveVariables() {
        this.variables.forEach(variable => {
            var _a, _b;
            if ((_a = document.querySelector("html")) === null || _a === void 0 ? void 0 : _a.innerHTML.includes(`{${variable.name}}`)) {
                // @ts-ignore
                document.querySelector("html").innerHTML = (_b = document.querySelector("html")) === null || _b === void 0 ? void 0 : _b.innerHTML.replace(`{${variable.name}}`, variable.value);
            }
            else {
                throw new Error("Variable not found! | NIKLFRAME");
            }
        });
    }
    getTarget() {
        let insertContent = `
        <!-- ${this.name} | NiklFrame Component -->
        ${this.component.file}
        `;
        if (document.body.innerHTML.toLowerCase().includes(`<NiklComponent:${this.name}>`.toLowerCase()) &&
            document.body.innerHTML.toLowerCase().includes(`</NiklComponent:${this.name}>`.toLowerCase())) {
            document.body.innerHTML = document.body.innerHTML.replace(`<NiklComponent:${this.name}>`.toLowerCase(), insertContent);
            ;
            document.body.innerHTML = document.body.innerHTML.replace(`</NiklComponent:${this.name}>`, "");
            document.querySelectorAll("slot").forEach((slot) => {
                var _a, _b;
                let slotName = slot.getAttribute("name");
                if (document.querySelector(`[name="${slotName}"]`)) {
                    let slotNode = (_a = document.querySelector(`[slot="${slotName}"]`)) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
                    //@ts-ignore
                    slot.insertAdjacentElement("afterend", slotNode);
                    (_b = document.querySelectorAll(`[slot="${slotName}"]`)[1]) === null || _b === void 0 ? void 0 : _b.remove();
                    slot.remove();
                }
                else {
                    throw new Error("Slot not found! | NIKLFRAMES");
                }
            });
        }
        else if (document.body.innerHTML.toLowerCase().includes(`<NiklComponent:${this.name} />`.toLowerCase())) {
            document.body.innerHTML = document.body.innerHTML.replace(`<NiklComponent:${this.name} />`.toLowerCase(), insertContent);
        }
        else {
            throw new Error("Error - Component not found or invalid reference | NIKLFRAMES");
        }
    }
    setVariable(variable, value) {
        this.variables.push({ name: variable, value: value });
    }
}
