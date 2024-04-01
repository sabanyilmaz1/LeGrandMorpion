import { QuestionMarkCircleIcon } from "@heroicons/react/16/solid";
import { GameBoard } from "../../feature/play/GameBoard";
import { Turn } from "../../feature/play/Turn";

export const Play = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* Title */}
        <h1 className="text-4xl font-bold">Grand Morphion</h1>
        {/* Help Buttons */}
        <QuestionMarkCircleIcon className="w-16 h-16" />
      </div>
      {/* Game */}
      <div className="flex items-start gap-4 mt-6">
        {/* Turn */}
        <Turn />
        {/* GameBoard */}
        <GameBoard />
      </div>
    </div>
  );
};
