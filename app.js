const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 400;

let painting = false;
let filling = false;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
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
    ctx.fillStyle = color;
}

function handleRange(event) {
    const range = event.target.value;
    ctx.lineWidth = range;
}

function handleMode(){
    if(filling === false){
        filling = true;
        mode.innerText = "paint";
    }
    else{
        filling = false;
        mode.innerText = "fill"
    }
}

function handleFillColor(){
    if(filling === true){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleContextMenu(event){
    event.preventDefault();
}

function handleSaveImage(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS.png";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleFillColor);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

if(colors){
    Array.from(colors).forEach((color) => 
    color.addEventListener("click", handleColorChange));
}

if(range){
    range.addEventListener("input", handleRange)
}

if(mode){
    mode.addEventListener("click", handleMode);
}

if(save){
    save.addEventListener("click", handleSaveImage);
}