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

}

function gtria() {
    triangle.del().clr().cartesian().style({foc:"white"})

    if (panel.getValue("Hilfsdreieck zeigen")) {
        // Schritt 1
        if(mec.step >= 1) {
            triangle.lin(mec.A0tria.x, mec.A0tria.y, mec.B0tria.x, mec.B0tria.y, {ls:"rgba(255, 255, 255, 0.8)"})
                        .label("a",norm(mec.A0tria.x + .5*mec.a, mec.A0tria.x, mec.B0tria.x))
                        .label("b",norm(mec.A0tria.x + mec.a + .5*mec.b, mec.A0tria.x, mec.B0tria.x))
                        .label("c",norm(mec.B0tria.x - .5*mec.c, mec.A0tria.x, mec.B0tria.x))
        }

        // Schritt 3
        if(mec.step >= 3 & mec.step != 6) {
            triangle.ply([mec.A0tria, mec.SP3tria, mec.B0tria],false, {fs:"rgba(200,200,200,0.2)", ls:"rgba(255, 255, 255, 0.8)"})
        }

        // Schritt 2
        if(mec.step >= 2) {
            var lenf = Math.sqrt(mec.j*mec.j + mec.k*mec.k),
                leng = Math.sqrt((mec.k*mec.k + (mec.j - mec.b)*(mec.j - mec.b)));

            triangle.ply([mec.Atria, mec.Ktria, mec.Btria],false, {fs:"rgba(200,200,200,0.5)", ls:"rgba(255, 255, 255, 0.8)"})
                        .label("f",norm(0.5*lenf, 0, lenf + leng), "left") 
                        .label("g",norm(lenf + 0.5*leng, 0, lenf + leng), "left")
        }


        // Schritt 4
        if(mec.step == 4) {
            triangle.lin(mec.SP41tria.x, mec.SP41tria.y, mec.SP42tria.x, mec.SP42tria.y, {ls:"rgba(255, 255, 255, 0.7)"})
        }

        // Schritt 5
        if(mec.step >= 5 & mec.step != 6) {
            triangle.ply([mec.SP41tria, mec.Ktria, mec.SP51tria],false, {fs:"rgba(200,100,100,0.5)", ls:"rgba(255, 255, 255, 0.8)"})
                    .ply([mec.SP42tria, mec.Ktria, mec.SP52tria],false, {fs:"rgba(100,200,100,0.5)", ls:"rgba(255, 255, 255, 0.8)"})
        } 

        // Schritt 6
        if(mec.step == 6) {
            triangle.ply([mec.A0tria, mec.SP3tria, mec.B0tria],false, {fs:"rgba(200,200,200,0.2)", ls:"transparent"})
                    .ply([mec.SP41tria, mec.Ktria, mec.SP51tria],true, {fs:"rgba(200,100,100,0.5)", ls:"rgba(200,100,100,1)"})
                    .ply([mec.SP42tria, mec.Ktria, mec.SP52tria],true, {fs:"rgba(100,200,100,0.5)", ls:"rgba(100,200,100,1)"})
                    .lin(mec.A0tria.x, mec.A0tria.y, mec.SP3tria.x, mec.SP3tria.y, {lw:2, ls:"rgba(200,100,100,1)"})
                    .lin(mec.B0tria.x, mec.B0tria.y, mec.SP3tria.x, mec.SP3tria.y, {lw:2, ls:"rgba(100,200,100,1)"})              
        } 
    }

    // render
    triangle.exe(ctx2);
    
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
    cnv2 = document.getElementById('c2'),
    ctx2 = cnv2.getContext('2d'),
    width = cnv.width = cnv2.width = window.innerWidth,
    height = cnv.height = cnv2.height = window.innerHeight,

    pi = Math.PI,

    mec = {
        phi:0,
        a:100,
        b:200,
        c:360, // Math.sqrt(300*300 + 200*200),
        d:300,
        e:-100,
        j:200, // lam nicht normalisiert
        k:100, // mu mnicht normalisiert

        step: 0,
        largeNum: 999999999,

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


        //######################################################################
        //#            Dreieck
        //######################################################################

        get A0tria() {
            return v2(mec.origintria.x, mec.origintria.y)
        },

        get B0tria() {
            return v2(mec.origintria.x + mec.a + mec.b + mec.c, mec.origintria.y)
        },
        
        get Atria() {
            return v2(mec.origintria.x + mec.a, mec.origintria.y)
        },

        get Btria() {
            return v2(mec.origintria.x + mec.a + mec.b, mec.origintria.y)
        },

        // Schritt 2
        get Ktria() {
            return v2(mec.origintria.x + mec.a + mec.j, mec.origintria.y + mec.k)
        },

        // Schritt 3
        get eAKtria() {
            return v2.iunit(v2.dif(mec.Ktria, mec.Atria));
        },

        get eBKtria() {
            return v2.iunit(v2.dif(mec.Ktria, mec.Btria));
        },

        get SP3tria() {
            var P1 =  mec.A0tria,
                P2 =  v2.isum(v2.scl(mec.eAKtria, mec.largeNum), mec.A0tria),
                P3 =  mec.B0tria,
                P4 =  v2.isum(v2.scl(mec.eBKtria, mec.largeNum), mec.B0tria),
                SP = cross(  cross(P1,P2),   cross(P3,P4) );

            return {x: SP.x/SP.z, y: SP.y/SP.z};
        },

        // Schritt 4
        get SP41tria() {
            var P1 =  mec.A0tria,
                P2 =  v2.isum(v2.scl(mec.eAKtria, mec.largeNum), mec.A0tria),
                P3 =  v2(- mec.largeNum, mec.Ktria.y),
                P4 =  v2(  mec.largeNum, mec.Ktria.y),
                SP = cross(  cross(P1,P2),   cross(P3,P4) );

            return {x: SP.x/SP.z, y: SP.y/SP.z};
        },

        get SP42tria() {
            var P1 =  mec.B0tria,
                P2 =  v2.isum(v2.scl(mec.eBKtria, mec.largeNum), mec.B0tria),
                P3 =  v2(- mec.largeNum, mec.Ktria.y),
                P4 =  v2(  mec.largeNum, mec.Ktria.y),
                SP = cross(  cross(P1,P2),   cross(P3,P4) );

            return {x: SP.x/SP.z, y: SP.y/SP.z};
        },

        // Schritt 5
        get SP51tria() {
            var P1 =  mec.A0tria,
                P2 =  v2.isum(v2.scl(mec.eAKtria, mec.largeNum), mec.A0tria),
                P3 =  mec.Ktria,
                P4 =  v2.isum(v2.scl(mec.eBKtria, mec.largeNum), mec.Ktria),
                SP = cross(  cross(P1,P2),   cross(P3,P4) );

            return {x: SP.x/SP.z, y: SP.y/SP.z};
        },

        get SP52tria() {
            var P1 =  mec.B0tria,
                P2 =  v2.isum(v2.scl(mec.eBKtria, mec.largeNum), mec.B0tria),
                P3 =  mec.Ktria,
                P4 =  v2.isum(v2.scl(mec.eAKtria, mec.largeNum), mec.Ktria),
                SP = cross(  cross(P1,P2),   cross(P3,P4) );

            return {x: SP.x/SP.z, y: SP.y/SP.z};
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
        },

        get K() {
            return {x: this.A.x + this.j*this.etheta.x - this.k*this.etheta.y, y: this.A.y + this.j*this.etheta.y + this.k*this.etheta.x};
        },

        get origintria() {
            var scale = (mec.j<=mec.b)?1:mec.lam;
            return {x: width - 20 - (   scale*(mec.a + mec.b + mec.c)   ), y: (height - mec.c)/2};
        }
    },

    g = g2(),
    triangle = g2(),
    pol = g2().cir(0,0,6,{ls:"@nodcolor",fs:"rgba(255, 153, 0, 0.8)",lwnosc:true})
               .cir(0,0,2.5,{ls:"@nodcolor",fs:"@nodcolor"});
    pol2 = g2().cir(0,0,6,{ls:"@nodcolor",fs:"rgba(129, 165, 148, 1)",lwnosc:true})
               .cir(0,0,2.5,{ls:"@nodcolor",fs:"@nodcolor"});
    world = g2().clr().cartesian().style({foc:"white"})
                .rec(-width,-height,2*width,2*height,{ls:"rgba(52, 76, 107, 1)",fs:"rgba(52, 76, 107, 1)"})  // blueprint blue rgba(52, 76, 107, 1)
                .grid("rgba(255, 255, 255, 0.1)",100)
                .grid("rgba(255, 255, 255, 0.1)",20)
                .pan((width - 2*(mec.a + mec.d))/2, (height - mec.c)/2)
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

             .addButton("Schritt weiter ▶", function(value) { if(mec.step<6) {mec.step+=1;  gtria();  panel.setValue("Fortschritt", mec.step);} updateOutput();}) // ▶
             .addButton("Schritt zurück ◀", function(value) { if(mec.step>0) {mec.step-=1;  gtria();  panel.setValue("Fortschritt", mec.step);} updateOutput();}) // ◀

             .addBoolean("Ersatzviergelenk 1", false, function() {dirty = true;})
             .addBoolean("Ersatzviergelenk 2", false, function() {dirty = true;})
             .addBoolean("Hilfsdreieck zeigen", true, function() {gtria();})

             .addRange("φ", 0, 360, mec.phi, 1, function(value) { mec.phi = value / 180 * pi; dirty = true;})

             .addNumber("a", 0, 500, mec.a, "any", function(value) { mec.a = value; dirty = true; gtria();})
             .addNumber("b", 0, 500, mec.b, "any", function(value) { mec.b = value; dirty = true; gtria();})  // "b", 0, 300, 150, 1
             .addNumber("c", 0, 500, mec.c, "any", function(value) { mec.c = value; dirty = true; gtria();})  // "c", 0, 300, 100, 1
             .addNumber("d (rein horizontal)", 0, 500, mec.d, 1, function(value) { mec.d = value; dirty = true; gtria();})
             .addNumber("e (rein vertikal)", -100, 100, mec.e, 1, function(value) { mec.e = value; dirty = true; gtria();})
             .addNumber("Posiiton Lot Koppeldreieck", 0, 500, mec.j, "any", function(value) { mec.j = value; dirty = true; gtria();})
             .addNumber("Höhe Koppeldreieck", 0, 500, mec.k, "any", function(value) { mec.k = value; dirty = true; gtria();})
            //  .saveInLocalStorage("roberts")
            //  .addButton("reset", function() {panel.setValuesFromJSON(defaultValues);})
    ,

    panel2 = QuickSettings.create(width - 310, 10, "Output")
             .addTextArea("aktueller Schritt:")
             .setWidth(300)
    

    // defaultValues = panel.getValuesAsJSON();
;

/*
 *  Initialisierung
 */

// Animation starten
g2.State.linkfill = "transparent";
updateOutput();
render();