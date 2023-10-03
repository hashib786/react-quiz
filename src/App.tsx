import { useEffect } from "react";
import Content from "./Content";
import Header from "./Header";

const App = () => {
  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then(console.log)
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
