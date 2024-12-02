import { Player } from "./players";
import { CellPosition } from "./type";
import { arraysEqual } from "../../../lib/function";

type Cell = "X" | "O" | null; // Type pour une cellule individuelle
type Board = Cell[][]; // Type pour un plateau de jeu 3x3

export class Play {
  gameBoard: Board[][]; // Plateau de jeu global
  player1: Player; // Joueur 1
  player2: Player; // Joueur 2
  currentPlayer: Player; // Joueur actuel
  isFinished: boolean; // Le jeu est-il terminé ?

  constructor() {
    this.gameBoard = Array(3)
      .fill(null)
      .map(() =>
        Array(3)
          .fill(null)
          .map(() =>
            Array(3)
              .fill(null)
              .map(() => Array(3).fill(null))
          )
      );
    // Le premier joueur à jouer est X
    this.currentPlayer = new Player("X");
    this.player1 = new Player("X");
    this.player2 = new Player("O");
    this.isFinished = false;
  }
  clone() {
    const newPlay = new Play();
    // copier toutes les propriétés nécessaires de `this` à `newPlay`
    Object.assign(newPlay, this);
    return newPlay;
  }

  isFirstTurn(): boolean {
    // On vérifie si les deux joueurs n'ont pas encore joué
    return (
      arraysEqual(this.player1.getLastMove(), [-1, -1, -1, -1]) &&
      arraysEqual(this.player2.getLastMove(), [-1, -1, -1, -1])
    );
  }

  // *** Les méthodes suivantes sont des méthodes de manipulation du plateau de jeu
  getOneBoard(globalRow: number, globalCol: number): Board {
    return this.gameBoard[globalRow][globalCol];
  }

  getBoard(): Board[][] {
    return this.gameBoard;
  }

  getCell(position: CellPosition): Cell {
    return this.gameBoard[position.globalRow][position.globalCol][
      position.localRow
    ][position.localCol];
  }

  setCell(position: CellPosition, value: Cell): void {
    this.gameBoard[position.globalRow][position.globalCol][position.localRow][
      position.localCol
    ] = value;
  }

  updateBoard(globalRow: number, globalCol: number, board: Board): void {
    this.gameBoard[globalRow][globalCol] = board;
  }

  // *** Fin des méthodes de manipulation du plateau de jeu

  updatePlayerLastMove(position: CellPosition): void {
    this.currentPlayer.setLastMove(position);
  }

  //Fonction pour mettre en evidence sur quel petit plateau le joueur prochain doit jouer
  nextBoardToPlay(): { localRow: number; localCol: number } | null {
    // On recupere le lastMove de l'adversaire
    const lastMove =
      this.currentPlayer.symbol === "X"
        ? this.player2.getLastMove()
        : this.player1.getLastMove();
    const localRow = lastMove[2];
    const localCol = lastMove[3];

    // Vérifiez si le petit tableau est déjà gagné
    const { isWin } =
      !this.isFirstTurn() && this.oneBoardIsWinning(localRow, localCol);
    if (isWin) {
      // Si le tableau est gagné, le joueur peut jouer n'importe où
      console.log("tableau gagné");
      return {
        localCol: -2,
        localRow: -2,
      };
    }

    return { localRow, localCol };
  }

  //Fonction qui retourne un boolean si la case peut etre jouée ou non
  canPlay(position: CellPosition): boolean {
    // Si le jeu est fini, on ne peut plus jouer
    if (this.isFinished) {
      console.log("Le jeu est fini");
      return false;
    }
    // Si la case est déjà occupée, on ne peut pas jouer
    if (this.getCell(position) !== null) {
      console.log("La case est déjà occupée");
      return false;
    }

    // Si le petit plateau sur lequel on doit jouer est différent de celui sur lequel on a cliqué, on ne peut pas jouer
    const nextBoardToPlay = this.nextBoardToPlay();
    if (
      (nextBoardToPlay?.localRow !== position.globalRow ||
        nextBoardToPlay?.localCol !== position.globalCol) &&
      !this.isFirstTurn() &&
      !(nextBoardToPlay?.localRow === -2 && nextBoardToPlay?.localCol === -2)
    ) {
      return false;
    }
    return true;
  }

  oneBoardIsWinning(
    globalRow: number,
    globalCol: number
  ): { isWin: boolean; playerWin: string } {
    const oneBoard = this.getOneBoard(globalRow, globalCol);
    let playerWin = "X"; //default
    let isWin = false;
    // Verification si victoire par les horizontales
    oneBoard.forEach((row) => {
      const isWinningByVertical = row.every((c) => {
        if (c !== null) {
          return c === row[0];
        }
      });
      if (isWinningByVertical && row[0] !== null) {
        playerWin = row[0].toString();
        isWin = true;
      }
    });
    // Verification si victoire par les diagonales
    const firstCaseDiagonalPrimaire = oneBoard[0][0];
    const firstCaseDiagonalInverse = oneBoard[0][2];

    // Diagonale primaire
    const isWinningByDiagonalPrimaire = Array.from(
      { length: oneBoard.length },
      (_, i) => i
    ).every(
      (i) =>
        oneBoard[i][i] !== null && oneBoard[i][i] === firstCaseDiagonalPrimaire
    );

    // Diagonale inverse
    const isWinningByDiagonalInverse = Array.from(
      { length: oneBoard.length },
      (_, i) => i
    ).every(
      (i) =>
        oneBoard[i][oneBoard.length - i - 1] !== null &&
        oneBoard[i][oneBoard.length - i - 1] === firstCaseDiagonalInverse
    );

    if (isWinningByDiagonalPrimaire) {
      playerWin = firstCaseDiagonalPrimaire?.toString() || "X";
      isWin = true;
    } else if (isWinningByDiagonalInverse) {
      playerWin = firstCaseDiagonalInverse?.toString() || "X";
      isWin = true;
    }

    // Verification si victoire par les verticales
    [0, 1, 2].forEach((e) => {
      const column = [oneBoard[0][e], oneBoard[1][e], oneBoard[2][e]];
      const allNotNull = column.every((value) => value !== null);
      const allEqual = column.every((value, _, [first]) => value === first);

      if (allNotNull && allEqual) {
        isWin = true;
        playerWin = oneBoard[0][e] || "X";
      }
    });

    return { isWin, playerWin };
  }
}
