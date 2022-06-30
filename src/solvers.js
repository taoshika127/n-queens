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


window.copyBoard = function (board) {
  var copy = new Board({n: board.attributes.n});
  var stringIFY = JSON.stringify(board.attributes);
  copy.attributes = JSON.parse(stringIFY);
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var matrix = [];
  for (var i = 0; i < n; i++) {
    matrix.push([]);
    for (var j = 0; j < n; j++) {
      matrix[i].push(0);
    }
  }
  var board = new Board(matrix);
  console.log(board);
  var queue = [];
  var result = [];
  var key = 0;
  queue.push(board);
  while (key < n) {
    var copyQueue = queue.slice();
    queue = [];
    for (var index = 0; index < n; index++) {
      copyQueue.forEach(function(workingBoard) {
        var copy = window.copyBoard(workingBoard);
        console.log(copy, workingBoard);
        copy.togglePiece(key, index);
        console.log(key, index, 'after toggle', copy);
        if (copy.hasAnyRowConflicts() || copy.hasAnyColConflicts()) {
          console.log('conflict, toggle back', board.rows());
          copy.togglePiece(key, index);
          console.log(key, index, copy);
        } else {
          console.log('this step is ok', copy.rows());
          queue.push(copy);
          if (key === n - 1) {
            result.push(workingBoard);
          }
        }
      });
    }
    console.log(key, queue);
    key++;
  }
  return result.length;

};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  //console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
