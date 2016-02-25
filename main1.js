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

var dataArrayX=[];
var dataArrayO=[];

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
    // Extra feature: select random player
}

function turnTaken() {
    // var currentBoxNum = event.target.getAttribute("data-num");
    // var currentBoxPawnVal = event.target.getAttribute("data-pawn");

    // console.log(currentBoxPawnVal);

    var square = event.target;

    if(square.classList.contains('box') && turn && square.innerHTML === ''){
    	square.innerHTML = 'X';
        square.classList.add('mark');
        console.log('first click');
    	turn = false;
    	whoIsPlaying();
        var dataX=event.target.getAttribute('data-num'); 
        dataArrayX.push(dataX);
        checkifXWin();
    }
    else if(square.classList.contains('box') && square.innerHTML === ''){
    	square.innerHTML = 'O';
        square.classList.add('mark');
    	turn = true;
        var dataO=event.target.getAttribute('data-num');
        dataArrayO.push(dataO)
        checkifOWin();
    	whoIsPlaying();
    }

}


function whoIsPlaying (){
	var whoPlays = document.createElement('div');
	whoPlays.id = 'turn'; // css element

	if(turn){
		whoPlays.innerHTML = "player 1";
	}
	else{
		whoPlays.innerHTML = "player 2";
	}
	document.getElementById("attach").innerHTML= "";
	document.getElementById("attach").appendChild(whoPlays);
}



function checkifXWin() {

    for (var i = 0; i < winningCombos.length; i++) {
        var winnerXCounter = 0;
        for (var j = 0; j < 3; j++) {
            if(dataArrayX.indexOf((winningCombos[i][j]).toString()) > -1){
                winnerXCounter += 1;
            }if(winnerXCounter === 3){
                var addDiv = document.createElement('div');
                var addMsg = document.createTextNode('Player X wins!');
                document.getElementById('board').value = '';
                addDiv.classList.add('winner');
                addDiv.appendChild(addMsg);
                document.getElementById('board').appendChild(addDiv);
            }else{
                console.log('false');
            }       
        }
       
    }
}

function checkifOWin() {

    for (var i = 0; i < winningCombos.length; i++) {
        var winnerXCounter = 0;
        for (var j = 0; j < 3; j++) {
            if(dataArrayO.indexOf((winningCombos[i][j]).toString()) > -1){
                winnerXCounter += 1;
            }if(winnerXCounter === 3){
                var addDiv = document.createElement('div');
                var addMsg = document.createTextNode('Player O wins!');
                document.getElementById('board').value = '';
                addDiv.classList.add('winner');
                addDiv.appendChild(addMsg);
                document.getElementById('board').appendChild(addDiv);
            }else{
                console.log('false');
            }       
        }
       
    }
}

        // var currentArr = winningCombos[i];
        		// if (currentBoxNum.indexOf(winningCombos[i][j])) {
        		// 	winCounter++
        		// }

function reset() {
    // location.reload();
    document.location.href='';
}

