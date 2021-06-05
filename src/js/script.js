'use strict';
const mapBox = document.getElementById("map-box")

const set = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

for (const linha of set) {
    for (const item of linha) {
        let newElem = document.createElement('div');
        newElem.innerHTML = item;
        newElem.className = "box"
        if(item === "W"){
            newElem.classList.add("wall");
        } 
        if(item !== "W"){
            newElem.classList.add("floor");
        }
        mapBox.appendChild(newElem);
    }
}


let pStatus = {
    speed: 5,
    vida: 20,
} 

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  boxTop += keyName === "ArrowDown" ? pStatus.speed : keyName === "ArrowUp" ? -pStatus.speed: 0;
  boxLeft+= keyName === "ArrowRight" ? pStatus.speed : keyName === "ArrowLeft" ? -pStatus.speed : 0;
  document.getElementById("box").style.top = boxTop + "px";
  document.getElementById("box").style.left = boxLeft + "px";

});

let boxTop = 200;
let boxLeft = 200;

let collision = (player,wall) =>{
    let rangeA = (player.x + player.width/2) - (wall.x + wall.width/2);
    let rangeB = (player.y + player.height/2) - (wall.y + wall.height/2);

    let sumWidth = (player.width + wall.width)/2;
    let sumHeight = (player.height + wall.height)/2;

    if(Math.abs(rangeA)<sumWidth && Math.abs(rangeB)<sumHeight){
        let overLapA = sumWidth - Math.abs(rangeA);
        let overLapB = sumHeight - Math.abs(rangeB);
        if(overLapA>overLapB){
            player.y = rangeB > 0 ?  player.y + overLapB : player.y - overLapB;
        }
        else{
            player.x = rangeA > 0 ?  player.x + overLapA : player.x - overLapA;
        }
    }

    // for (const i in set) {
    //     if(set[i]!== "W")
    // }
}