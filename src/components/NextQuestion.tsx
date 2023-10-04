import { ActionType } from "./App";

type Props = {
  dispatch: (value: ActionType) => void;
};

const NextQuestion = ({ dispatch }: Props) => {
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
