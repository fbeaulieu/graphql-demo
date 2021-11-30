import { Container } from 'reactstrap';
import logo from './logo.svg';
import './App.css';
import TravelerList from './components/travelers.component';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container>
      <div className="App">
        <header className="App-header">
          <img src={logo} height="100" width="100" className="App-logo" alt="logo" />
          <p>
            GRAPHQL-DEMO
          </p>
        </header>
        <br />
        <br />
        <TravelerList />
      </div>
    </Container>
  );
}

export default App;
