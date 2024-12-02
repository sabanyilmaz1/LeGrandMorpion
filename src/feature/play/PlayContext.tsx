// Context for the Play feature to manage the game state

import { createContext, useState } from "react";
import { Play } from "./model/play";

// Context
export const PlayContext = createContext<{
  play: Play | null;
  setPlay: React.Dispatch<React.SetStateAction<Play | null>> | null;
}>({ play: null, setPlay: null });

// Provider
export const PlayProvider = ({ children }: { children: React.ReactNode }) => {
  const [play, setPlay] = useState<Play | null>(new Play());

  console.log(play);

  // const resetGame = () => {
  //   setPlay(new Play());
  // };

  // play?.setCell({ globalRow: 0, globalCol: 0, localRow: 0, localCol: 0 }, "X");
  // play?.setCell({ globalRow: 0, globalCol: 0, localRow: 0, localCol: 1 }, "O");
  // play?.setCell({ globalRow: 0, globalCol: 0, localRow: 0, localCol: 2 }, "X");
  // play?.setCell({ globalRow: 0, globalCol: 0, localRow: 1, localCol: 0 }, "O");
  // play?.setCell({ globalRow: 0, globalCol: 0, localRow: 1, localCol: 1 }, "X");
  // play?.setCell({ globalRow: 2, globalCol: 2, localRow: 2, localCol: 2 }, "X");

  return (
    <PlayContext.Provider value={{ play, setPlay }}>
      {children}
    </PlayContext.Provider>
  );
};
