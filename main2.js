"use strict";

$(document).ready(init);

var gameApp = {};
gameApp.rowLength;
gameApp.playerXtiles = [];
gameApp.playerOtiles = [];
gameApp.currentPlayer = "X";

function init(){
  clickHandler();
}

function clickHandler(){
  $('.tile').click(tileClicked);
  $('#reset').click(reset);
  $('#start').click(startGame);
}

function startGame(){
  gameApp.rowLength = parseInt($('#quantity').val());
  makeBoard(gameApp.rowLength);
}

function makeBoard(rowLength){
  var size = 12 / rowLength;
  for (var i = 0; i < rowLength * rowLength; i++){
    $("#board").append($("<div>").addClass('col-xs-' + size + ' tile').data("tile", i));
  }
  $('.tile').click(tileClicked);
  $('#start').off('click');
}

function tileClicked(event){
  if (gameApp.currentPlayer === "X"){
    playerMove($(this), "X");
  } else {
    playerMove($(this), "O");
  }
}

function playerMove($tile, playerSymbol){
  $('h3').text("Player " + playerSymbol + "'s move:");
  $tile.append($('<div>').text(playerSymbol));
  $tile.addClass('unselectable');
  gameApp["player" + playerSymbol + "tiles"].push($tile.data("tile"));

  if (gameApp.currentPlayer === "X") {
    gameApp.currentPlayer = "O";
  } else if (gameApp.currentPlayer === "O") {
    gameApp.currentPlayer = "X";
  }
  if (checkForWin(gameApp["player" + playerSymbol + "tiles"])){
    gameWon(playerSymbol);
  } else {
  checkForStaleMate();
  }
}

function checkForStaleMate(){
  if(gameApp.playerXtiles.concat(gameApp.playerOtiles).length === gameApp.rowLength * gameApp.rowLength) {
    $('h3').text("It's a stalemate!");
  }
}

function checkForWin(playerTiles){
  var playerTilesArray = playerTiles.concat();
  var winningCombos = getWinningCombos(gameApp.rowLength);
  return containsSubset(playerTilesArray, winningCombos);
}

function getWinningCombos(rowLength){
  var winningCombos = [];
  var rows = getRows(rowLength);
  var columns = getColumns(rowLength);
  var rightDiagonal = getRightDiagonal(rowLength);
  var leftDiagonal = getLeftDiagonal(rowLength);

  joinArrayOfArrays(winningCombos, rows);
  joinArrayOfArrays(winningCombos, columns);
  joinArrayOfArrays(winningCombos, rightDiagonal);
  joinArrayOfArrays(winningCombos, leftDiagonal);

  return winningCombos;
}

function joinArrayOfArrays(main, newList){
  for (var i = 0; i < newList.length; i++){
    main.push(newList[i]);
  }
}

function getRows(rowLength){
  var numRows = rowLength;
  var positions = range(rowLength * rowLength);
  var sublists = [];

  for (var i = 0; i < positions.length; i++){
    if (isStartOfRow(positions[i], rowLength)){
      var sublist = [];
      for (var j = 0; j < numRows; j++){
        sublist.push(positions[i] + j);
      }
      sublists.push(sublist);
    }
  }
  return sublists;
}

function isStartOfRow(position, rowLength){
  var starts = [0];
  var numPositions = rowLength * rowLength;
  for (var i = rowLength; i < numPositions; i += rowLength){
    starts.push(i);
  }
  return starts.indexOf(position) > -1;
}

function getColumns(rowLength){
  var numRows = rowLength;
  var positions = range(rowLength * rowLength);
  var sublists = [];

  for (var i = 0; i < positions.length; i++){
    if (isStartOfColumn(positions[i], rowLength)){
      var sublist = [];
      for (var j = 0; j < numRows; j++){
        sublist.push(positions[i] + rowLength * j)
      }
      sublists.push(sublist);
    }
  }
  return sublists;
}

function isStartOfColumn(position, rowLength){
  return range(rowLength).indexOf(position) > -1;
}

function getRightDiagonal(rowLength){
  var numRows = rowLength;
  var positions = range(rowLength * rowLength);
  var diagonal = [];
  var startDiagonal = positions[rowLength - 1];

  for (var i = 0; i < numRows; i++){
    diagonal.push(startDiagonal + ((rowLength - 1) * i))
  }
  return [diagonal];
}

function getLeftDiagonal(rowLength){
  var numRows = rowLength;
  var positions = range(rowLength * rowLength);
  var diagonal = [];
  var startDiagonal = positions[0];

  for (var i = 0; i < numRows; i++){
    diagonal.push(startDiagonal + ((rowLength + 1) * i))
  }
  return [diagonal];
}

// srange function from stackoverflow
function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        stop = start;
        start = 0;
    }
    if (typeof step == 'undefined') {
        step = 1;
    }
    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }
    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }
    return result;
};

function containsSubset(set, possibleSubsetsArray){
  for (var i = 0; i < possibleSubsetsArray.length; i++){
      var count = 0;
      for (var j = 0; j < possibleSubsetsArray[i].length; j++){
        if (set.indexOf(possibleSubsetsArray[i][j]) > -1){
          count += 1;
        }
      if (count === possibleSubsetsArray[0].length){
        return true;
      }
    }
  } return false;
}

function gameWon(playerSymbol){
  $('h3').text('Player ' + playerSymbol + ' wins!!');
  $('.tile').addClass("animated rubberBand");
  $('h3').css({color: "DarkSalmon", fontWeight: "bolder" }).addClass("animated jello");
}

function reset(){
  location.reload();
}