let boxes = document.querySelectorAll(".box");   // array of box
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#new-btn");


let turnO = true;   //playerX or playerO
let count = 0; // Moves count

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.style.color = "#b0413e";
            box.innerText = "O";
            turnO = false;
        } else{
            box.style.color = "#14351e";
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        
        if(count ===9 && !(isWinner)){
            checkDraw();
        }
    });
});

const checkDraw = () =>{
        msg.innerText = "Match Draw";
        msgContainer.classList.remove("hide");
        disableBoxes();
};

// Reset  or  New-Game
const reset = () =>{
    enableBoxes();
    turnO = true;
    count = 0;
    winner = false;
    msgContainer.classList.add("hide");
};


const disableBoxes = () =>{
    for(box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () =>{
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) =>{
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    winner = true;
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        
        if(pos1val != "" && pos2val != "" && pos2val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                return true;
            }
        }
    }
};

resetBtn.addEventListener("click",reset);

newGameBtn.addEventListener("click",reset);