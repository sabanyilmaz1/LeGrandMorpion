import { PlayerX } from "../../components/Players";

export const Turn = () => {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-4 p-4 text-4xl rounded-3xl w-[280px] max-w-[200px]"
      style={{ backgroundColor: "#D9D9D9" }}
    >
      <p className="font-bold">Tour : </p>
      <p>
        <PlayerX typeSize="medium" />
      </p>
    </div>
  );
};
