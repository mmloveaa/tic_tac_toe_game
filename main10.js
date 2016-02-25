var turn;
document.addEventListener('DOMContentLoaded', init);

function init() {
    document.querySelector('#board').addEventListener('click', turnTaken);
    // whoIsPlaying();
    turn = Math.floor(Math.random() * 2);
}


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

function reset() {
    location.reload();
}

function checkWinCond(currentBoxNum) {

    for (var i = 0; i < winningCombos.length; i++) {
        var currentArr = winningCombos[i];
        //we have [1,2,3]
        //check does currentBoxNum occur in currenArr

        var winCounter = 0;

        //we know this current sub-array contains the currentboxnum so lets loop through it

        for (var j = 0; j < 3; j++) {
            if (currentArr.indexOf(currentBoxNum) !== -1) {
                //var currentWinNumPawnVal =  get the box with the data-num of currentboxnum, then get its data-pawn value

                var currentWinNumPawnVal =

                    if (currentWinNumPawnVal === turnToggle) {
                        winCounter++

                        if (winCounter === 3) {
                            hasWon();
                        }

                    }
            }
        }
    }
}

// var selectedBox = ( event.target.getAttribute("data-num") );

// function createXO (event, i){
// 	event.target.innerHTML
// }  

// var turnToggle = 'X';


    // //check if the currentBoxPawnVal exists because
    // if (!currentBoxPawnVal) {
    //     //don't let user take turn
    //     return;
    //     console.log('sdfdsfdsf');
    // } else {
    //     // run only if false
    //     event.target.dataset.pawn = turnToggle;

    // }



    // checkWinCond(currentBoxNum);


    // //swith turntoggle back and forth with if else statement

    // if (turnToggle === 'X') {
    //     return turnToggle === 'O';
    // } else {
    //     return turnToggle === 'X';
    // }



