function position() {
    g.del().style({foc:"white"})

    if (panel.getValue("Wendekreis anzeigen"))
        g.cir(mec.center.x, mec.center.y, mec.radius, {ls:"orange"})

    if (panel.getValue("alt. Wendekreis anzeigen"))
        g.cir(mec.centeralt.x, mec.centeralt.y, mec.radiusalt, {ls:"rgba(129, 165, 148, 1)"}) // alternativer Wendekreis

     // Schritt 1
     if(mec.step >= 1) {
        g.use("pol",mec.P).label("P","n")
         .lin(mec.A0.x - 2*width*mec.ephi.x, mec.A0.y - 2*width*mec.ephi.y, mec.A0.x + 2*width*mec.ephi.x, mec.A0.y + 2*width*mec.ephi.y, {ld:"@dashdot", ls:"rgba(255, 255, 255, 0.5)"})
         .lin(mec.B0.x - 2*width*mec.epsi.x, mec.B0.y - 2*width*mec.epsi.y, mec.B0.x + 2*width*mec.epsi.x, mec.B0.y + 2*width*mec.epsi.y, {ld:"@dashdot", ls:"rgba(255, 255, 255, 0.5)"})         
     }

     // Schritt 2
     if(mec.step >= 2) {
        g.use("nod",mec.I).label("I","se")
         .lin(mec.A.x - 2*width*mec.etheta.x, mec.A.y - 2*width*mec.etheta.y, mec.A.x + 2*width*mec.etheta.x, mec.A.y + 2*width*mec.etheta.y, {ld:"@dash", ls:"rgba(255, 255, 255, 0.5)"})
        if (mec.I.x < mec.A0.x || mec.I.x > mec.B0.x) {
            g.lin(mec.B0.x, mec.B0.y, mec.I.x, mec.I.y, {ld:"@dash", ls:"rgba(255, 255, 255, 0.5)"})  
        } else {
            g.lin(mec.B0.x, mec.B0.y, mec.A0.x, mec.A0.y, {ld:"@dash", ls:"rgba(255, 255, 255, 0.5)"}) 
        }
     }

     // Schritt 3
     if(mec.step >= 3) {
        g.lin(mec.I.x, mec.I.y, mec.P.x, mec.P.y, {ls:"rgba(255, 255, 255, 0.6)"}).mark("tick",0.49).mark("tick",0.51)    
     }

     // Schritt 4
     if(mec.step >= 4) {
        g.use("nod",mec.K).label("K","se")
         .lin(mec.P.x, mec.P.y, mec.K.x, mec.K.y, {ls:"rgba(255, 255, 255, 0.7)"}).mark("tick",0.49).mark("tick",0.51) 
     }

     // Schritt 6
     if(mec.step >= 6) {
        g.use(pol,mec.W).label("W","se")
         .lin(mec.Aw.x, mec.Aw.y, mec.W.x, mec.W.y, {ld:"@dot", ls:"rgba(255, 255, 255, 0.9)"})
         .lin(mec.Bw.x, mec.Bw.y, mec.W.x, mec.W.y, {ld:"@dot", ls:"rgba(255, 255, 255, 0.9)"})
         .beg({x: mec.Aw.x, y: mec.Aw.y, w:pi + Math.atan2(mec.e_A0A.y, mec.e_A0A.x)})
            .rec(0, 0, -8, 8, {lw:2, ls:"rgba(126, 126, 118, 0.9)", fs:"rgba(255, 255, 255, 0.6)"})
         .end()
         .beg({x: mec.Bw.x, y: mec.Bw.y, w:Math.atan2(mec.e_B0B.y, mec.e_B0B.x)})
            .rec(0, 0, 8, 8, {lw:2, ls:"rgba(126, 126, 118, 0.9)", fs:"rgba(255, 255, 255, 0.6)"})
         .end()

        if (panel.getValue("alt. Wendepol (Schritt 6)"))
        //    g.cir(mec.Walt.x, mec.Walt.y, 6, {fs:"red"}).label("Walt","se")  // alt. Wendepol (Schritt 6)
        //     .cir(mec.Walt.x, mec.Walt.y, 2.5, {fs:"black"})
           g.use(pol2, mec.Walt).label("Walt","se")
            .dim(mec.W, mec.Walt, {ls:"rgba(255, 255, 255, 0.9)"}).label(`${mec.WWaltLen.toFixed(2)}`, `mid`)
     }

     // Schritt 5
     if(mec.step >= 5) {
        // var pos = 0.5*norm(v2.len(v2.dif(mec.Bw, mec.K)), 0, v2.len(v2.dif(mec.Aw, mec.K))); // halbe normalisierte Position von Bw auf KAw
        g.use("nod",mec.Aw).label("Aw","se")
         .use("nod",mec.Bw).label("Bw","se")
         .lin(mec.K.x, mec.K.y, mec.Aw.x, mec.Aw.y, {ls:"rgba(255, 255, 255, 0.8)"}).mark("tick",0.49).mark("tick",0.51) 
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

function updateOutput() {
    panel2.setValue("aktueller Schritt:", steps[mec.step]);
}

function norm(value, min, max) {  
    return (value - min)/(max - min);
}

var cnv = document.getElementById('c'),
    ctx = cnv.getContext('2d'),
    width = cnv.width = window.innerWidth,
    height = cnv.height = window.innerHeight,

    pi = Math.PI,

    mec = {
        phi:60*pi/180,
        a:45,
        b:120,
        c:130,
        d:200,
        e:0,

        step: 0,

        //######################################################################
        //#            Loesung
        //######################################################################

        // Schritt 1
        get r() {
            var frac = this.ephi.y/this.ephi.x;
            return (this.A0.y - this.B0.y + (this.B0.x - this.A0.x)*(frac))/(this.epsi.y - (frac*this.epsi.x));
        },

        get P() {
            return (v2.isum(v2.scl(this.epsi,this.r), this.B0));
        },
        
        // get P() {
        //     return  {x: this.B0.x + this.r*this.epsi.x, y:this.B0.y + this.r*this.epsi.y};
        // },

        // Schritt 2
        get k() {
            var frac = this.etheta.y/this.etheta.x;
            return (this.A.y - this.A0.y + (this.A0.x - this.A.x)*(frac))/(this.ealpha.y - (frac*this.ealpha.x));
        },

        get I() {
            return (v2.isum(v2.scl(this.ealpha,this.k), this.A0));
        },

        // get I() {
        //     return {x: this.A0.x + this.k*this.ealpha.x, y:this.A0.y + this.k*this.ealpha.y};
        // },
        
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

        // get K() {
        //     return {x: this.A.x + this.s*this.e_AB.x, y:this.A.y + this.s*this.e_AB.y};
        // },

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

        // get Aw() {
        //     return {x: this.A0.x + this.t*this.e_A0A.x, y:this.A0.y + this.t*this.e_A0A.y};
        // },

        get u() {
            var frac = this.e_PI.y/this.e_PI.x;
            return (this.K.y - this.B0.y + (this.B0.x - this.K.x)*frac)/(this.e_B0B.y - (frac*this.e_B0B.x));
        },

        get Bw() {
            return (v2.isum(v2.scl(this.e_B0B,this.u), this.B0));
        },

        // get Bw() {
        //     return {x: this.B0.x + this.u*this.e_B0B.x, y:this.B0.y + this.u*this.e_B0B.y};
        // },

        // Schritt 6
        get v() {
            var frac = - this.e_A0A.x/this.e_A0A.y;
            return (this.Aw.y - this.Bw.y + (this.Bw.x - this.Aw.x)*frac)/(this.e_B0B.x + (frac*this.e_B0B.y));
        },

        get W() {
            return (v2.isum(v2.iscl(v2.tilde(this.e_B0B),this.v), this.Bw));
        },

        // get W() {
        //     return {x: this.Bw.x + this.v*v2.tilde(this.e_B0B).x, y:this.Bw.y + this.v*v2.tilde(this.e_B0B).y};
        // },

        // Wendekreis zu (umständlich)
  /*      get G1() {
            return ((v2.dif(this.P, this.Aw))); //+++++++++
        },

        get G2() {
            return ((v2.dif(this.P, this.Bw))); //+++++++++
        },

        get e_G1() {
            return (v2.unit(this.G1));
        },

        get e_G2() {
            return (v2.unit(this.G2));
        },

        get H1() {
            return (v2.isum(v2.scl(this.e_G1, 0.5*(v2.len(this.G1))), this.Aw));
        },

        // get H1() {
        //     return {x: this.Aw.x + 0.5*(v2.len(this.G1))*this.e_G1.x, y:this.Aw.y + 0.5*(v2.len(this.G1))*this.e_G1.y};
        // },

        get H2() {
            return (v2.isum(v2.scl(this.e_G2, 0.5*(v2.len(this.G2))), this.Bw));
        },

        // get H2() {
        //     return {x: this.Bw.x + 0.5*(v2.len(this.G2))*this.e_G2.x, y:this.Bw.y + 0.5*(v2.len(this.G2))*this.e_G2.y};
        // },

        get w() {
            var frac = - this.e_G1.x/this.e_G1.y;
            return (this.H1.y - this.H2.y + (this.H2.x - this.H1.x)*frac)/(this.e_G2.x + (frac*this.e_G2.y));
        },

        get center() {
            return (v2.isum(v2.iscl(v2.tilde(this.e_G2),this.w), this.H2));
        },

        // get center() {
        //     return {x: this.H2.x + this.w*v2.tilde(this.e_G2).x, y:this.H2.y + this.w*v2.tilde(this.e_G2).y};
        // },

        get radius() {
            return (v2.len(v2.dif(this.center, this.Aw)));
        },
*/
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

        //######################################################################
        //#            alternativer Wendekreis
        //######################################################################

        get rPWalt() {
            return v2.dif(mec.Walt,mec.P);
        },

        get centeralt() {
            return v2.isum(v2.scl(mec.rPWalt,0.5),mec.P);
        },

        get radiusalt() {
            return 0.5*v2.len(mec.rPWalt);
        },

        //######################################################################
        //#            Wendepol nach Gl. 9.5
        //######################################################################

        get rPA() {
            return v2.dif(mec.A, mec.P); //x
        },

        get rPB() {
            return v2.dif(mec.B, mec.P); //x
        },

        get rBB0() {
            return v2.dif(mec.B0, mec.B); //x
        },

        get rAA0() {
            return v2.dif(mec.A0, mec.A); //x
        },

        get Walt() {
            var rPArPA = v2.dot(mec.rPA,mec.rPA), //x
                rPBrPB = v2.dot(mec.rPB,mec.rPB),
                frac = 1 / v2.perp(mec.rPA,mec.rPB),
                scalar1 = rPBrPB * ((rPBrPB / v2.dot(mec.rBB0,mec.rPB)) + 1),
                scalar2 = rPArPA * ((rPArPA / v2.dot(mec.rAA0,mec.rPA)) + 1);

            // console.log(`rPArPA: ${rPArPA}\nrPBrPB: ${rPBrPB}\nfrac: ${frac}\nscalar1: ${scalar1}\nscalar2: ${scalar2}`);
                
            return v2.scl( v2.dif( v2.iscl( v2.tilde(mec.rPA), scalar1), v2.iscl( v2.tilde(mec.rPB), scalar2) ),frac);
        },



        // test ohne v2 = exakt das selbe!
        get rPA2() {
            return {x: mec.A.x - mec.P.x, y:mec.A.y - mec.P.y};
        },

        get rPB2() {
            return {x: mec.B.x - mec.P.x, y:mec.B.y - mec.P.y};
        },

        get rBB02() {
            return {x: mec.B0.x - mec.B.x, y:mec.B0.y - mec.B.y};
        },

        get rAA02() {
            return {x: mec.A0.x - mec.A.x, y:mec.A0.y - mec.A.y};
        },

        get rPArPA2() {
            return mec.rPA.x*mec.rPA.x + mec.rPA.y*mec.rPA.y;
        },

        get rPBrPB2() {
            return mec.rPB.x*mec.rPB.x + mec.rPB.y*mec.rPB.y;
        },

        get frac2() {
            return 1 / ( - mec.rPA2.y*mec.rPB2.x + mec.rPA2.x*mec.rPB2.y );
        },

        get scalar12() {
            return mec.rPBrPB2 * ((mec.rPBrPB2 / ( mec.rBB02.x*mec.rPB2.x + mec.rBB02.y*mec.rPB2.y )  ) + 1);
        },

        get scalar22() {
            return mec.rPArPA2 * ((mec.rPArPA2 /  ( mec.rAA02.x*mec.rPA2.x + mec.rAA02.y*mec.rPA2.y ) ) + 1);
        },

        get Walt2() {                
            return {x: mec.frac*(mec.scalar12*(-mec.rPA2.y) - mec.scalar22*(-mec.rPB2.y) ), y: mec.frac*(mec.scalar12*(mec.rPA2.x) - mec.scalar22*(mec.rPB2.x) )};
        },

        // Variablen ausgelagert
        // get rPArPA() {
        //     return v2.dot(mec.rPA,mec.rPA); //x
        // },

        // get rPBrPB() {
        //     return v2.dot(mec.rPB,mec.rPB);
        // },

        // get frac() {
        //     return 1 / v2.perp(mec.rPA,mec.rPB);
        // },

        // get scalar1() {
        //     return mec.rPBrPB * ((mec.rPBrPB / v2.dot(mec.rBB0,mec.rPB)) + 1);
        // },

        // get scalar2() {
        //     return mec.rPArPA * ((mec.rPArPA / v2.dot(mec.rAA0,mec.rPA)) + 1);
        // },

        // get Walt_simple() {                
        //     return v2.scl(   v2.dif(     v2.scl(   v2.tilde(mec.rPA), mec.scalar1)    ,     v2.scl(v2.tilde(mec.rPB), mec.scalar2)   )                  ,mec.frac)   ;  // nach bugfix iscl nutzbar
        // },

        get WWaltLen() {
            return v2.len(v2.dif(mec.Walt,mec.W));
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
                .use("gnd").label("A0","se"),

    dirty = true,

    steps = {
        0: "Bekannt ist die Lage zweier Punkte (A, B) eines Gliedes, sowie deren Krümmungsmittelpunkte A\u2080 und B\u2080",
        1: "Ermittlung des Momentanpols P im Schnittpunkt der Geraden AA\u2080 und BB\u2080.",
        2: "Bestimmung des Relativpols I zwischen Kurbel und Schwinge im Schnittpunkt der Geraden AB und A\u2080B\u2080",
        3: "Festlegung der Kollineationsachse als Gerade durch P und I.",
        4: "Die Parallele zu A\u2080B\u2080 durch P liefert im Schnittpunkt mit AB den Hilfspunkt K.",
        5: "Die Parallele zu PI durch diesen Hilfspunkt K schneidet die Gerade AA\u2080 in Aw und die Gerade BB\u2080 in Bw. Aw und Bw liegen beide auf dem Wendekreis.",
        6: "Die Senkrechten in Aw zu AA\u2080 und in Bw zu BB\u2080 schneiden sich im Wendepol W."
    },

    panel = QuickSettings.create(10, 10, "Steuerung")
             .addImage("","http://www.fh-dortmund.de/images/logo.svg")
             .addProgressBar("Fortschritt", 6, mec.step, "numbers")
             .addButton("Schritt weiter ▶", function(value) { if(mec.step<6) {mec.step+=1; dirty = true; panel.setValue("Fortschritt", mec.step);} updateOutput();}) // ▶
             .addButton("Schritt zurück ◀", function(value) { if(mec.step>0) {mec.step-=1; dirty = true; panel.setValue("Fortschritt", mec.step);} updateOutput();}) // ◀
             .addBoolean("Wendekreis anzeigen", false, function() {dirty = true;})
             .addBoolean("alt. Wendekreis anzeigen", false, function() {dirty = true;})
             .addBoolean("alt. Wendepol (Schritt 6)", false, function() {dirty = true;})
             .addRange("φ", 0, 360, 60, 1, function(value) { mec.phi = value / 180 * pi; dirty = true;})
             .addNumber("a", 0, 300, 45, 1, function(value) { mec.a = value; dirty = true;})
             .addNumber("b", 0, 300, 120, 1, function(value) { mec.b = value; dirty = true;})  // "b", 0, 300, 150, 1
             .addNumber("c", 0, 300, 130, 1, function(value) { mec.c = value; dirty = true;})  // "c", 0, 300, 100, 1
             .addNumber("d (rein horizontal)", 0, 300, 200, 1, function(value) { mec.d = value; dirty = true;})
             .addNumber("e (rein vertikal)", -100, 100, 0, 1, function(value) { mec.e = value; dirty = true;}),

    panel2 = QuickSettings.create(width - 310, 10, "Output")
             .addTextArea("aktueller Schritt:")
             .setWidth(300)
;

/*
 *  Initialisierung
 */

// Animation starten
updateOutput();
render();