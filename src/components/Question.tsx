import { ActionType, QuestionI } from "./App";
import Options from "./Options";

type Props = {
  question: QuestionI;
  dispatch: (value: ActionType) => void;
  answer: number | null;
};

const Question = ({ question, dispatch, answer }: Props) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options answer={answer} dispatch={dispatch} question={question} />
    </div>
  );
};

export default Question;
