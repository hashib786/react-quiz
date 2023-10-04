import { ActionType } from "./App";

type Props = {
  points: number;
  maxPossiblePoints: number;
  highScore: number;
  dispatch: (value: ActionType) => void;
};

const FinishedScreen = ({
  points,
  maxPossiblePoints,
  highScore,
  dispatch,
}: Props) => {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(HighScore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reStart" })}
      >
        Restart
      </button>
    </>
  );
};

export default FinishedScreen;
