var turn;
var winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

var dataArray=[0,1,2,3,4,5,6,7,8];

// var currentBoxNum = 
// var currentBoxNum = document.getElementsByClassName('box');
// console.log("currentBoxNum: ", currentBoxNum.length)

// for(var i=0; i<currentBoxNum.length; i++){
// 	dataArray.push(currentBoxNum[i])
// 	console.log(currentBoxNum[i])
// }

document.addEventListener('DOMContentLoaded', init);

function init() {
    document.querySelector('#board').addEventListener('click', turnTaken);
    document.querySelector('#reset').addEventListener('click', reset);
    turn = Math.floor(Math.random() * 2);
    // whoIsPlaying();
}

function turnTaken() {
    // var currentBoxNum = event.target.getAttribute("data-num");
    // var currentBoxPawnVal = event.target.getAttribute("data-pawn");

    // console.log(currentBoxPawnVal);

    var square = event.target;

    if(square.classList.contains('box') && turn && square.innerHTML === ''){
    	square.innerHTML = 'X';
    	turn = false;
    	whoIsPlaying();
    }
    else if(square.classList.contains('box') && square.innerHTML === ''){
    	square.innerHTML = 'O';
    	turn = true;
    	whoIsPlaying();
    }

}


function whoIsPlaying (){
	var whoPlays = document.createElement('div');
	whoPlays.id = 'turn'; // css element

	if(turn){
		whoPlays.innerHTML = "player1";
	}
	else{
		whoPlays.innerHTML = "player2";
	}
	document.getElementById("attach").innerHTML= "";
	document.getElementById("attach").appendChild(whoPlays);
}



function checkWinCond(currentBoxNum) {

    for (var i = 0; i < winningCombos.length; i++) {
        var currentArr = winningCombos[i];
      
        var winCounter = 0;
       	for (var j = 0; j < winningCombos[i].length; j++) {
        		
        		if (currentBoxNum.indexOf(winningCombos[i][j])) {
        			winCounter++
        		}
        	}
       
    }
}

function reset() {
    location.reload();
}

