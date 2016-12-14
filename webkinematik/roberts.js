function position() {
    g.del().style({foc:"white"})
     
    if (panel.getValue("Ersatzviergelenk 1")) {
        g.bar2(mec.A0,mec.A1)
         .bar2(mec.C0,mec.C1)  //.label(`${v2.len(v2.dif(mec.C1,mec.C0)).toFixed(2)}`,"mid")
         .ply([mec.A1, mec.K, mec.C1], true, {fs:"rgba(200,100,100,0.5)"})
         .link2([mec.A1, mec.K, mec.C1], true)
    }

    if (panel.getValue("Ersatzviergelenk 2")) {
        g.bar2(mec.B0,mec.B2)  //.label(`${v2.len(v2.dif(mec.B2,mec.B0)).toFixed(2)}`,"mid")
         .bar2(mec.C0,mec.C2)  //.label(`${v2.len(v2.dif(mec.C2,mec.C0)).toFixed(2)}`,"mid")
         .ply([mec.B2, mec.K, mec.C2], true, {fs:"rgba(100,200,100,0.5)"})
         .link2([mec.B2, mec.K, mec.C2], true)
    }

     // Ursprungs KS
     g.bar2(mec.A0,mec.A)
     .bar2(mec.B0,mec.B)
     .ply([mec.A, mec.K, mec.B], true, {fs:"rgba(200,200,200,0.5)"})
     .link2([mec.A, mec.K, mec.B], true)


     .use("nod",mec.A).label("A","nw")
     .use("nod",mec.B).label("B","ne")
     .use("nod",mec.K).label("K","ne")
     .use("nodfix",mec.B0).label("B0","se")

    if (panel.getValue("Ersatzviergelenk 1")) {
        g.use("nod",mec.A1).label("A1","nw")
         .use("nod",mec.C1).label("C1","nw")
    }
    if (panel.getValue("Ersatzviergelenk 2")) {
        g.use("nod",mec.B2).label("B2","nw")
         .use("nod",mec.C2).label("C2","nw")
    }
    if (panel.getValue("Ersatzviergelenk 1") || panel.getValue("Ersatzviergelenk 2")) 
     g.use("nodfix",mec.C0).label("C0","se")



     // Schritt 1
     if(mec.step >= 1) {
         g.lin(mec.origin2.x, mec.origin2.y, mec.origin2.x + mec.a + mec.b + mec.c, mec.origin2.y, {ls:"rgba(255, 255, 255, 0.8)"})
     }

     // Schritt 2
     if(mec.step >= 2) {
         g.ply([mec.origin2.x + mec.a, mec.origin2.y, mec.origin2.x + mec.a + mec.j, mec.origin2.y + mec.k, mec.origin2.x + mec.a + mec.b, mec.origin2.y],false, {fs:"rgba(200,200,200,0.5)", ls:"rgba(255, 255, 255, 0.8)"})
     }

     // Schritt 3
     if(mec.step >= 3) {
        // g.lin(mec.I.x, mec.I.y, mec.P.x, mec.P.y, {ls:"rgba(255, 255, 255, 0.6)"}).mark("tick",0.49).mark("tick",0.51)
     }

     // Schritt 4
     if(mec.step >= 4) {
        // g.use("nod",mec.K).label("K","se")
        //  .lin(mec.P.x, mec.P.y, mec.K.x, mec.K.y, {ls:"rgba(255, 255, 255, 0.7)"}).mark("tick",0.49).mark("tick",0.51)
     }

     // Schritt 6
     if(mec.step >= 6) {
        // g.use(pol,mec.Wnew).label("W","se")
        //  .lin(mec.Aw.x, mec.Aw.y, mec.Wnew.x, mec.Wnew.y, {ld:"@dot", ls:"rgba(255, 255, 255, 0.9)"})
        //  .lin(mec.Bw.x, mec.Bw.y, mec.Wnew.x, mec.Wnew.y, {ld:"@dot", ls:"rgba(255, 255, 255, 0.9)"})
        //  .beg({x: mec.Aw.x, y: mec.Aw.y, w:pi + Math.atan2(mec.e_A0A.y, mec.e_A0A.x)})
        //     .rec(0, 0, -8, 8, {lw:2, ls:"rgba(126, 126, 118, 0.9)", fs:"rgba(255, 255, 255, 0.6)"})
        //  .end()
        //  .beg({x: mec.Bw.x, y: mec.Bw.y, w:Math.atan2(mec.e_B0B.y, mec.e_B0B.x)})
        //     .rec(0, 0, 8, 8, {lw:2, ls:"rgba(126, 126, 118, 0.9)", fs:"rgba(255, 255, 255, 0.6)"})
        //  .end()

        // if (panel.getValue("alt. Wendepol (Schritt 6)"))
        // //    g.cir(mec.Walt.x, mec.Walt.y, 6, {fs:"red"}).label("Walt","se")  // alt. Wendepol (Schritt 6)
        // //     .cir(mec.Walt.x, mec.Walt.y, 2.5, {fs:"black"})
        //    g.use(pol2, mec.Walt).label("Walt","se")
        //     .dim(mec.Wnew, mec.Walt, {ls:"rgba(255, 255, 255, 0.9)"}).label(`${mec.WWaltLen.toFixed(2)}`, `mid`)
     }

     // Schritt 5
     if(mec.step >= 5) {
        // // var pos = 0.5*norm(v2.len(v2.dif(mec.Bw, mec.K)), 0, v2.len(v2.dif(mec.Aw, mec.K))); // halbe normalisierte Position von Bw auf KAw
        // g.use("nod",mec.Aw).label("Aw","se")
        //  .use("nod",mec.Bw).label("Bw","se")
        // if (v2.len(v2.dif(mec.K,mec.Aw)) >= v2.len(v2.dif(mec.Bw,mec.Aw))) {
        //    g.lin(mec.K.x, mec.K.y, mec.Aw.x, mec.Aw.y, {ls:"rgba(255, 255, 255, 0.8)"}).mark("tick",0.49).mark("tick",0.51);
        // } else {
        //    g.lin(mec.Bw.x, mec.Bw.y, mec.Aw.x, mec.Aw.y, {ls:"rgba(255, 255, 255, 0.8)"}).mark("tick",0.49).mark("tick",0.51);
        // }
     }


}

