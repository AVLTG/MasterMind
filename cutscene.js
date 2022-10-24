var canvas = document.getElementById("myCanvas"); 
var c = canvas.getContext("2d");
canvas.width = 1150;
canvas.height = 550;
var size = canvas.width / 8;
var x = 0;
var goats = 0;
var g = 0.1; 
var fac = 0.7; 
var bouncex = canvas.width/2 + 350;
var bouncey = canvas.height/2-100;
var vx = -2;
var vy = 0;
var llamas = false;

function loading(){
    requestAnimationFrame(loading);
    x++
    if (goats != 3){
        c.font =  size + "px Impact";
        c.fillStyle = "black";
        c.textAlign = "center";
        c.fillText("Loading", canvas.width / 2 - 150 , canvas.height/2+ 50);
    }
    if (x == 150 && goats != 3){
        c.fillStyle = "black";
        c.beginPath();
        c.arc (canvas.width/2 + 150,canvas.height/2 , 25,0,Math.PI *2,true);
        c.fill();
    } else if (x == 300 && goats != 3){
        c.fillStyle = "black";
        c.beginPath();
        c.arc (canvas.width/2 + 250,canvas.height/2 , 25,0,Math.PI *2,true);
        c.fill();
    } else if (x == 450 && goats != 3){
        c.fillStyle = "black";
        c.beginPath();
        c.arc (canvas.width/2 + 350,canvas.height/2 , 25,0,Math.PI *2,true);
        c.fill();
    } else if (x == 500 && goats != 3){
        x=0
        goats++
        c.clearRect(0,0,canvas.width,canvas.height);

    } else if (goats == 3){
        vy += g; 
    
        bouncex += vx;
        bouncey += vy; 
    
        if (bouncey > canvas.height - 25){
            bouncey = canvas.height - 25;
            vy *= -fac;
        }
        if (bouncex >= -1 && bouncex <= 1 && llamas != true){
            cancelAnimationFrame(loading)
            llamas = true
            setTimeout(timegame, 1500);
        }
        drawBall();
    }
}
function drawBall() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath(); 
    c.strokeStyle = "white";
    c.strokeWidth = 15;
    c.fillStyle = "black";
    c.beginPath();
    c.arc(bouncex, bouncey, 25, 0, Math.PI*2, true);
    c.closePath();
    c.fill();
};
function timegame(){
    window.location.replace("page2.html");
}
loading()