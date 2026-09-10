let boxes = document.querySelectorAll(".case button");
let restart = document.getElementById('restart');
let message = document.getElementById('message');

console.log(boxes);
let result = [];
let oTurn = true;
let xTurn = false;
let oPlayedBoxes = [];
let xPlayedBoxes = [];
let winnerMessage = "";
let turnMessage = "";
let endGame = false;
let gameResult = [];
let newGameResult = [];
let gameBeginner = "";

boxes.forEach( box => {
    // message.textContent = (endGame && gameBeginner === "x") ? "Tour de O" : "Tour de X";
    box.addEventListener("click", () => {

        if (box.innerText === "" && oTurn && !oPlayedBoxes.includes(Number(box.id)) && !endGame) {
            box.textContent = "O";
            oTurn = false;
            xTurn = true;
            oPlayedBoxes.push(Number(box.id));
            turnMessage = "Tour de X";
            if (gameBeginner === "") gameBeginner = "o";
        }
        if (box.innerText === "" && xTurn && !xPlayedBoxes.includes(Number(box.id)) && !endGame) {
            box.textContent = "X";
            xTurn = false;
            oTurn = true;
            xPlayedBoxes.push(Number(box.id));
            turnMessage = "Tour de O";
            if (gameBeginner === "") gameBeginner = "x";
        }

        gameResult = getResult(oPlayedBoxes, xPlayedBoxes);
        newGameResult = getOtherResult(gameResult);
        console.log(newGameResult);

        if (gameResult.length === 0) {
            message.innerText = turnMessage;
        }
        if (gameResult.length === 1) {
            message.innerText = gameResult[0];
        }

        if (newGameResult.length >= 2) {
            message.innerText = gameResult[0];
            gameResult[2].forEach( boxId => {
                boxes[boxId - 1].style.backgroundColor = "red";
            });
            gameResult[1].forEach( boxId => {
                boxes[boxId - 1].style.backgroundColor = "red";
            });
            // gameBeginner = (gameBeginner === "x") ? "";
            endGame = true;
        }

    });
});

restart.addEventListener("click", () => {
    console.log(gameBeginner === "o" && endGame);
    console.log(gameBeginner === "x" && endGame);
    
    if (endGame) {
        if (gameBeginner === "o") {
            console.log('ici o');
            oTurn = false;
            xTurn = true;
            message.textContent = "Tour de X";
            gameBeginner = "";
        }
        if (gameBeginner === "x") {
            console.log(gameBeginner);
            xTurn = false;
            oTurn = true;
            message.textContent = "Tour de O";
            gameBeginner = "";
            console.log(gameBeginner);
        }
    }

    oPlayedBoxes = []
    xPlayedBoxes = []    
    gameResult = []
    endGame = false;

    boxes.forEach( box => {
        box.textContent = "";
        box.style.backgroundColor = "rgb(252, 252, 252)";
    })
    
})

function getResult(oPlayedBoxes, xPlayedBoxes) {
    let combos = [[1,5,9],[1,4,7],[1,2,3],[2,5,8],[3,5,7],[3,6,9], [4,5,6], [7,8,9]];

    for (i = 0 ; i<combos.length ; i++){
        let oWinBoxes = [];
        let xWinBoxes = [];
        let o = 0;
        let x = 0;
        for (j = 0 ; j<3 ; j++ ){
            if (oPlayedBoxes.includes(combos[i][j])) {
                o++;
                oWinBoxes.push(combos[i][j]);
            }
            if (xPlayedBoxes.includes(combos[i][j])) {
                x++;
                xWinBoxes.push(combos[i][j]);
            }
        }

        if (o === 3) {
            result.push("O a gagnè");
            result.push(oWinBoxes);
            break;
        } 
        if (x === 3) {
            result.push("X a gagnè");
            result.push(xWinBoxes);
            break;
        }
        let draw = false; 
        setTimeout(() => {
            if ((o !== 3) && (x !== 3) && (oPlayedBoxes.length + xPlayedBoxes.length) === 9){  
                result.push("Partie Nulle");
                draw = true;
            }
        }, 1500);
        if (draw) break;
    }

    return result;
}

function getOtherResult (oPlayedBoxes, xPlayedBoxes, result) {
    let combos = [[1,5,9],[1,4,7],[1,2,3],[2,5,8],[3,5,7],[3,6,9], [4,5,6], [7,8,9]];
    
    for (i = 0 ; i<combos.length ; i++){
        let oWinBoxes = [];
        let xWinBoxes = [];
        let o = 0;
        let x = 0;
        for (j = 0 ; j<3 ; j++ ){
            if (oPlayedBoxes.includes(combos[i][j])) {
                o++;
                oWinBoxes.push(combos[i][j]);
            }
            if (xPlayedBoxes.includes(combos[i][j])) {
                x++;
                xWinBoxes.push(combos[i][j]);
            }
        }
        if (o === 3 ) {
            if (!result.includes(oWinBoxes)) result.push(oWinBoxes);
        } 
        if (x === 3) {
            if (!result.includes(xWinBoxes)) result.push(xWinBoxes);
        }

    }

    return result;
}

