const size = [
  {
    type: "small",
    width: 16,
    height: 16,
  },
  {
    type: "medium",
    width: 48,
    height: 48,
  },
  {
    type: "large",
    width: 200,
    height: 200,
  },
];

interface PlayerProps {
  typeSize: string;
}

interface SizeConfig {
  type: string;
  width: number;
  height: number;
}

export const PlayerX = ({ typeSize }: PlayerProps) => {
  const sizeConfig: SizeConfig =
    size.find((s) => s.type === typeSize) || size[0];

  return (
    <div
      style={{
        width: `${sizeConfig.width}px`,
        height: `${sizeConfig.height}px`,
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "4px",
          backgroundColor: "#0FB900",
          position: "absolute",
          top: "50%",
          left: "0",
          transform: "rotate(45deg)",
        }}
      />
      <div
        style={{
          width: "100%",
          height: "4px",
          backgroundColor: "#0FB900",
          position: "absolute",
          top: "50%",
          left: "0",
          transform: "rotate(-45deg)",
        }}
      />
    </div>
  );
};

export const PlayerO = ({ typeSize }: PlayerProps) => {
  const sizeConfig: SizeConfig =
    size.find((s) => s.type === typeSize) || size[0];

  return (
    <div
      style={{
        width: `${sizeConfig.width}px`,
        height: `${sizeConfig.height}px`,
      }}
      className="border-2 rounded-full border-[#FF0505]"
    ></div>
  );
};
