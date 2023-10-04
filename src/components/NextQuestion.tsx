import { ActionType } from "./App";

type Props = {
  dispatch: (value: ActionType) => void;
  answer: number | null;
  index: number;
  numQuestions: number;
};

const NextQuestion = ({ dispatch, answer, index, numQuestions }: Props) => {
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
};

export default NextQuestion;
