import { QuestionMarkCircleIcon } from "@heroicons/react/16/solid";
import { GameBoard } from "../../feature/play/components/GameBoard";
import { Turn } from "../../feature/play/components/Turn";

export const Play = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* Title */}
        <h1 className="text-4xl font-bold">Grand Morpion</h1>
        {/* Help Buttons */}
        <QuestionMarkCircleIcon className="w-16 h-16" />
      </div>
      {/* Game */}
      <div className="flex flex-col items-start gap-12 mt-2 lg:flex-row">
        {/* Turn */}
        <Turn />
        {/* GameBoard */}
        <GameBoard />
      </div>
    </div>
  );
};
