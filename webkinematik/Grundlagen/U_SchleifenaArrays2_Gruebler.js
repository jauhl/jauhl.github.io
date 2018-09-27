function gruebler(arr,n,f) {
    let f = f || 1,
        n = n || 4;

    if (!Array.isArray(arr)) {  // alternativ arr.constructor !== Array
        console.log("Es wurde kein Array uebergeben!");
        return;
    } else {
        for (let i = 1; i <= n; i++) {
            let b_2 = (3*(i - 1) - f)/2;
            let obj = {};

            obj.n = i;
            obj.b2 = b_2;
            if (Number.isInteger(b_2))
            arr.push(obj);
        }
    }
}

let b2 = [];

gruebler(b2,20,1);
console.log(...b2);