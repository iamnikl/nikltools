export function repeat(count:number, callback:CallableFunction) {
    for(let num = 0; num < count; num++) {
        callback();
    }
};
export function range(from:number, to:number):number[] {
    let arr:number[] = [];
    for (let num = 0; num < to; num++) {
        arr.push(num);
    }
    return arr;
}