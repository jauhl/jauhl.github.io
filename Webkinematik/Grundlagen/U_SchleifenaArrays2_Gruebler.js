function gruebler(arr,n,f) {
    var f = f || 1, 
        n = n || 4;

    if (!Array.isArray(arr)) {  // alternativ arr.constructor !== Array
        console.log("Es wurde kein Array uebergeben!");
        return;
    } else {
        for (var i = 1; i <= n; i++) {
            var b_2 = (3*(i - 1) - f)/2;
            var obj = {};

            obj.n = i;
            obj.b2 = b_2;
            if (Number.isInteger(b_2)) 
            arr.push(obj);
        }
    }
}

var b2 = [];

gruebler(b2,20,1);
console.log(...b2);