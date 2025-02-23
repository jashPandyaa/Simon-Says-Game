let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;

let h3 = document.querySelector("h3");

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("Game is started");
        started = true; 

        levelUp();
    }
});

document.addEventListener("click", function () {
    if (started == false) {
        console.log("Game is started");
        started = true;

        levelUp();
    }
});

document.addEventListener("touchstart", function (event) {
    if (started == false) {
        event.preventDefault(); // Prevent default touch behavior
        console.log("Game is started (touch)");
        started = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250)
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250)
}

function levelUp(){
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;


    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){ 
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,750);
        }
    }else{
        h3.innerHTML = (`Game Over! Your score was <b>${level}</b>.<br>Press any key to start again`);
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "wheat";
        },250);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1); 
}

let allbtns = document.querySelectorAll(".btn");

for(let btn of allbtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq  = [];
    userSeq = [];
    level = 0;
}
