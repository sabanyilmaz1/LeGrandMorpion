//class for player
// a player has a symbol (X or O), the last move he made

import { CellPosition } from "./type";

export class Player {
  symbol: string;
  lastMove: Array<number>;
  constructor(symbol: string) {
    this.symbol = symbol;
    this.lastMove = [-1, -1, -1, -1];
  }
  clone() {
    const newPlayer = new Player(this.symbol);
    // copier toutes les propriétés nécessaires de `this` à `newPlayer`
    Object.assign(newPlayer, this);
    return newPlayer;
  }

  setLastMove(position: CellPosition): void {
    this.lastMove = [
      position.globalRow,
      position.globalCol,
      position.localRow,
      position.localCol,
    ];
  }

  getLastMove(): Array<number> {
    return this.lastMove;
  }
}
