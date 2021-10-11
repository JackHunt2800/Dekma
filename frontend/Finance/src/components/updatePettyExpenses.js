import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert2";


export default class EditPettyExpenses extends Component{
    constructor(props) {
        super(props);
         
        this.state = {
            Date: new Date(),
            itemName:'',
            Category:'',
            Amount:'',
            pettyCash: [] 

        }
    
    }

    componentDidMount(){
        axios.get('http://localhost:8070/pettyCash/'+this.props.match.params.id)
        .then(response => {
            this.setState({
            
            
                Date: new Date(response.data.Date),
                itemName: response.data.itemName,
                Category:response.data.Category,
                subjectName:response.data.subjectName,
                Amount:response.data.Amount,
                
               })
        })
        .catch(function (error){
            console.log(error);
        })
    }
    
    onChangeDate=(date)=>{
        this.setState({
            Date : date
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
    onChangesubjectName=(e)=>{
        this.setState({
            subjectName : e.target.value
        });
    }
    onChangeAmount=(e)=>{
        this.setState({
            Amount : e.target.value.replace(/\D/g,'')
        });
    }
   
    
    onSubmit=(e)=>{
        e.preventDefault();
        const PettyCash ={

            Date: this.state.Date,
            itemName: this.state.itemName,
            Category:this.state.Category,
            subjectName:this.state.subjectName,
            Amount:this.state.Amount,
            
        }

    
       console.log(PettyCash);

       axios.put('http://localhost:8070/pettyCash/update/'+this.props.match.params.id ,PettyCash)
       .then(res => console.log(res.data));

       swal.fire("Updated","Expense details updated successfully!","success")

       window.location='/listExpenses'; 
        
    }



    render(){

        return(

            <div className="m-8 ..."style={{backgroundColor:"rgb(200,200,200,0.5)", padding:"20px 50px 20px 50px", marginTop:"50px",marginBottom:"50px", borderRadius:"30px"}}>
                <h3>Add Expenses</h3>
            <form onSubmit={this.onSubmit}>
            
            <div className="form-group">
                         
                <label>Payment date</label> 
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
            <button type="submit" class="btn btn-primary">Update</button>
            
            </form>
        </div>           
        )
    }
}