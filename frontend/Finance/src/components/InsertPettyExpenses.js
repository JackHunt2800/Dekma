import React, { Component} from 'react';

import axios from 'axios';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {Link} from 'react-router-dom';
import swal from "sweetalert2";

export default class InsertPettyExpenses extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            Date: new Date(),
            itemName:'',
            Category:'',
            Amount:'',
            pettyCash: [],
            //DateError:'',
            itemNameError:'',
            CategoryError:'',
            AmountError:''



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
            Amount: e.target.value.replace(/\D/g,'')
        });
    }
    
    validate=()=>{

        //let DateError='';
        let itemNameError='';
        let CategoryError='';
        let AmountError='';

        /*if(!this.state.Date){
            DateError="Date cannot be empty"
        }*/
        if(!this.state.itemName){
            itemNameError="Item name cannot be empty"
        }
        if(!this.state.Category){
            CategoryError="Category cannot be empty"
        }
        if(!this.state.Amount){
            AmountError="Amount cannot be empty"
        }

        if(itemNameError || CategoryError || AmountError){
            this.setState({itemNameError,CategoryError,AmountError})
            return false;
        }

        return true;


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

        const isValid = this.validate()
        if(isValid){
        axios.post('http://localhost:8070/pettyCash/add',pettyCash)
        swal.fire("Inserted","Expense added successfully!","success")
        .then(()=>{
            //alert("Expense added");
            this.setState({
                Date:"",
                itemName:"",
                Category:"",
                Amount:"",
            })

        }).catch((err)=>{
            alert(err)
        })
    }
}

    

 render(){
        return(

            <div className="m-8 ..."style={{backgroundColor:"rgb(200,200,200,0.5)", padding:"20px 50px 20px 50px", marginTop:"50px",marginBottom:"50px", borderRadius:"30px"}}>
                <h3><b>Add Expenses</b></h3>
            <form onSubmit={this.onSubmit}>
            
            <div className="form-group">
                         
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
                <div style={{color:"red"}}>
                    {this.state.itemNameError}
                </div>
                
            </div>
            {/*<div class="form-group">
                <label for="Category" class="form-label">Category</label>
                <input type="text" class="form-control" id="Category" placeholder="Enter Category"
                value={this.state.Category}
                onChange={this.onChangeCategory}></input>
                <div style={{color:"red"}}>
                    {this.state.CategoryError}
                </div>
                
        </div>*/}
            <div className="form-group" className="mt-3.5 mb-3.5 ...">
            <label for="Category" class="form-label" className="mr-2 ...">Category</label>
                <input list="category" type="text"
                value={this.state.Category}
                onChange={this.onChangeCategory}/>
                    <datalist id="category">
                        <option value="Food"></option>
                        <option value="stationary"></option>
                        <option value="Transport"></option>
                        <option value="Postage"></option>
                        <option value="Other"></option>

                    </datalist>
               
                <div style={{color:"red"}}>
                    {this.state.CategoryError}
                </div>
                

            </div>
            <div class="form-group">
                <label for="Amount" class="form-label">Amount</label>
                <input type="text" class="form-control" id="Amount" placeholder="Enter Amount"
                value={this.state.Amount}
                onChange={this.onChangeAmount}></input>
                <div style={{color:"red"}}>
                    {this.state.AmountError}
                </div>
                
            </div>
            
            <br></br>
            <button type="submit" class="btn btn-primary">Submit</button>
            <div className="float-right ...">
            <td >
                <Link to ={"/listExpenses"}>View Details</Link></td>
            </div>
            </form>
        </div>







        )

    }

}