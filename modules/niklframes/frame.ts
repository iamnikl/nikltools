export const select = (element:string, multiple=false):Element | null | NodeListOf<Element>=> {
    if(element.startsWith("%nfc-") && element.endsWith("%")) {
        if(document.body.innerHTML.includes(`%nfc-${element}%`)) {
            document.body.innerHTML = document.body.innerHTML.replace(`%nfc-${element}%`, `<div>Component</div>`);
        }
    }
    if(multiple === false) {
        return document.querySelector(element)
    } else {
        return document.querySelectorAll(element)
    }
}
interface NFV_Object {
    name:string,
    value:string
}
export class NiklFrame {
    url:string;
    autoReader:boolean;
    file:any;
    target:string | undefined;
    visible:boolean;
    constructor(url:string, autoReader:boolean, target?:string, callback:CallableFunction = () => {}) {
        this.url = `../../../../components/${url}`;
        this.autoReader = autoReader;
        this.file;
        this.target = target;
        this.visible = true;

        if(autoReader === true) {
            this.readFile(callback)
        }
        this.checkForListeners()
    }
    set frameTarget(Element:string) {
        this.target = Element;
        this.appendFrame();
        this.changeVisible(true)
    }
    async readFile(callback:CallableFunction) {
        if(this.url.endsWith(".html") || this.url.endsWith(".htm")) {
            fetch(this.url)
            .then(data => {
                if(data.ok) {
                    return data.text()
                } else {
                    throw new Error("Error - " + data.status + " | NIKLFRAME");
                }
            }).then(txt => {
                this.file = txt;
                callback();
                if(this.target) {
                    this.appendFrame();
                    this.changeVisible(true);
                }
            }).catch((error) => {
                throw new Error(error + " | NIKLFRAME");
            })
        } else {
            throw new Error("Invalid File extention - Use .html or .htm for building HTML / NiklFrame Components! | NIKLFRAME");
        }
    }
    checkForListeners() {
        document.querySelectorAll("[data-nf-click]").forEach(el => {
            el.addEventListener("click", () => {
                //@ts-ignore
                let func = el.getAttribute("data-nf-click")
                (function() {func})
            })
        })
    }
    changeVisible(visibility:boolean) {
        if(visibility === true) {
            //@ts-ignore
            select(this.target).style.display = "block"
            this.visible = true;
        } else if (visibility === false) {
            //@ts-ignore
            select(this.target).style.display = "none";
            this.visible = false;
        }
    }
    reload() {
        //@ts-ignore
        select(this.target).innerHTML = this.file
    }
    appendFrame() {
        //@ts-ignore
        select(this.target).innerHTML = this.file;
    }
    setTempVariables(variables:NFV_Object[]) {
        variables.forEach(variable => {
            if(this.file.includes(`%nfv-${variable.name}%`)) {
                let newFileData = this.file.replace(`%nfv-${variable.name}%`, variable.value);
                this.file = newFileData;
            }
        });
    }
}