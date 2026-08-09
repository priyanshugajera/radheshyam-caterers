/* ==========================================================
contact.js
Part 10.3 - WhatsApp Form + GSAP + Validation
==========================================================*/
document.addEventListener("DOMContentLoaded",()=>{

if(typeof gsap!=="undefined"){
 gsap.from("#contact .glass-card",{x:-80,opacity:0,duration:1,scrollTrigger:{trigger:"#contact",start:"top 75%"}});
 gsap.from("#contactForm",{x:80,opacity:0,duration:1,scrollTrigger:{trigger:"#contact",start:"top 75%"}});
 gsap.to(".icon",{y:-6,repeat:-1,yoyo:true,stagger:.15,duration:1.8,ease:"sine.inOut"});
}

const form=document.getElementById("contactForm");
if(!form) return;

form.addEventListener("submit",function(e){
 e.preventDefault();

 const name=document.getElementById("name").value.trim();
 const mobile=document.getElementById("mobile").value.trim();
 const date=document.getElementById("date").value;
 const event=document.getElementById("event").value;
 const guest=document.getElementById("guest").value.trim();
 const location=document.getElementById("location").value.trim();
 const message=document.getElementById("message").value.trim();

 if(name.length<2){
   alert("Please enter your name.");
   return;
 }

 if(!/^[6-9]\d{9}$/.test(mobile)){
   alert("Please enter a valid 10 digit mobile number.");
   return;
 }

 const text=`🙏 Hello Radhe Shyam Caterers

📌 New Catering Inquiry

👤 Name : ${name}
📱 Mobile : ${mobile}
📅 Event Date : ${date}
🎉 Event : ${event}
👥 Guests : ${guest}
📍 Location : ${location}

📝 Message :
${message}

Please contact me.
Thank You.`;

 const url="https://wa.me/918347760121?text="+encodeURIComponent(text);

 const btn=form.querySelector(".sendBtn");
 if(btn && typeof gsap!=="undefined"){
   gsap.fromTo(btn,{scale:1},{scale:.94,yoyo:true,repeat:1,duration:.12});
 }

 window.open(url,"_blank");
});

});