let boxes = document.querySelectorAll(".case button");
let restart = document.getElementById('restart');
let message = document.getElementById('message');

let oTurn = true;
let xTurn = false;
let oPlayedBoxes = [];
let xPlayedBoxes = [];
let turnMessage = "";
let endGame = false;
let gameResult = [];
let gameBeginner = "";

boxes.forEach( box => {
    box.addEventListener( "click", () => {

        if (box.innerText === "" && !endGame) {
            if (oTurn) {
                playMark(box, "O", oPlayedBoxes, "Tour de X");
                oTurn = false;
                xTurn = true;
            } else if (xTurn) {
                playMark(box, "X", xPlayedBoxes, "Tour de O");
                xTurn = false;
                oTurn = true;
            }
        }

        gameResult = getResult(oPlayedBoxes, xPlayedBoxes);

        if (gameResult.length === 0) {
            message.innerText = turnMessage;
        }
        if (gameResult.length === 1) {
            message.innerText = gameResult[0];
            endGame = true;
        }

        if (gameResult.length === 2) {
            message.innerText = gameResult[0];
            gameResult[1].forEach( boxId => {
                boxes[boxId - 1].style.backgroundColor = "red";
            });
            endGame = true;
        }

    });
});

restart.addEventListener("click", () => {

    if (endGame) {
        if (gameBeginner === "o") {
            oTurn = false;
            xTurn = true;
            message.textContent = "Tour de X";
            gameBeginner = "";
        }
        if (gameBeginner === "x") {
            xTurn = false;
            oTurn = true;
            message.textContent = "Tour de O";
            gameBeginner = "";
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

function playMark(box, mark, playedBoxes, nextTurnMessage) {
    box.textContent = mark;
    playedBoxes.push(Number(box.id));
    turnMessage = nextTurnMessage;
    if (gameBeginner === "") gameBeginner = mark.toLowerCase();
}

function getResult(oPlayedBoxes, xPlayedBoxes) {
    let combos = [[1,5,9],[1,4,7],[1,2,3],[2,5,8],[3,5,7],[3,6,9], [4,5,6], [7,8,9]];
    let result = [];

    for (let i = 0 ; i < combos.length ; i++) {
        let oWinBoxes = [];
        let xWinBoxes = [];
        let o = 0;
        let x = 0;
        for (let j = 0 ; j < 3 ; j++) {
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
            result.push("O a gagné");
            result.push(oWinBoxes);
            break;
        }
        if (x === 3) {
            result.push("X a gagné");
            result.push(xWinBoxes);
            break;
        }
    }

    if (result.length === 0 && (oPlayedBoxes.length + xPlayedBoxes.length) === 9) {
        result.push("Partie Nulle");
    }

    return result;
}
