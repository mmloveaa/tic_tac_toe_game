(function(){

	var rows;
	var numTiles;
	var tilesHtml;
	var tile;
	var getLetter = alternate()
	var winningCombos = [];

	var placedTiles = [];


	$(document).ready(init)


	function init(){
		attachListeners();

	}

	function attachListeners() {
		document.getElementById('startGame').addEventListener('click', makeBoard)
		document.getElementById('reset').addEventListener('click', resetGame)
	}

	function makeBoard(event) {
		
		var box = document.createElement('div');




		// get the number of rows from the input field
		rows = getRows();
		// make the html to append to the gameboard
		tilesHtml = genTiles(rows);
		console.log('tileshtml ', tilesHtml)
		// append the tiles to the html
		attachTiles(tilesHtml)
		// make the appropriate winning combinations for that particular gameboard size 2x2 3x3 4x4
		winningCombos = makeWinningCombos(rows)
		// attach click handlers to the different Tiles
		document.getElementByClassName('tile').addEventListener('click', markTile)

	}

	function getRows() {
		return document.getElementById('rowCount').value;
	}

	function genTiles(rows) {
		console.log('this is running')
		var result = ""

		// this is where we create the tiles and assign an id to each tile
		// 1,2,3
		// 4,5,6
		// 7,8,9

		for (var i=1; i<=Math.pow(rows,2); i++) {
			var tileTemp = document.createElement('span class="tile t'+rows.toString()+'" id="'+i+'"></span>'
			result += tileTemp
		}

		return result;

	}


	function attachTiles(tilesHtml) {
		document.getElementById('board').remove();
		document.getElementById('board').appendChild(tilesHtml);
	}

})();




























































	function makeWinningCombos(rows) {
		var result;
		console.log('type of rows ', typeof rows)
		if (rows === '2') {
			result = [[1,2],[3,4],[1,3],[2,4],[1,4],[2,3]]
		}
		else if (rows === '3') {
			result = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
		}

		return result
		// else if (rows === 4) {
		// 	result = [[1,2,3,4]]
		// }
		// else if (rows === 6) {

		// }
	}

	function markTile(event) {
		
		// one way of preventing someone from reclicking the same tile
		// $(this).unbind();


		// another way of preventing people from reclicking the same tile
		if($(this).text() === 'X' || $(this).text() === 'O') {
			console.log('someone already clicked here')
			return;
		}

		console.log(this)
		// get the letter either an X or O
		var letter = getLetter() 
		// initialize a value for score
		var score = 0;
		// get the tileId
		var tileId = $(this).attr('id');

		// assign a score for a letter X is 1, O is -1
		if (letter === 'X') {
			score = 1
		}
		else {
			score = -1
		}

		// put the letter X or O into the text field of the letter
		$(this).text(letter)

		// refer to line 10-13
		placedTiles[tileId] = score;

		console.log('tile number ' + $(this).attr('id'))

		// this will go through each winning combo
		winningCombos.forEach(function(combo){
			// for example
			// [1,2]

			var finalScore = 0;
			// this for loop will look through all the possible winning combinations, if the scores add up to the number of rows
			// the someone has won
			for (var i=0; i<combo.length; i++) {
				// check if a score has been placed for that tile. if a tile is clicked , then it has a score
				if (!placedTiles[combo[i]]) placedTiles[combo[i]] = 0
				finalScore += placedTiles[combo[i]]
			}

			//check if x or o won
			if (finalScore === parseInt(rows)) {
				console.log('X won')
			}
			if (finalScore === parseInt(rows*-1)) {
				console.log('O won')
			}
		})
	}