import { ActionType } from "./App";

type Props = {
  numQuestions: number;
  dispatch: (value: ActionType) => void;
};

const StartScreen = ({ numQuestions, dispatch }: Props) => {
  return (
    <div className="start">
      <h2>Welcome to React Quiz</h2>
      <h3>{numQuestions} question is test for your react skill</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
};

export default StartScreen;
