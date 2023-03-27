export function repeat(count, callback) {
    for (let num = 0; num < count; num++) {
        callback();
    }
}
;
export function range(from, to) {
    let arr = [];
    for (let num = 0; num < to; num++) {
        arr.push(num);
    }
    return arr;
}
