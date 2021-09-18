import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import TuitionFeeDetials from "./components/TuitionFeeDetails"
import {BrowserRouter as Router,Route} from "react-router-dom"

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Route path="/add" exact component={TuitionFeeDetials}/>
      </div>
    </Router>
    
  );
}

export default App;
