const cells = document.querySelectorAll(".cell");
const statustext = document.querySelector("#status");
const restartB = document.querySelector("#restart");
const wincond = [
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6]
];
let options = ["","","","","","","","",""];
let currentPlayer ="X";
let running =false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click",cellclicked));
    restartB.addEventListener("click",restartGame);
    statustext.textContent = `${currentPlayer}'s Turn`;
    running=true;
};

function cellclicked(){
    const index = this.getAttribute("cellIndex");
    if(options[index]!=""||!running){
        return;
    }
    
    updatecell(this,index);
    checkWinner();
    
};

function updatecell(cell,index){
    options[index]=currentPlayer;
    cell.textContent=currentPlayer;
};

function changeplayer(){
    currentPlayer = (currentPlayer =="X") ? "O":"X";
    statustext.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner(){
    let a = false;
    for(let i =0;i<wincond.length;i++){
        const condition = wincond[i];
        const A = options[condition[0]];
        const B = options[condition[1]];
        const C = options[condition[2]];

        if(A==""||B==""||C==""){
            continue;
        }
        if(A==B&&B==C){
            a=true;
            break;
        }
    }
    if(a){
        statustext.textContent = `${currentPlayer} Won!`;
        running=false;
    }
    else if(!options.includes("")){
        statustext.textContent = `Draw`;
        running=false;
    }
    else{
        changeplayer();
    }
}

function restartGame(){
    currentPlayer ="O";
    options = ["","","","","","","","",""];
    statustext.textContent = `${currentPlayer}'s Turn`;
    cells.forEach(cell=> cell.textContent="");
    running=true;
}