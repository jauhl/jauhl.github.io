var mec = {
    phi:0,
    a:170,
    b:50,

    ephi: function() { return { x:Math.cos(this.phi), 
                                y:Math.sin(this.phi) }},

    A: function() {return { x:this.a*this.ephi().x,
                            y:this.b*this.ephi().y }},
    values: []
};

function buildgraph() {
    mec.values = [];
    for (mec.phi = 0; mec.phi < 360-1; mec.phi++) {  // phi in Grad
        mec.phi = mec.phi*Math.PI/180; // phi to Rad für Math-Funktionen
        mec.values.push(+mec.A().x.toFixed(2),+mec.A().y.toFixed(2));
        mec.phi = mec.phi*180/Math.PI; // phi to Grad zum Inkrementieren
    }
    mec.phi = 0;
}

buildgraph();
console.log(mec.values);