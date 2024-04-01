import { PlayerO, PlayerX } from "../../components/Players";

const oneCell =
  "w-20 h-20 border border-[#7E6D6D] flex justify-center items-center";

export const LittleBoard = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 border-r-4 border-black w-fit">
      <div className={oneCell}>
        <PlayerO typeSize="medium" />
      </div>
      <div className={oneCell}>
        <PlayerX typeSize="medium" />
      </div>
      <div className={oneCell}></div>
      <div className={oneCell}></div>
      <div className={oneCell}></div>
      <div className={oneCell}></div>
      <div className={oneCell}></div>
      <div className={oneCell}></div>
      <div className={oneCell}></div>
    </div>
  );
};
