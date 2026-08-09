/* =====================================================
 particles.js
 Radhe Shyam Caterers
 Gold Dust Particle Engine (Canvas Foundation)
===================================================== */

class GoldDustEngine{
    constructor(canvasId="goldDust"){
        this.canvas=document.getElementById(canvasId);
        if(!this.canvas) return;

        this.ctx=this.canvas.getContext("2d");
        this.mouse={x:-9999,y:-9999};
        this.particles=[];
        this.resize();

        window.addEventListener("resize",()=>this.resize());

        window.addEventListener("mousemove",(e)=>{
            this.mouse.x=e.clientX;
            this.mouse.y=e.clientY;
        });

        this.createParticles();
        this.animate();
    }

    resize(){
        this.w=this.canvas.width=window.innerWidth;
        this.h=this.canvas.height=window.innerHeight;
    }

    createParticles(){
        this.particles=[];
        const total=Math.min(320,Math.max(140,Math.floor((this.w*this.h)/12000)));

        for(let i=0;i<total;i++){
            this.particles.push({
                x:Math.random()*this.w,
                y:Math.random()*this.h,
                r:Math.random()*2.5+.3,
                vx:(Math.random()-.5)*.15,
                vy:-(Math.random()*.5+.15),
                alpha:Math.random()*.8+.2,
                glow:Math.random()*12+6
            });
        }
    }

    draw(p){
        const g=this.ctx.createRadialGradient(
            p.x,p.y,0,
            p.x,p.y,p.glow
        );

        g.addColorStop(0,"rgba(255,245,180,"+p.alpha+")");
        g.addColorStop(.45,"rgba(212,175,55,"+(p.alpha*.75)+")");
        g.addColorStop(1,"rgba(212,175,55,0)");

        this.ctx.beginPath();
        this.ctx.fillStyle=g;
        this.ctx.arc(p.x,p.y,p.glow,0,Math.PI*2);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.fillStyle="rgba(255,235,170,"+p.alpha+")";
        this.ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        this.ctx.fill();
    }

    update(p){

        const dx=this.mouse.x-p.x;
        const dy=this.mouse.y-p.y;
        const d=Math.sqrt(dx*dx+dy*dy);

        if(d<140){
            const force=(140-d)/140;
            p.x-=dx*force*.02;
            p.y-=dy*force*.02;
        }

        p.x+=p.vx;
        p.y+=p.vy;

        if(p.y<-20){
            p.y=this.h+20;
            p.x=Math.random()*this.w;
        }

        if(p.x<-20)p.x=this.w+20;
        if(p.x>this.w+20)p.x=-20;
    }

    animate(){
        this.ctx.clearRect(0,0,this.w,this.h);

        for(const p of this.particles){
            this.update(p);
            this.draw(p);
        }

        requestAnimationFrame(()=>this.animate());
    }
}

window.addEventListener("DOMContentLoaded",()=>{
    new GoldDustEngine();
});
