import { useContext } from "react";
import { PlayerO, PlayerX } from "../../../components/Players";
import { PlayContext } from "../PlayContext";

export const Turn = () => {
  const { play } = useContext(PlayContext);
  const currentPlayer = play?.currentPlayer.symbol;

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-4 p-4 text-4xl rounded-3xl w-[280px] max-w-[200px]"
      style={{ backgroundColor: "#D9D9D9" }}
    >
      <p className="font-bold">Tour : </p>
      <div>
        {currentPlayer === "X" ? (
          <PlayerX typeSize="medium" />
        ) : (
          <PlayerO typeSize="medium" />
        )}
      </div>
    </div>
  );
};
