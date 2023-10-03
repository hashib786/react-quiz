import Content from "./Content";
import Header from "./Header";

const App = () => {
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
