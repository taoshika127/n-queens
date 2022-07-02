/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


// commented out the consoles.. need to add back in later
var toggledBoard = function (n, colArr) {
  //it will create a brand new n by n board and toggle the column at its index row and return the board
  var board = new Board({n: n});
  colArr.forEach(function(element, index) {
    board.togglePiece(index, element);
  });
  return board;
};

window.findNRooksSolution = function(n) {
  var solution = [];
  for (var i = 0; i < n; i++) {
    solution.push([]);
    for (var j = 0; j < n; j++) {
      if (j === i) {
        solution[i].push(1);
      }
      solution[i].push(0);
    }
  }
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //using DFS
  if (n === 0 || n === 1) { return 1; }
  var result = 0;
  var children = [[]];
  var createChildren = function(children) {
    children.forEach(function(colArr) {
      var subChildren = [];
      var rowIndex = colArr.length;
      if (rowIndex === n) {
        result++;
        return;
      }
      for (var colIndex = 0; colIndex < n; colIndex ++) {
        if (!colArr.includes(colIndex)) {
          var colArrCopy = colArr.slice();
          colArrCopy.push(colIndex);
          subChildren.push(colArrCopy);
        }
      }
      createChildren(subChildren);
    });
  };
  createChildren(children);
  return result;
};




window.NQueensSolutionArr = function(n) {
  //using BFS
  if (n === 0) { return [[], 1]; }
  if (n === 1) { return [[[1]], 1]; }
  if (n === 2 || n === 3) { return [new Board({n: n}).rows(), 0]; }
  var queue = [[]];
  for (var rowIndex = 0; rowIndex < n; rowIndex++) {
    var copyQueue = queue.slice();
    queue = [];
    for (var colIndex = 0; colIndex < n; colIndex++) {
      copyQueue.forEach(function(colArr) {
        if (!colArr.includes(colIndex)) {
          var newBoard = toggledBoard(n, colArr);
          newBoard.togglePiece(rowIndex, colIndex);
          if (!newBoard.hasAnyQueensConflicts()) {
            var updatedColArr = colArr.slice();
            updatedColArr.push(colIndex);
            queue.push(updatedColArr);
          }
        }
      });
    }
    if (rowIndex === n - 1) { return [toggledBoard(n, queue[0]).rows(), queue.length]; }
  }
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  return window.NQueensSolutionArr(n)[0];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  return window.NQueensSolutionArr(n)[1];
};
