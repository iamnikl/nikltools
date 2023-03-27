var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const select = (element, multiple = false) => {
    if (element.startsWith("%nfc-") && element.endsWith("%")) {
        if (document.body.innerHTML.includes(`%nfc-${element}%`)) {
            document.body.innerHTML = document.body.innerHTML.replace(`%nfc-${element}%`, `<div>Component</div>`);
        }
    }
    if (multiple === false) {
        return document.querySelector(element);
    }
    else {
        return document.querySelectorAll(element);
    }
};
export class NiklFrame {
    constructor(url, autoReader, target, callback = () => { }) {
        this.url = `../../../../components/${url}`;
        this.autoReader = autoReader;
        this.file;
        this.target = target;
        this.visible = true;
        if (autoReader === true) {
            this.readFile(callback);
        }
        this.checkForListeners();
    }
    set frameTarget(Element) {
        this.target = Element;
        this.appendFrame();
        this.changeVisible(true);
    }
    readFile(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.url.endsWith(".html") || this.url.endsWith(".htm")) {
                fetch(this.url)
                    .then(data => {
                    if (data.ok) {
                        return data.text();
                    }
                    else {
                        throw new Error("Error - " + data.status + " | NIKLFRAME");
                    }
                }).then(txt => {
                    this.file = txt;
                    callback();
                    if (this.target) {
                        this.appendFrame();
                        this.changeVisible(true);
                    }
                }).catch((error) => {
                    throw new Error(error + " | NIKLFRAME");
                });
            }
            else {
                throw new Error("Invalid File extention - Use .html or .htm for building HTML / NiklFrame Components! | NIKLFRAME");
            }
        });
    }
    checkForListeners() {
        document.querySelectorAll("[data-nf-click]").forEach(el => {
            el.addEventListener("click", () => {
                //@ts-ignore
                let func = el.getAttribute("data-nf-click")(function () { func; });
            });
        });
    }
    changeVisible(visibility) {
        if (visibility === true) {
            //@ts-ignore
            select(this.target).style.display = "block";
            this.visible = true;
        }
        else if (visibility === false) {
            //@ts-ignore
            select(this.target).style.display = "none";
            this.visible = false;
        }
    }
    reload() {
        //@ts-ignore
        select(this.target).innerHTML = this.file;
    }
    appendFrame() {
        //@ts-ignore
        select(this.target).innerHTML = this.file;
    }
    setTempVariables(variables) {
        variables.forEach(variable => {
            if (this.file.includes(`%nfv-${variable.name}%`)) {
                let newFileData = this.file.replace(`%nfv-${variable.name}%`, variable.value);
                this.file = newFileData;
            }
        });
    }
}
