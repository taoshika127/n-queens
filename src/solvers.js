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
/*
rook matrix = [
      [0, 1, 0, 0],
      [0, 0, 0, 1],
      [1, 0, 0, 0],
      [0, 0, 1, 0]
    ];
*/

// commented out the consoles.. need to add back in later
window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  var board = new Board({n: n})
  var matrix = board.rows();
  for(var i = 0; i < n; i++) {
    board.togglePiece(i, i);
  }
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return matrix;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
var nRookCount = [];
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  var factorial = function(input) {
    if (input === 0) {
      return 1;
    } else {
      return input * factorial(input - 1);
    }
  }
  solutionCount = factorial(n)
  // var board = new Board({n:n})
  // var matrix = board.rows();

  // var addRook = function() {
  //   for (var i = 0; i< n; i++) {
  //     // if (1) on location
  //     // go to next row
  //     // toggle to (1) if no conflicts
  //   }

  // }
  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme
  //var rookSolution = this.findNRooksSolution(n);
  if (n === 0) {
    return [];
  }
  if (n === 1) {
    return [[1]];
  }
  if (n === 2 || n === 3) {
    return (new Board({n:n})).rows();
  }
  var rowIndex = 0;
  var queue = [];
  var cleanQueue = [];
  queue.push(new Board({n: n}))
  while (rowIndex <= (n - 1)) {
    queue.forEach(function(board) {
      for (var colIndex = 0; colIndex < n; colIndex++) {
        var copy = new Board({n:n})
        copy.attributes = JSON.parse(JSON.stringify(board.attributes));
        //console.log(copy, board)
        copy.togglePiece(rowIndex, colIndex);
        if (!copy.hasAnyQueensConflicts()) {
          //console.log('here')
          cleanQueue.push(copy);
        }
      }
    })
    queue = cleanQueue.slice();
    cleanQueue = [];
    rowIndex+=1;
  }
  return queue[0].rows();
};
//
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme
  //var rookSolution = this.findNRooksSolution(n);
  if (n === 0) {
    return 1;
  }
  if (n === 1) {
    return 1;
  }
  if (n === 2 || n === 3) {
    return 0;
  }
  var rowIndex = 0;
  var queue = [];
  var cleanQueue = [];
  queue.push(new Board({n: n}))
  while (rowIndex <= (n - 1)) {
    queue.forEach(function(board) {
      for (var colIndex = 0; colIndex < n; colIndex++) {
        var copy = new Board({n:n})
        copy.attributes = JSON.parse(JSON.stringify(board.attributes));
        console.log(copy, board)
        copy.togglePiece(rowIndex, colIndex);
        if (!copy.hasAnyQueensConflicts()) {
          cleanQueue.push(copy);
        }
      }
    })
    queue = cleanQueue.slice();
    cleanQueue = [];
    rowIndex+=1;
  }
  return queue.length;
};

