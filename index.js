let playerTurn = "cross";

gameBoardCreate(10, 10);

document.querySelectorAll(".tile").forEach(function (tileClicked) {
  tileClicked.addEventListener("click", function (e) {
    if (e.currentTarget.classList.contains("empty")) {
      e.currentTarget.classList.add(playerTurn);
      e.currentTarget.classList.remove("empty");
      victoryChecker(e.currentTarget.id);
      roundSwitch();
    }
    console.log(e.currentTarget.id);
  });
});

function gameBoardCreate(rows, columns) {
  const gameBoardContainer = document.getElementById("game-board-container");
  gameBoardContainer.innerHTML = "";
  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      const tile = document.createElement("div");
      tile.className = "tile empty prev-" + playerTurn;
      tile.id = "" + i + j;
      gameBoardContainer.appendChild(tile);
    }
  }
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
