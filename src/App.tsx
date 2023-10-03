import { useEffect, useReducer } from "react";
import Content from "./Content";
import Header from "./Header";

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
type ActionType = DataReceived;

const reducers = (state: IntialStateI, action: ActionType): IntialStateI => {
  const { type, payload } = action;
  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload };

    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducers, intialState);
  console.log(state, dispatch);

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data: QuestionI[]) => {
        dispatch({ type: "dataReceived", payload: data });
        console.log(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <Header />
      <Content>
        <p>Hello World</p>
      </Content>
    </div>
  );
};

export default App;
