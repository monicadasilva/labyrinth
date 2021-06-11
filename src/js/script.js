let startBtn = document.getElementById("start");
startBtn.addEventListener("click", () => {
    let startPage = document.getElementById("startPage");
    startPage.style.display = "none";
    let winPage = document.getElementById("winPage")
    winPage.style.display = "none";
});

let restartbtn = document.getElementById("restart");
restartbtn.addEventListener("click", () => {

    location.reload()

});
const mapBox = document.getElementById("map-box")
let playerBox = document.getElementById("box")
// informaçãoes referentes ao player
let pStatus = {
    speed: 13,
    invincible: false,
    life: 5,
    width: playerBox.clientWidth,
    height: playerBox.clientHeight,
    x: 10,
    y: 388,
    face: 180,
}

// movimentação do mouse e atualização da direção em que o personagem olha
document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    pStatus.y += keyName === "ArrowDown" ? pStatus.speed : keyName === "ArrowUp" ? -pStatus.speed : 0;
    pStatus.x += keyName === "ArrowRight" ? pStatus.speed : keyName === "ArrowLeft" ? -pStatus.speed : 0;
    pStatus.face = keyName === "ArrowRight" ? 180 : keyName === "ArrowLeft" ? 0 : pStatus.face;
    updatePosition()

});

// mapa do labirinto
const map = [
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


// criada uma div que recebe class parede ou chão caso seja W ou !W 
let mapCreater = () => {
    // debugger;
    for (const row of map) {
        for (const column of row) {
            let newElem = document.createElement('div');
            newElem.className = "box"
            if (column === "W") {
                newElem.classList.add("wall");
            }
            if (column !== "W") {
                newElem.classList.add("floor");
            }
            mapBox.appendChild(newElem);
        }
    }
};
mapCreater();


//função que verifica a posição de x e y do player e do 
let playerCollision = (player, wall) => {
    let rangeA = (player.x + player.width / 2) - (wall.x + wall.width / 2);
    let rangeB = (player.y + player.height / 2) - (wall.y + wall.height / 2);

    let sumWidth = (player.width + wall.width) / 2;
    let sumHeight = (player.height + wall.height) / 2;

    if (Math.abs(rangeA) < sumWidth && Math.abs(rangeB) < sumHeight) {
        console.log(wall);
        if (wall.type === "wall") {
            let overLapA = sumWidth - Math.abs(rangeA);
            let overLapB = sumHeight - Math.abs(rangeB);
            if (overLapA > overLapB) {
                player.y = rangeB > 0 ? player.y + overLapB : player.y - overLapB;
            } else {
                player.x = rangeA > 0 ? player.x + overLapA : player.x - overLapA;
            }
        }
        if (wall.type === "enemy" && pStatus.invincible === false) {
            pStatus.life -= 1;
            if (pStatus.life === 0) {

                pStatus.invincible = true;
                setTimeout(() => {
                    pStatus.invincible = false;
                }, 1300)
            }
            if (pStatus.life <= 0 && pStatus.invincible === false) {
                location.reload();
            }
        }
        if (wall.type === "life") {
            let heart = document.getElementsByClassName("life")[0]
            heart.style.display = "none";
            pStatus.life = 3;

        }
        if (wall.type === "key") {
            let keyImg = document.getElementsByClassName("key")[0];
            let door = document.getElementsByClassName("door")[0];
            keyImg.style.display = "none";
            door.style.display = "none";
            door.className.remove("wall")
        }
        if (wall.type === "win") {
            mapBox.style.display = "none";
            let winPage = document.getElementById("winPage")
            winPage.style.display = "flex";
        }

    }
}
// função que busca as príedades das div's e adiciona uma chamada type
let getProperties = (arr, type) => arr.map(entinty => {
    let elem = entinty.getBoundingClientRect()
    elem.type = type;
    return elem
});


let life = [...document.getElementsByClassName("life")];
let lifeProperties = getProperties(life, "life")

let keys = [...document.getElementsByClassName("key")];
let keysProperties = getProperties(keys, "key")

let wins = [...document.getElementsByClassName("win")];
let winsProperties = getProperties(wins, "win")
console.log(winsProperties);


let updatePosition = () => {

    playerBox.style.top = pStatus.y + "px";
    playerBox.style.left = pStatus.x + "px";
    playerBox.style.transform = `rotate(${pStatus.face}deg)`
    if (pStatus.invincible) {
        playerBox.style.animation = "blink 1s ease-in-out infinite";
    } else {
        playerBox.style.animation = "none";
    }
    //variavel que recebe em um array todas as clases setadas como walls
    let walls = [...document.getElementsByClassName("wall")];
    let wallsProperties = getProperties(walls, "wall")

    //variavel que recebe em um array todas as clases setadas como enemy
    let enemys = [...document.getElementsByClassName("enemy")];
    let enemyProperties = getProperties(enemys, "enemy")


    let allProperties = [
        ...winsProperties,
        ...keysProperties,
        ...lifeProperties,
        ...enemyProperties,
        ...wallsProperties
    ];

    for (const wall of allProperties) {
        playerCollision(pStatus, wall)
    }

};