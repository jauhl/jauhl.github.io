/**
 * Aufgabe aus Mechanismentechnik Klausur WS14/15 Aufgabe 2
 */

function toRad(x) {
    return +(x*Math.PI/180)
}

function toDeg(x) {
    return +(x*180/Math.PI)
}

function calc_alpha(th_tr) {
   return +(180*(th_tr-1)/(th_tr+1)).toFixed(2)
}

function calc_b(c,psi,alpha) {
    let psi_t = toRad(psi),
        alpha_t = toRad(alpha),
        sin1 = Math.sin(psi_t/2),
        sin2 = Math.sin(alpha_t/2),
        cos = Math.cos(alpha_t/2);
    return +Math.sqrt( (c*c*sin1*sin1 - a*a*cos*cos) / (sin2*sin2) ).toFixed(2)
}

function calc_d(a,b,psi,alpha) {
    let psi_t = toRad(psi),
        alpha_t = toRad(alpha),
        sin = Math.sin(psi_t/2);
    return +Math.sqrt( ( (b*b - a*a)*Math.sin(psi_t/2 - alpha_t) + c*c*sin )/(sin) ).toFixed(2)
}

function calc_mue(a,b,c,d) {
    return +toDeg(Math.acos( (b*b + c*c - (d-a)*(d-a)) / (2*b*c) )).toFixed(2)
}

let a = 100;
let c = 220;
let psi_0 = 60;
let th_tr = 8/7;

let alpha = calc_alpha(th_tr);
let b = calc_b(c,psi_0,alpha);
let d = calc_d(a,b,psi_0,alpha);
let mue_i = calc_mue(a,b,c,d);

console.log("alpha = " + alpha + "°"); // alpha = 12.00°
console.log("b = " + b + "mm");        // b = 449.66mm
console.log("d = " + d + "mm");        // d = 408.88mm
console.log("mue_i = " + mue_i + "°"); // mue_i = 38.34°