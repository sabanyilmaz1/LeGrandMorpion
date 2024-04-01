import { LittleBoard } from "./LittleBoard";

export const GameBoard = () => {
  return (
    <div className="w-fit grid grid-rows-3 border-4 border-[#D9D9D9]">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="grid grid-cols-3 border-b-4 border-black">
          {[...Array(3)].map((_, j) => (
            <LittleBoard key={j} />
          ))}
        </div>
      ))}
    </div>
  );
};
