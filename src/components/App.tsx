import { useEffect, useReducer } from "react";
import Content from "./Content";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";

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
  highScore: number;
}

const intialState: IntialStateI = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};

export type ActionType =
  | { type: "dataReceived"; payload: QuestionI[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "reStart" };

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
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "Finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "reStart":
      return { ...state, index: 0, answer: null, points: 0, status: "Ready" };
    default:
      return state;
  }
};

const App = () => {
  const [{ status, questions, index, answer, points, highScore }, dispatch] =
    useReducer(reducers, intialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

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
          <>
            <Progress
              index={index}
              answer={answer}
              points={points}
              numQuestions={numQuestions}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              answer={answer}
              dispatch={dispatch}
              question={questions[index]}
            />
            <NextQuestion
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
        {status === "Finished" && (
          <FinishedScreen
            highScore={highScore}
            maxPossiblePoints={maxPossiblePoints}
            points={points}
            dispatch={dispatch}
          />
        )}
      </Content>
    </div>
  );
};

export default App;
