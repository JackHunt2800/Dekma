import React,{ Component} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';

const PettyExpenses = props =>(
    <tr>
        <td>{props.pettyCash.Date}</td>
        <td>{props.pettyCash.itemName}</td>
        <td>{props.pettyCash.Category}</td>
        <td>{props.pettyCash.Amount}</td>
        
     
        {/*<td >
        <Link to ={"/updateTuitionFee/"+props.pettyCash._id}>Edit details</Link> | <a href="#" onClick={() => { props.DeletePettyExpenses(props.pettyCash._id)}}>Delete</a></td>
        */}
      <td>
             <a className="btn btn-warning" href={`/updatePettyExpenses/${props.pettyCash._id}`}>
                 <i className="fas fa-edit"></i>&nbsp;Edit
            </a>
             &nbsp;
           <a className="btn btn-danger" href="#" onClick={()=>{ props.DeletePettyExpenses(props.pettyCash._id) }}>
                 <i className="far fa-trash-alt"></i>&nbsp;Delete
            </a>
      </td>
      </tr>
)

export default class DisplayPettyExpenses extends Component{
    constructor(props){
        super(props);

        this.DeletePettyExpenses = this.DeletePettyExpenses.bind(this);
        this.state = {pettyCash: []}
    }

    componentDidMount(){
        axios.get('http://localhost:8070/pettyCash/')
        .then(response => {
            this.setState({pettyCash: response.data})
        })
        .catch((error) =>{
         console.log(error);
        })
    }

    DeletePettyExpenses(id){
        axios.delete('http://localhost:8070/pettyCash/delete/'+id)
        .then(res => console.log(res.data));

        this.setState({
            pettyCash: this.state.pettyCash.filter(el => el._id !== id)
        })
    }
    CurrentPettyExpensesTable(){
        return this.state.pettyCash.map(currentexercise => {

            return <PettyExpenses pettyCash={currentexercise} DeletePettyExpenses={this.DeletePettyExpenses} key={currentexercise._id}/>

        })

    }

    

   render(){
       return (
           <div  className = "container">
               <h3>Expenses</h3>
               <table  class="table">
                   <thead className="thead-light">
                       <tr>
                       <th>Date</th>
                       <th>Item Name</th>
                       <th>Category</th>
                       <th>Amount</th>

                       </tr>
                       </thead>
                       <tbody>
                           {this.CurrentPettyExpensesTable()  }
                       </tbody>
               </table>
           </div>
       )
   }
}