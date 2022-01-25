const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
let painting = false;

canvas.width = 400;
canvas.height = 400;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;



function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }

}

function handleColorChange(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}


Array.from(colors).forEach((color) => 
color.addEventListener("click", handleColorChange));