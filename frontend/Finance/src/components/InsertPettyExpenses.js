import React, { Component} from 'react';

import axios from 'axios';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class InsertPettyExpenses extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            Date: new Date(),
            itemName:'',
            Category:'',
            Amount:'',
            feeDetails: [] 

        }
    }  
    
    //componentDitMount called automatically called right before anything display on the page
    componentDidMount(){
        this.setState({
            pettyCash:['test user'],
            name : 'test user'
        })
    }
    
    
    onChangeDate=(date)=>{
        this.setState({
            Date: date
        });
    }
    onChangeitemName=(e)=>{
        this.setState({
            itemName: e.target.value
        });
    }
    onChangeCategory=(e)=>{
        this.setState({
            Category: e.target.value
        });
    }
    onChangeAmount=(e)=>{
        this.setState({
            Amount: e.target.value
        });
    } 
     
   

    onSubmit=(e)=>{
        e.preventDefault();

        //changed barrow to some name
        const pettyCash ={
            Date:this.state.Date,
            itemName:this.state.itemName,
            Category:this.state.Category,
            Amount:this.state.Amount,
        }

        
        axios.post('http://localhost:8070/pettyCash/add',pettyCash)
        .then(()=>{
            alert("Expense added")
        }).catch((err)=>{
            alert(err)
        })
    }
    

 render(){
        return(

            <div className="m-24 p-3 border-1 border-gray-400 ...">
                <h3>Add Expenses</h3>
            <form onSubmit={this.onSubmit}>
            
            <div className="form-grouo">
                         
                <label>Date Barrowed</label> 
                    <div >
                         <DatePicker className="border-2 ..."
                        selected={this.state.Date}
                        onChange={this.onChangeDate}
                        />     
                    </div >  
            </div>
            <div class="form-group">
                <label for="Name" class="form-label">Item Name</label>
                <input type="text" class="form-control"  id="Name" placeholder="Enter Item Name"
                value={this.state.itemName}
                onChange={this.onChangeitemName}></input>
                
            </div>
            <div class="form-group">
                <label for="Category" class="form-label">Category</label>
                <input type="text" class="form-control" id="Category" placeholder="Enter Category"
                value={this.state.Category}
                onChange={this.onChangeCategory}></input>
                
            </div>
            <div class="form-group">
                <label for="Amount" class="form-label">Amount</label>
                <input type="text" class="form-control" id="Amount" placeholder="Enter Amount"
                value={this.state.Amount}
                onChange={this.onChangeAmount}></input>
                
            </div>
            
            <br></br>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>







        )

    }

}