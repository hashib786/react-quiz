type Props = {
  numQuestions: number;
};

const StartScreen = ({ numQuestions }: Props) => {
  return (
    <div className="start">
      <h2>Welcome to React Quiz</h2>
      <h3>{numQuestions} question is test for your react skill</h3>
      <button className="btn btn-ui">Let's Start</button>
    </div>
  );
};

export default StartScreen;
