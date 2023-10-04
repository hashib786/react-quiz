import { ActionType, QuestionI } from "./App";

type Props = {
  question: QuestionI;
  dispatch: (value: ActionType) => void;
  answer: number | null;
};

const Options = ({ question, dispatch, answer }: Props) => {
  const hasAnswer = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          disabled={hasAnswer}
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            hasAnswer
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() =>
            dispatch({
              type: "newAnswer",
              payload: i,
            })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
