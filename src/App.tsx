import { useEffect, useReducer } from "react";
import Content from "./Content";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";

interface QuestionI {
  correctOption: number;
  options: string[];
  points: number;
  question: string;
}

type StatusT = "Loading" | "Error" | "Active" | "Ready" | "Finished";

interface IntialStateI {
  questions: QuestionI[];
  status: StatusT;
}

const intialState: IntialStateI = {
  questions: [],
  status: "Loading",
};

type DataReceived = { type: "dataReceived"; payload: QuestionI[] };
type DataFailed = { type: "dataFailed" };
type ActionType = DataReceived | DataFailed;

const reducers = (state: IntialStateI, action: ActionType): IntialStateI => {
  const { type } = action;
  switch (type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "Ready" };
    case "dataFailed":
      return { ...state, status: "Error" };
    default:
      return state;
  }
};

const App = () => {
  const [{ status }, dispatch] = useReducer(reducers, intialState);

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
      </Content>
    </div>
  );
};

export default App;
