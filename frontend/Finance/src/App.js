import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import TuitionFeeDetials from "./components/TuitionFeeDetails"
import {BrowserRouter as Router,Route} from "react-router-dom"
import DisplayTuitionFee from "./components/DisplayTuitionFee"
import updateTuitionFee from "./components/updateTuitionFee"
import InsertPettyExpenses from './components/InsertPettyExpenses';
import DisplayPettyExpenses from './components/DisplayPettyExpenses';
import updatePettyExpenses from './components/updatePettyExpenses';


function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Route path="/add" exact component={TuitionFeeDetials}/>
        <Route path="/list" exact component={DisplayTuitionFee}/>
        <Route path="/updateTuitionFee/:id" exact component={updateTuitionFee}/>
        <Route path="/addExpenses" exact component={InsertPettyExpenses}/>
        <Route path="/listExpenses" exact component={DisplayPettyExpenses}/>
        <Route path="/updatePettyExpenses/:id" exact component={updatePettyExpenses}/>
        
      </div>
    </Router>
    
  );
}

export default App;
