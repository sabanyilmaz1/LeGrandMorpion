import { useContext } from "react";
import { LittleBoard } from "./LittleBoard";
import { PlayContext } from "../PlayContext";
import { PlayerO, PlayerX } from "../../../components/Players";

export const GameBoard = () => {
  const { play, setPlay } = useContext(PlayContext);

  // const oneBoardIsWinning = play?.oneBoardIsWinning(globalRow, globalCol).isWin
  // ? "bg-green-200"
  // : "";

  return (
    <div className="w-fit grid grid-rows-3 border-4 border-[#D9D9D9]">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="grid grid-cols-3 border-2 border-black">
          {[...Array(3)].map((_, j) => {
            const oneBoardIsWinning = play?.oneBoardIsWinning(i, j).isWin;
            if (oneBoardIsWinning) {
              return (
                <LittleBoardWinning
                  playerWin={play?.oneBoardIsWinning(i, j).playerWin}
                  key={`${i}-${j}`}
                />
              );
            }
            return (
              <LittleBoard
                key={`${i}-${j}`}
                globalRow={i}
                globalCol={j}
                play={play}
                setPlay={setPlay}
              />
            );

            // Vous pouvez retourner quelque chose d'autre si la condition n'est pas remplie
            // ou ne rien retourner du tout
          })}
        </div>
      ))}
    </div>
  );
};

const LittleBoardWinning = ({ playerWin }: { playerWin: string }) => {
  return (
    <div
      style={{ backgroundColor: playerWin === "X" ? "#a2c69f" : "#d79898" }}
      className=" h-[244px] w-[244px] flex justify-center items-center border-4 border-black"
    >
      {playerWin === "X" ? (
        <PlayerX typeSize="large" />
      ) : (
        <PlayerO typeSize="large" />
      )}
    </div>
  );
};
