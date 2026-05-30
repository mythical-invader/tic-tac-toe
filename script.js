let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newbtn = document.querySelectorAll(".new-game-btn"); 
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");
let msgDraw = document.querySelector(".msgDraw");

let turn0 = true;
let count = 0;

const winConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    msgDraw.classList.add("hide");
    count = 0;
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const drawM = () => {
    msg.innerText = `Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
    });
});

const disableBoxes = () => {
    for (box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};


const checkWinner = () => {
    for (let pattern of winConditions) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if (val1 !== "" && val2 !== "" && val3 !== "") {
            if (val1 === val2 && val2 === val3) {
                console.log("Winner is:", val1);
                showWinner(val1);
                return;
            }
        }
    }

    if (count === 9) {
        console.log("Draw");
        drawM();
    }
};


newbtn.forEach(button => {
    button.addEventListener("click", resetGame);
});

reset.addEventListener("click", resetGame);