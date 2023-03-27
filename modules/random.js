export const random = {
    number: function (num) {
        let result = 0;
        let random0to1 = Math.random();
        result = Math.round(random0to1 * num);
        return result;
    },
    numberBetween: function (start, end) {
        if (start > end) {
            throw new Error("Start value has to be smaller than end value - NiklTools");
        }
        else {
            let result = 0;
            let diff = end - start;
            let random0to1 = Math.random();
            result = Math.round(random0to1 * diff);
            result += start;
            return result;
        }
    },
    letter: function (letters) {
        const runDefault = () => {
            let str = "abcdefghijklmnopqrstuvwxyz";
            let str__maxIndex = str.length - 1;
            let randomIndex = this.number(str__maxIndex);
            let randomLetter = str[randomIndex];
            return randomLetter;
        };
        const runCostum = (str) => {
            let str__maxIndex = str.length - 1;
            let randomIndex = this.number(str__maxIndex);
            let randomLetter = str[randomIndex];
            return randomLetter;
        };
        if (letters === undefined) {
            return runDefault();
        }
        else {
            return runCostum(letters);
        }
    },
    arrayItem: function (array) {
        let length = array.length;
        let randomIndex = this.numberBetween(0, length - 1);
        let randomElement = array[randomIndex];
        return randomElement;
    },
    color: function (stringFormat, p_red, p_green, p_blue) {
        if (!p_red && !p_green && !p_blue) {
            let red = this.number(255);
            let green = this.number(255);
            let blue = this.number(255);
            let rgbColorArray = new Array(red, green, blue);
            if (stringFormat) {
                return `rgb(${red},${green},${blue})`;
            }
            else {
                return rgbColorArray;
            }
        }
        else {
        }
    },
    linearGradient: function (degree) {
        let clr1 = this.color(true);
        let clr2 = this.color(true);
        const gradient = `linear-gradient(${degree || this.number(360)}deg, ${clr1}, ${clr2})`;
        return gradient;
    }
};