function render() {
    if (dirty) {
        position();
        world.exe(ctx);
        dirty = false;
    }
    requestAnimationFrame(render);
}

function updateOutput() {
    panel2.setValue("aktueller Schritt:", steps[mec.step]);
}

function norm(value, min, max) {
    return (value - min)/(max - min);
}

// cross product; takes objects with at least 2 dimensions and returns a 3d object
function cross(a,b) {
    var az = (a.z != 0) ? (a.z || 1) : 0,
        bz = (b.z != 0) ? (b.z || 1) : 0;

    return {x: a.y*bz - az*b.y , y: az*b.x - a.x*bz , z: a.x*b.y  -  a.y*b.x};
}

var cnv = document.getElementById('c'),
    ctx = cnv.getContext('2d'),
    width = cnv.width = window.innerWidth,
    height = cnv.height = window.innerHeight,

    pi = Math.PI,

    mec = {
        phi:0,
        a:100,
        b:200,
        c:Math.sqrt(300*300 + 200*200),
        d:300,
        e:-100,
        j:200, // lam nicht normalisiert
        k:100, // mu mnicht normalisiert

        step: 0,
        largenNum: 999999999,

        //######################################################################
        //#            Loesung
        //######################################################################

        // numerisch
        get rAB() {
            return v2.dif(mec.B,mec.A);
        },

        get lam() { // normalized j  // vectorial
            var rAB = mec.rAB;
            return v2.dot(rAB,mec.A1) / v2.sqr(rAB);
        },

        get mu() { // normalized k
            var rAB = mec.rAB;
            return v2.dot(v2.tilde(rAB),mec.A1) / v2.sqr(rAB);
        },
/*
        get lam() { // normalized j, alternative
            return norm(mec.j,0,mec.b);
        },
*/
        get A1() {  // entspricht rA0A1 und rAK
            return v2.dif(mec.K,mec.A);
        },

        get rB0B2() {
            return v2.dif(mec.K,mec.B);
        },

        get rA1C1() {
            return v2.isum(v2.scl(mec.A, mec.lam), v2.iscl(v2.tilde(mec.A), mec.mu));
        },

        get rB2C2() {
            var rBB0 = v2.dif(mec.B0,mec.B);

            return v2.isum(v2.scl(rBB0, mec.lam - 1), v2.iscl(v2.tilde(rBB0), mec.mu));
        },

        get C0() {  // entspricht rA0C0
            return v2.isum(v2.scl(mec.B0, mec.lam), v2.iscl(v2.tilde(mec.B0), mec.mu));
        },

        get B2() {
            return v2.sum(mec.B0,mec.rB0B2);
        },

        get C1() {
            return v2.sum(mec.A1,mec.rA1C1);
        },

        get C2() {
            return v2.sum(mec.B2,mec.rB2C2);
        },



/*
        // Schritt 1
        get r() {
            var frac = this.ephi.y/this.ephi.x;
            return (this.A0.y - this.B0.y + (this.B0.x - this.A0.x)*(frac))/(this.epsi.y - (frac*this.epsi.x));
        },

        get P() {
            return (v2.isum(v2.scl(this.epsi,this.r), this.B0));
        },

        // Schritt 2
        get k() {
            var frac = this.etheta.y/this.etheta.x;
            return (this.A.y - this.A0.y + (this.A0.x - this.A.x)*(frac))/(this.ealpha.y - (frac*this.ealpha.x));
        },

        get I() {
            return (v2.isum(v2.scl(this.ealpha,this.k), this.A0));
        },

        // Schritt 4
        get e_A0B0() {
            return (v2.iunit(v2.dif(this.B0, this.A0)));
        },

        get e_AB() {
            return (v2.iunit(v2.dif(this.B, this.A)));
        },

        get s() {
            var frac = this.e_A0B0.y/this.e_A0B0.x;
            return (this.P.y - this.A.y + (this.A.x - this.P.x)*frac)/(this.e_AB.y - (frac*this.e_AB.x));
        },

        get K() {
            return (v2.isum(v2.scl(this.e_AB,this.s), this.A));
        },

        // Schritt 5
        get e_PI() {
            return (v2.iunit(v2.dif(this.I, this.P)));
        },

        get e_A0A() {
            return (v2.unit(this.A));
        },

        get e_B0B() {
            return (v2.iunit(v2.dif(this.B, this.B0)));
        },

        // numerisches Problem bei phi=0° und phi=360° (innere Steglage). frac sowie this.A0.y sind dort geometriebedingt 0. Als Folge wird durch 0 geteilt (verfahrensbedingt)
        get t() {
            var frac = this.e_PI.y/this.e_PI.x;
            return (this.K.y - this.A0.y + (this.A0.x - this.K.x)*frac)/(this.e_A0A.y - (frac*this.e_A0A.x));
        },

        get Aw() {
            return (v2.isum(v2.scl(this.e_A0A,this.t), this.A0));
        },

        get u() {
            var frac = this.e_PI.y/this.e_PI.x;
            return (this.K.y - this.B0.y + (this.B0.x - this.K.x)*frac)/(this.e_B0B.y - (frac*this.e_B0B.x));
        },

        get Bw() {
            return (v2.isum(v2.scl(this.e_B0B,this.u), this.B0));
        },

        // Schritt 6
        get v() {
            var frac = - mec.e_A0A.x/mec.e_A0A.y;
            return (mec.Aw.y - mec.Bw.y + (mec.Bw.x - mec.Aw.x)*frac)/(mec.e_B0B.x + (frac*mec.e_B0B.y));
        },

        get W() {
            return (v2.isum(v2.iscl(v2.tilde(mec.e_B0B),mec.v), mec.Bw));
        },

        get Wnew() {
            var P1 =  v2.dif(mec.Aw,v2.iscl(v2.tilde(mec.e_A0A),-mec.largenNum)),
                P2 =  v2.dif(mec.Aw,v2.iscl(v2.tilde(mec.e_A0A),mec.largenNum)),
                P3 =  v2.dif(mec.Bw,v2.iscl(v2.tilde(mec.e_B0B),-mec.largenNum)),
                P4 =  v2.dif(mec.Bw,v2.iscl(v2.tilde(mec.e_B0B),mec.largenNum)),
                SP = cross(  cross(P1,P2),   cross(P3,P4) );
            SP;
            return {x: SP.x/SP.z, y: SP.y/SP.z};
        },

        // Wendekreis besser
        get rPW() {
            return v2.dif(mec.W,mec.P);
        },

        get center() {
            return v2.isum(v2.scl(mec.rPW,0.5),mec.P);
        },

        get radius() {
            return 0.5*v2.len(mec.rPW);
        },

        get WWaltLen() {
            return v2.len(v2.dif(mec.Walt,mec.W));
        },
*/


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
        },

        get K() {
            return {x: this.A.x + this.j*this.etheta.x - this.k*this.etheta.y, y: this.A.y + this.j*this.etheta.y + this.k*this.etheta.x};
        },

        get origin2() {
            return {x:mec.B0.x + 20, y: mec.A0.y};
        }
    },

    g = g2(),
    pol = g2().cir(0,0,6,{ls:"@nodcolor",fs:"rgba(255, 153, 0, 0.8)",lwnosc:true})
               .cir(0,0,2.5,{ls:"@nodcolor",fs:"@nodcolor"});
    pol2 = g2().cir(0,0,6,{ls:"@nodcolor",fs:"rgba(129, 165, 148, 1)",lwnosc:true})
               .cir(0,0,2.5,{ls:"@nodcolor",fs:"@nodcolor"});
    world = g2().clr().cartesian().style({foc:"white"})
                .rec(-width,-height,2*width,2*height,{ls:"rgba(52, 76, 107, 1)",fs:"rgba(52, 76, 107, 1)"})  // blueprint blue rgba(52, 76, 107, 1)
                .grid("rgba(255, 255, 255, 0.1)",100)
                .grid("rgba(255, 255, 255, 0.1)",20)
                .pan((width - (mec.a + mec.d))/2, (height - mec.c)/2)
                .use(g)
                .use("nodfix").label("A0","se"),

    dirty = true,

    steps = {
        0: "Zeichnerische Bestimmung der Ersatzgelenkvierecke nach Roberts.",
        1: "Übertragen der Kurbel-, Koppel- und Schwingenlänge a, b, c in dieser Reihenfolge eine gemeinsame Gerade (vollständige Strecklage).",
        2: "Errichten des Koppeldreiecks über der Koppellänge b.",
        3: "An den freien Enden von a und c jeweils eine parallele Gerade zu f und g antragen.",
        4: "Eine parallele Gerade zur Grundlinie durch die Spitze des Koppeldreiecks ziehen.",
        5: "Verlängern der Seiten f und g des Koppeldreiecks bis zu den äußeren Dreieckseiten.",
        6: "Rückübertrageung der gefundenen Gliedlängen der Ersatzviergelenke an das Ursprungsviergelenk."
    },

    panel = QuickSettings.create(10, 10, "Steuerung")
             .addImage("","http://www.fh-dortmund.de/images/logo.svg")
             .addProgressBar("Fortschritt", 6, mec.step, "numbers")
             .addButton("Schritt weiter ▶", function(value) { if(mec.step<6) {mec.step+=1; dirty = true; panel.setValue("Fortschritt", mec.step);} updateOutput();}) // ▶
             .addButton("Schritt zurück ◀", function(value) { if(mec.step>0) {mec.step-=1; dirty = true; panel.setValue("Fortschritt", mec.step);} updateOutput();}) // ◀
             .addBoolean("Ersatzviergelenk 1", false, function() {dirty = true;})
             .addBoolean("Ersatzviergelenk 2", false, function() {dirty = true;})
             .addRange("φ", 0, 500, mec.phi, 1, function(value) { mec.phi = value / 180 * pi; dirty = true;})
             .addNumber("a", 0, 500, mec.a, "any", function(value) { mec.a = value; dirty = true;})
             .addNumber("b", 0, 500, mec.b, "any", function(value) { mec.b = value; dirty = true;})  // "b", 0, 300, 150, 1
             .addNumber("c", 0, 500, mec.c, "any", function(value) { mec.c = value; dirty = true;})  // "c", 0, 300, 100, 1
             .addNumber("d (rein horizontal)", 0, 500, mec.d, 1, function(value) { mec.d = value; dirty = true;})
             .addNumber("e (rein vertikal)", -100, 100, mec.e, 1, function(value) { mec.e = value; dirty = true;})
             .addNumber("Posiiton Lot Koppeldreieck", 0, 500, mec.j, "any", function(value) { mec.j = value; dirty = true;})
             .addNumber("Höhe Koppeldreieck", 0, 500, mec.k, "any", function(value) { mec.k = value; dirty = true;})
            //  .saveInLocalStorage("roberts")
            //  .addButton("reset", function() {panel.setValuesFromJSON(defaultValues);})
    ,

    panel2 = QuickSettings.create(width - 310, 10, "Output")
             .addTextArea("aktueller Schritt:")
             .setWidth(300)
    ,

    defaultValues = panel.getValuesAsJSON();
;

/*
 *  Initialisierung
 */

// Animation starten
g2.State.linkfill = "transparent";
updateOutput();
render();