function gameBoardCreate(rows, columns) {
  const gameBoardContainer = document.getElementById("game-board-container");
  gameBoardContainer.innerHTML = "";
  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.id = "" + i + j;
      gameBoardContainer.appendChild(tile);
    }
  }
}

function victoryChecker(targetTileId) {
  let row = Number(targetTileId[0]);
  let col = Number(targetTileId[1]);
  let tile;
  //   Row check
  for (i = 0; i < 9; i++) {
    tile = document.getElementById("" + row + (col - 4 + i));
    console.log(tile);
  }

  //   Column check
  for (i = 0; i < 9; i++) {
    tile = document.getElementById("" + (row - 4 + i) + col);
    console.log(tile);
  }

  //   diagonal check

  for (i = 0; i < 9; i++) {
    tile = document.getElementById("" + (row - 4 + i) + (col - 4 + i));
    console.log(tile);
  }

  //   other diagonal check
  for (i = 0; i < 9; i++) {
    tile = document.getElementById("" + (row - 4 + i) + (col + 4 - i));
    console.log(tile);
  }
}

gameBoardCreate(10, 10);

victoryChecker("44");
