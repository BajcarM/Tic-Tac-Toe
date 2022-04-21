let playerTurn = "cross";

gameBoardCreate(10, 10);
makeTilesClickable();

document.querySelector(".modal-button").addEventListener("click", function () {
  playerTurn = "cross";
  gameBoardCreate(10, 10);
  document.querySelector(".modal-content").style.display = "none";
  makeTilesClickable();
});

document.querySelector(".button-start").addEventListener("click", function () {
  playerTurn = "cross";
  gameBoardCreate(10, 10);
  makeTilesClickable();
  document.querySelectorAll(".score-count").forEach(function (score) {
    score.textContent = 0;
  });
});

function makeTilesClickable() {
  document.querySelectorAll(".tile").forEach(function (tileClicked) {
    tileClicked.addEventListener("click", function (e) {
      if (e.currentTarget.classList.contains("empty")) {
        e.currentTarget.classList.add(playerTurn);
        e.currentTarget.classList.remove("empty");
        victoryChecker(e.currentTarget.id);
        roundSwitch();
      }
    });
  });
}

function gameBoardCreate(rows, columns) {
  const gameBoardContainer = document.getElementById("game-board");
  gameBoardContainer.innerHTML = "";
  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      const tile = document.createElement("div");
      tile.className = "tile empty prev-" + playerTurn;
      tile.id = "" + i + j;
      gameBoardContainer.appendChild(tile);
    }
  }
  turnReset();
}

function victoryChecker(targetTileId) {
  let row = Number(targetTileId[0]);
  let col = Number(targetTileId[1]);
  let tile;
  let fiveInRow = [0, 0, 0, 0];

  for (i = 0; i < 9; i++) {
    check(0, "" + row + (col - 4 + i));
    check(1, "" + (row - 4 + i) + col);
    check(2, "" + (row - 4 + i) + (col - 4 + i));
    check(3, "" + (row - 4 + i) + (col + 4 - i));
  }

  function check(index, coords) {
    tile = document.getElementById(coords);
    if (tile) {
      if (tile.classList.contains(playerTurn)) {
        fiveInRow[index]++;
      } else {
        fiveInRow[index] = 0;
      }
      if (fiveInRow[index] === 5) {
        console.log(playerTurn + " Wins!");
        highlightWinner(index, coords);
        endGame();
      }
    }
  }
}

function roundSwitch() {
  if (playerTurn === "cross") {
    playerTurn = "circle";
  } else {
    playerTurn = "cross";
  }
  document.querySelectorAll(".empty").forEach(function (preview) {
    preview.classList.toggle("prev-cross");
  });
  document.querySelectorAll(".empty").forEach(function (preview) {
    preview.classList.toggle("prev-circle");
  });
  document.querySelector(".turn-icon").classList.toggle("score-icon-cross");
  document.querySelector(".turn-icon").classList.toggle("score-icon-circle");
}

function highlightWinner(index, coords) {
  let hRow = Number(coords[0]);
  let hCol = Number(coords[1]);

  for (i = 0; i < 5; i++) {
    switch (index) {
      case 0:
        document
          .getElementById("" + hRow + (hCol - i))
          .classList.add("highlight");
        break;
      case 1:
        document
          .getElementById("" + (hRow - i) + hCol)
          .classList.add("highlight");
        break;
      case 2:
        document
          .getElementById("" + (hRow - i) + (hCol - i))
          .classList.add("highlight");
        break;
      case 3:
        document
          .getElementById("" + (hRow - i) + (hCol + i))
          .classList.add("highlight");
        break;
    }
  }
}

function endGame() {
  document.querySelectorAll(".empty").forEach(function (empty) {
    empty.classList.remove("empty");
  });
  document.getElementById("score-count-" + playerTurn).textContent++;
  document.querySelector(".modal-content").style.display = "grid";
  document.querySelector(".modal-icon").style.backgroundImage =
    "url('images/" + playerTurn + ".png')";
  document.querySelector(".modal-text").textContent =
    playerTurn.toUpperCase() + " WINS!";
}

function turnReset() {
  document.querySelector(".turn-icon").classList.remove("score-icon-cross");
  document.querySelector(".turn-icon").classList.remove("score-icon-circle");
  document.querySelector(".turn-icon").classList.add("score-icon-cross");
}
