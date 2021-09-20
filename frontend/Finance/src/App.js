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
import StuPayment from './components/StuPayment'


function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Route path="/addTFeeDetails" exact component={TuitionFeeDetials}/>
        <Route path="/listTFeeDetails" exact component={DisplayTuitionFee}/>
        <Route path="/updateTuitionFee/:id" exact component={updateTuitionFee}/>
        <Route path="/addExpenses" exact component={InsertPettyExpenses}/>
        <Route path="/listExpenses" exact component={DisplayPettyExpenses}/>
        <Route path="/updatePettyExpenses/:id" exact component={updatePettyExpenses}/>
        <Route path="/addStuPayment" exact component={StuPayment}/>


        
      </div>
    </Router>
    
  );
}

export default App;
