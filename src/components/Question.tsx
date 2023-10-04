import { QuestionI } from "./App";
import Options from "./Options";

type Props = {
  question: QuestionI;
};

const Question = ({ question }: Props) => {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
};

export default Question;
