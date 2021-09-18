import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import TuitionFeeDetials from "./components/TuitionFeeDetails"
import {BrowserRouter as Router,Route} from "react-router-dom"
import DisplayTuitionFee from './components/DisplayTuitionFee';

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Route path="/add" exact component={TuitionFeeDetials}/>
        <Route path="/list" exact component={DisplayTuitionFee}/>
      </div>
    </Router>
    
  );
}

export default App;
