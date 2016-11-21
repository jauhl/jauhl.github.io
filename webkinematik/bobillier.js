function position() {
    g.del().style({foc:"white"})

     // Schritt 1
     if(mec.step >= 1) {
        g.use("pol",mec.P).label("P","n")
         .lin(mec.A0.x - 2*width*mec.ephi.x, mec.A0.y - 2*width*mec.ephi.y, mec.A0.x + 2*width*mec.ephi.x, mec.A0.y + 2*width*mec.ephi.y, {ld:"@dashdot", ls:"rgba(255, 255, 255, 0.7)"})
         .lin(mec.B0.x - 2*width*mec.epsi.x, mec.B0.y - 2*width*mec.epsi.y, mec.B0.x + 2*width*mec.epsi.x, mec.B0.y + 2*width*mec.epsi.y, {ld:"@dashdot", ls:"rgba(255, 255, 255, 0.7)"})         
     }

     // Schritt 2
     if(mec.step >= 2) {
        g.use("nod",mec.I).label("I","se")
         .lin(mec.A.x - 2*width*mec.etheta.x, mec.A.y - 2*width*mec.etheta.y, mec.A.x + 2*width*mec.etheta.x, mec.A.y + 2*width*mec.etheta.y, {ld:"@dash", ls:"rgba(255, 255, 255, 0.7)"})
        if (mec.I.x < mec.A0.x || mec.I.x > mec.B0.x) {
            g.lin(mec.B0.x, mec.B0.y, mec.I.x, mec.I.y, {ld:"@dash", ls:"rgba(255, 255, 255, 0.7)"})  
        } else {
            g.lin(mec.B0.x, mec.B0.y, mec.A0.x, mec.A0.y, {ld:"@dash", ls:"rgba(255, 255, 255, 0.7)"}) 
        }
     }

     g.bar2(mec.A, mec.B)
      .use("nod",mec.A).label("A","nw")
      .use("nod",mec.B).label("B","ne")
      .use("gnd",mec.B0).label("B0","se") 
}        

function render() {
    if (dirty) {
        position();
        world.exe(ctx);
        dirty = false;
    }
    requestAnimationFrame(render);
}

var cnv = document.getElementById('c'),
    ctx = cnv.getContext('2d'),
    width = cnv.width = window.innerWidth,
    height = cnv.height = window.innerHeight,

    pi = Math.PI,

    mec = {
        phi:60*pi/180,
        a:45,
        b:150,
        c:100,
        d:200,
        e:0,

        step: 0,

        //######################################################################
        //#            Loesung
        //######################################################################

        get r() {
            return (this.A0.y - this.B0.y + (this.B0.x - this.A0.x)*(this.ephi.y/this.ephi.x))/(this.epsi.y - (this.ephi.y*this.epsi.x)/this.ephi.x);
        },

        get P() {
            return (v2.isum(v2.scl(this.epsi,this.r), this.B0));
        },

        get k() {
            return (this.A.y - this.A0.y + (this.A0.x - this.A.x)*(this.etheta.y/this.etheta.x))/(this.ealpha.y - (this.etheta.y*this.ealpha.x)/this.etheta.x);
        },

        get I() {
            return (v2.isum(v2.scl(this.ealpha,this.k), this.A0));
        },

        //######################################################################
        //#            Kinematik
        //######################################################################

        get ephi() {
            return {x: Math.cos(this.phi), y: Math.sin(this.phi)};
        },
        
        get g() {
            return {x: this.d2*this.ealpha.x - this.a*this.ephi.x, y:  this.d2*this.ealpha.y - this.a*this.ephi.y};
        },
        
        get gg() {
            return this.a*this.a + this.d2*this.d2 - 2*this.a*this.d2*Math.cos(this.alpha - this.phi);
        },
        
        get d2() {
            return Math.sqrt(this.d*this.d+this.e*this.e);
        },
        
        get alpha() {
            return Math.atan(this.e/this.d);
        },
        
        get ealpha() {
            return {x: Math.cos(this.alpha), y: Math.sin(this.alpha)};
        },
        
        get theta() {
            var gg = this.gg, bb_gg = (this.b*this.b)/gg, g = this.g,
                lambda = 0.5 * (bb_gg - this.c*this.c/gg + 1),
                mue = Math.sqrt(bb_gg - lambda * lambda);
            return Math.atan2((1/this.b) * (lambda*g.y + mue*g.x), (1/this.b)*(lambda*g.x - mue*g.y))
        },
        
        get etheta() {
            return {x: Math.cos(this.theta), y: Math.sin(this.theta)};
        },
        
        get psi() {
            var etheta = this.etheta;
            return Math.atan2((1/this.c)*(this.b*etheta.y - this.g.y), (1/this.c)*(this.b*etheta.x - this.g.x))
        },
        
        get epsi() {
            return {x: Math.cos(this.psi), y: Math.sin(this.psi)};
        },

        //######################################################################
        //#            Punkte
        //######################################################################

        A0: {x:0, y:0},

        get B0() {
            return {x: this.A0.x + this.d, y: this.A0.y + this.e};
        },
        
        get A() {
            return {x: this.A0.x + this.a*this.ephi.x, y: this.A0.y + this.a*this.ephi.y};
        },
        
        get B() {
            return {x: this.B0.x + this.c*this.epsi.x, y: this.B0.y + this.c*this.epsi.y};
        }
    },

    g = g2(),
    world = g2().clr().cartesian().style({foc:"white"})
                .rec(-width,-height,2*width,2*height,{ls:"rgba(52, 76, 107, 1)",fs:"rgba(52, 76, 107, 1)"})  // blueprint blue rgba(52, 76, 107, 1)
                // .beg({lw:5})
                    .grid("rgba(255, 255, 255, 0.1)",100)
                // .end()
                // .beg({lw:0.15})
                    .grid("rgba(255, 255, 255, 0.1)",20)
                // .end()
                .pan((width - (mec.a + mec.d))/2, (height - mec.c)/2) 
                .use(g)
                .use("gnd").label("A0","se"),

    dirty = true,

    panel = QuickSettings.create(10, 10, "Steuerung")
             .addImage("","http://www.fh-dortmund.de/images/logo.svg")
             .addProgressBar("Fortschritt", 6, mec.step, "numbers")
             .addButton("Schritt weiter ▶", function(value) { if(mec.step<6) {mec.step+=1; dirty = true; panel.setValue("Fortschritt", mec.step);}}) // ▶
             .addButton("Schritt zurück ◀", function(value) { if(mec.step>0) {mec.step-=1; dirty = true; panel.setValue("Fortschritt", mec.step);}}) // ◀
             .addRange("φ", 0, 360, 60, 1, function(value) { mec.phi = value / 180 * pi; dirty = true;})
             .addNumber("a", 0, 300, 45, 1, function(value) { mec.a = value; dirty = true;})
             .addNumber("b", 0, 300, 150, 1, function(value) { mec.b = value; dirty = true;})
             .addNumber("c", 0, 300, 100, 1, function(value) { mec.c = value; dirty = true;})
             .addNumber("d (rein horizontal)", 0, 300, 200, 1, function(value) { mec.d = value; dirty = true;})
             .addNumber("e (rein vertikal)", -100, 100, 0, 1, function(value) { mec.e = value; dirty = true;})
;

/*
 *  Initialisierung
 */

// Animation starten
render();

window.onload = function() {
    var test = 1;
}