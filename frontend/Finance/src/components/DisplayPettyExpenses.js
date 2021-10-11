import React,{ Component} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';

//report
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import swal from "sweetalert2";


const generatePDF = pettyCash=> {

    const doc = new jsPDF();
    const tableColumn = ["Date", "Item name", "Category","Amount"];
    const tableRows = [];
   

    pettyCash.map(Fee => {
        const FeeData = [
            Fee.Date,
            Fee.itemName,
            Fee.Category,
            Fee.Amount,
             
        ];
        tableRows.push(FeeData);
    })
   
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
    doc.save("Expense Details Report.pdf");
};

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

     //search
     filterData(pettyCash,searchKey){

        const result = pettyCash.filter((exp)=>

        exp.Date.toLowerCase().includes(searchKey)||
        exp.Category.toLowerCase().includes(searchKey)
       
        )

        this.setState({pettyCash:result})

    }

    handleSearchArea = (e) =>{
          const searchKey = e.currentTarget.value;
          axios.get('http://localhost:8070/pettyCash/').then(res =>{

            this.filterData(res.data,searchKey)
        })

      }


    CurrentPettyExpensesTable(){
        return this.state.pettyCash.map(currentexercise => {

            return <PettyExpenses pettyCash={currentexercise} DeletePettyExpenses={this.DeletePettyExpenses} key={currentexercise._id}/>

        })

    }

    

   render(){
       return (
           <div>
               <div class="mt-20 ...">
            <center><b><h3>Expense Details</h3></b></center>
            </div>
           <div  className = "container" className="m-20 mt-3 ...">
          
               <br></br>
               <div className="container">
            <div className="row">
            <div className="col-lg-9 mt-2 mb-2"/>
            <div className="col-lg-3 mt-2 mb-2">

            <input className="form-control" type="search" placeholder="Search" name="searchEmployee" onChange={this.handleSearchArea}>                                
            </input>
            </div>
            </div>
            </div>
               
               <table  class="table" className="table table-hover" style={{backgroundColor:"rgb(200,200,200,0.6)",borderRadius:"20px 20px 0px 0px", marginTop:"30px"}}>
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
           <div className="button" className="mb-2 mr-0 ml-2 float-right ...">
           <button type ="button" class = "btn btn-secondary btn-sm" onClick={()=> generatePDF(this.state.pettyCash)}>Generate Report</button>
          </div>
          </div>
          </div>
           
       )
   }
}