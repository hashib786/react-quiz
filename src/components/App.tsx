import { useEffect, useReducer } from "react";
import Content from "./Content";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

export interface QuestionI {
  correctOption: number;
  options: string[];
  points: number;
  question: string;
}

type StatusT = "Loading" | "Error" | "Active" | "Ready" | "Finished";

interface IntialStateI {
  questions: QuestionI[];
  status: StatusT;
  index: number;
  answer: null | number;
  points: number;
}

const intialState: IntialStateI = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
};

export type ActionType =
  | { type: "dataReceived"; payload: QuestionI[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "newAnswer"; payload: number };

const reducers = (state: IntialStateI, action: ActionType): IntialStateI => {
  const { type } = action;
  switch (type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "Ready" };
    case "dataFailed":
      return { ...state, status: "Error" };
    case "start":
      return { ...state, status: "Active" };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question?.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    }
    default:
      return state;
  }
};

const App = () => {
  const [{ status, questions, index, answer }, dispatch] = useReducer(
    reducers,
    intialState
  );
  const numQuestions = questions.length;

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data: QuestionI[]) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Content>
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "Ready" && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === "Active" && (
          <Question
            answer={answer}
            dispatch={dispatch}
            question={questions[index]}
          />
        )}
      </Content>
    </div>
  );
};

export default App;
