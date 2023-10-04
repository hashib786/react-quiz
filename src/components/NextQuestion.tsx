import { ActionType } from "./App";

type Props = {
  dispatch: (value: ActionType) => void;
  answer: number | null;
};

const NextQuestion = ({ dispatch, answer }: Props) => {
  if (!answer) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
};

export default NextQuestion;
