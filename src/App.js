import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Container from "./components/Container";
import Select from "./components/Select";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Select />
      </Container>
    </div>
  );
}

export default App;
