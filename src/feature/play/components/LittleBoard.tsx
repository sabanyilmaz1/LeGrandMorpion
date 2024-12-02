import { PlayerO, PlayerX } from "../../../components/Players";
import { Play } from "../model/play";

interface LittleBoardProps {
  globalRow: number;
  globalCol: number;
  play?: Play | null;
  setPlay?: React.Dispatch<React.SetStateAction<Play | null>> | null;
}

export const LittleBoard = ({
  globalRow,
  globalCol,
  play,
  setPlay,
}: LittleBoardProps) => {
  // variable to define the globalRow and globalCol for next board to play
  const nextBoardToPlay = play?.nextBoardToPlay();

  const onClickCell = (
    localRow: number,
    localCol: number,
    globalRow: number,
    globalCol: number
  ) => {
    if (play && play.canPlay({ globalRow, globalCol, localRow, localCol })) {
      //Get the current player
      const currentPlayer = play.currentPlayer.clone();
      //Play the move
      const newPlay = play.clone(); // Create a new copy of play
      newPlay.setCell(
        { globalRow, globalCol, localRow, localCol },
        currentPlayer.symbol as "X" | "O"
      );
      //Update the gameboard
      newPlay.updateBoard(
        globalRow,
        globalCol,
        newPlay.getOneBoard(globalRow, globalCol)
      );
      // Update the last move of the player
      currentPlayer.setLastMove({ globalRow, globalCol, localRow, localCol });

      // Update the player in newPlay
      if (currentPlayer.symbol === "X") {
        newPlay.player1 = currentPlayer;
      } else {
        newPlay.player2 = currentPlayer;
      }

      // Update the current player
      newPlay.currentPlayer =
        currentPlayer.symbol === "X" ? newPlay.player2 : newPlay.player1;

      // Next board to play
      newPlay.nextBoardToPlay();

      // Check if the board is winning
      newPlay.oneBoardIsWinning(globalRow, globalCol);
      // console.log(newPlay.oneBoardIsWinning(globalRow, globalCol).isWin); // true or false
      // console.log(newPlay.oneBoardIsWinning(globalRow, globalCol).playerWin); // "X" or other player
      setPlay?.(newPlay); // Update the state with the new copy
    }
  };

  const oneCell = `w-20 h-20 border border-[#7E6D6D] flex justify-center items-center cursor-pointer ${
    (nextBoardToPlay?.localRow === globalRow &&
      nextBoardToPlay?.localCol === globalCol) ||
    (nextBoardToPlay?.localRow === -2 && nextBoardToPlay?.localCol === -2)
      ? "hover:bg-[#7b89d2]"
      : ""
  }`;

  return (
    <div
      style={{
        backgroundColor:
          (nextBoardToPlay?.localRow === globalRow &&
            nextBoardToPlay?.localCol === globalCol) ||
          (nextBoardToPlay?.localRow === -2 && nextBoardToPlay?.localCol === -2)
            ? "#a6add2"
            : "",
      }}
      className={`grid grid-cols-3 grid-rows-3 border-2 border-black w-fit`}
    >
      {Array(9)
        .fill(null)
        .map((_, index) => {
          const localRow = Math.floor(index / 3);
          const localCol = index % 3;
          const cellValue = play?.getCell({
            globalRow,
            globalCol,
            localRow,
            localCol,
          });

          const keyInt = `${globalRow}-${globalCol}-${localRow}-${localCol}-${index}`;

          if (cellValue === "X") {
            return (
              <div key={keyInt} className={oneCell}>
                <PlayerX typeSize="medium" />
              </div>
            );
          } else if (cellValue === "O") {
            return (
              <div key={keyInt} className={oneCell}>
                <PlayerO typeSize="medium" />
              </div>
            );
          } else {
            return (
              <div
                onClick={() =>
                  onClickCell(localRow, localCol, globalRow, globalCol)
                }
                key={keyInt}
                className={oneCell}
              ></div>
            );
          }
        })}
    </div>
  );
};
