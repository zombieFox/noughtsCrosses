var nc = (function() {

  var board = {
    turn: 1,
    state: {
      1: {
        active: false,
        shape: null
      },
      2: {
        active: false,
        shape: null
      },
      3: {
        active: false,
        shape: null
      },
      4: {
        active: false,
        shape: null
      },
      5: {
        active: false,
        shape: null
      },
      6: {
        active: false,
        shape: null
      },
      7: {
        active: false,
        shape: null
      },
      8: {
        active: false,
        shape: null
      },
      9: {
        active: false,
        shape: null
      }
    }
  };

  var winningCombinations = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
  ];

  var winningIndex = null;

  var e = function(selector) {
    return document.querySelector(selector);
  };

  var eA = function(selector) {
    return document.querySelectorAll(selector);
  };

  var render = function(){
    var nc = e(".nc");
    var newBoard = document.createElement("div");
    newBoard.setAttribute("class", "nc-board");

    for (var key in board.state) {
      var newCell = document.createElement("div");
      newCell.setAttribute("class", "nc-cell nc-cell-live");
      newCell.setAttribute("data-nc-cell-key", key);
      if (board.state[key].shape !== null) {
        newCell.classList.add("nc-cell-active");
        var shape = document.createElement("div");
        shape.setAttribute("class", "nc-shape");
        var shapeIcon = document.createElement("div");
        shapeIcon.setAttribute("class", "nc-shape-icon-" + board.state[key].shape);
        shape.appendChild(shapeIcon);
        newCell.appendChild(shape);
      }
      if (winningIndex != null && 
      winningCombinations[winningIndex].includes(parseInt(key, 10))) {
        newCell.classList.add("nc-winner-cell");
        newCell.classList.remove("nc-cell-live");
        var restartButton = e(".nc-restart-button");
        restartButton.classList.add("btn-primary");
        restartButton.classList.remove("btn-dark");
      }
      if (winningIndex != null) {
        newCell.classList.remove("nc-cell-live");
      }
      newBoard.appendChild(newCell);
    }

    nc.appendChild(newBoard);

    if (winningIndex != null) {
      var winningLine = [
        "nc-winner-horizontal-top",
        "nc-winner-horizontal-middle",
        "nc-winner-horizontal-bottom",
        "nc-winner-vertical-left",
        "nc-winner-vertical-middle",
        "nc-winner-vertical-right",
        "nc-winner-diagonal-top-left",
        "nc-winner-diagonal-top-right"
      ];
      var winner = document.createElement("div");
      winner.setAttribute("class", "nc-winner");
      winner.classList.add(winningLine[winningIndex]);
      nc.appendChild(winner);
    }
  };

  var bind = function(){
    var all_cells = eA(".nc-cell");
    all_cells.forEach(function(item, index){
      if (board.state[parseInt(item.dataset.ncCellKey, 10)].shape === null && winningIndex == null){
        item.addEventListener("click", function() {
          board.state[parseInt(this.dataset.ncCellKey, 10)].active = true;
          if (board.turn == 1) {
            board.state[parseInt(this.dataset.ncCellKey, 10)].shape = "cross";
            board.turn = 2;
          } else {
            board.state[parseInt(this.dataset.ncCellKey, 10)].shape = "circle";
            board.turn = 1;
          }
          checkForWinner();
          clear();
          render();
          bind();
        }, false);
      }
    });
  };

  var clear = function(){
    var nc = e(".nc");
    while (nc.lastChild) {
      nc.removeChild(nc.lastChild);
    }
  };

  var checkForWinner = function(){
    var winningCombinationIndex;
    winningCombinations.forEach(function(item, index) {
      // console.log("winningCombinations ----------------------- fire")
      var combination = JSON.parse(JSON.stringify(item));
      // console.log("combination checking:", combination)
      var combinationShape = [];
      combination.forEach(function(item){
        combinationShape.push(board.state[item].shape);
      });
      // console.log(combinationShape)
      if (combinationShape[0] == combinationShape[1] && combinationShape[0] == combinationShape[2] && combinationShape[0] != null && combinationShape[1] != null && combinationShape[2] != null) {
        winningCombinationIndex = index;
      }
    });
    if (winningCombinationIndex != null) {
      console.log("winner array item:", winningCombinationIndex);
      winningIndex = winningCombinationIndex;
    } else {
      winningIndex = null;
    }
  };

  var init = function(){
    winningIndex = null;
  };

  var bindRestart = function(){
    var restartButton = e(".nc-restart-button");
    restartButton.addEventListener("click", function() {
      board = {
        turn: 1,
        state: {
          1: {
            active: false,
            shape: null
          },
          2: {
            active: false,
            shape: null
          },
          3: {
            active: false,
            shape: null
          },
          4: {
            active: false,
            shape: null
          },
          5: {
            active: false,
            shape: null
          },
          6: {
            active: false,
            shape: null
          },
          7: {
            active: false,
            shape: null
          },
          8: {
            active: false,
            shape: null
          },
          9: {
            active: false,
            shape: null
          }
        }
      };
      winningIndex = null;
      restartButton.classList.remove("btn-primary");
      restartButton.classList.add("btn-dark");
      clear();
      render();
      bind();
    })
  };

  init();
  render();
  bind();
  bindRestart();
  
  return {
    board: board
  };

})();
