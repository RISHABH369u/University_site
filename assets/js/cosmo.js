const canvas=document.getElementById("cosmic-canvas");
const ctx=canvas.getContext("2d");
let w,h,stars=[];

function resize(){
w=canvas.width=window.innerWidth;
h=canvas.height=window.innerHeight;
stars=[];
for(let i=0;i<200;i++){
stars.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*2})
}
}

function draw(){
ctx.clearRect(0,0,w,h);
stars.forEach(s=>{
ctx.beginPath();
ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
ctx.fillStyle="white";
ctx.fill();
});
requestAnimationFrame(draw);
}

window.addEventListener("resize",resize);
resize();
draw();

function handlePost(){
alert("Your scholarly insight has been published!");
}

function toggleAppreciate(btn){
btn.classList.toggle("active");
}

function toggleComments(id){
const el=document.getElementById("comments-"+id);
el.style.display=el.style.display==="none"?"block":"none";
}

function submitComment(){
alert("Comment submitted for approval");
}
