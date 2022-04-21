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
      tile.className = "tile empty";
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
}
