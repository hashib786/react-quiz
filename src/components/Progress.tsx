type Props = {
  index: number;
  numQuestions: number;
  points: number;
  maxPossiblePoints: number;
  answer: number | null;
};

const Progress = ({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}: Props) => {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints} points
      </p>
    </header>
  );
};

export default Progress;
