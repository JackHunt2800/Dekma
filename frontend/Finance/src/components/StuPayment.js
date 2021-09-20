import React, { Component} from 'react';

import axios from 'axios';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class InsertStudentPayment extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            ClassId:'',
            StudentId:'',
            SubjectName:'',
            PaymentDate:new Date(),
            Amount:'',
            stuPayment: [],
            ClassIdError:'',
            StudentIdError:'',
            SubjectNameError:'',
            AmountError:''
             

        }
    }  
    
    //componentDitMount called automatically called right before anything display on the page
    componentDidMount(){
        this.setState({
            stuPayment:['test user'],
            name : 'test user'
        })
    }
    
    
    onChangeDate=(date)=>{
        this.setState({
            PaymentDate: date
        });
    }
    onChangeClassId=(e)=>{
        this.setState({
            ClassId: e.target.value
        });
    }
    onChangeStudentId=(e)=>{
        this.setState({
            StudentId: e.target.value
        });
    }
    onChangeSubjectName=(e)=>{
        this.setState({
            SubjectName: e.target.value
        });
    }
    onChangeAmount=(e)=>{
        this.setState({
            Amount: e.target.value
        });
    }
    
    //validation part
    validate=()=>{

        let ClassIdError='';
        let StudentIdError='';
        let SubjectNameError='';
        let AmountError='';

        if(!this.state.ClassId){
            ClassIdError="Class Id cannot be empty";
        }
        if(!this.state.StudentId){
            StudentIdError="Student id cannot be empty";
        }
        if(!this.state.SubjectName){
            SubjectNameError="Subject name cannot be empty"
        }
        if(!this.state.Amount){
            AmountError="Amount cannot be empty"
        }

        if(ClassIdError||StudentIdError||SubjectNameError||AmountError){
            this.setState({ClassIdError,StudentIdError,SubjectNameError,AmountError})
            return false;
        }

        return true;
        
    }
     
   

    onSubmit=(e)=>{
        e.preventDefault();

        //changed barrow to some name
        const stuPayment ={
            
            ClassId:this.state.ClassId,
            StudentId:this.state.StudentId,
            SubjectName:this.state.SubjectName,
            PaymentDate:this.state.PaymentDate,
            Amount:this.state.Amount,
        }

        const isValid = this.validate()
        if(isValid){
        axios.post('http://localhost:8070/stuPayment/add',stuPayment)
        .then(()=>{
            alert("Expense added")
        }).catch((err)=>{
            alert(err)
        })
    }
}
    

 render(){
        return(

            <div className="m-24 p-3 border-1 border-gray-400 ...">
                <h3>Add Student payment</h3>
            <form onSubmit={this.onSubmit}>
            
            <div className="form-group">
                         
                <label>Payment Date</label> 
                    <div >
                         <DatePicker className="border-2 ..."
                        selected={this.state.PaymentDate}
                        onChange={this.onChangeDate}
                        />     
                    </div >  
            </div>
            <div class="form-group">
                <label for="Name" class="form-label">Class Id</label>
                <input type="text" class="form-control"  id="Name" placeholder="Enter Class Id"
                value={this.state.ClassId}
                onChange={this.onChangeClassId}></input>
                <div style={{color:"red"}}>
                    {this.state.ClassIdError}
                </div>
                
            </div>
            <div class="form-group">
                <label for="StudentId" class="form-label">StudentId</label>
                <input type="text" class="form-control" id="StudentId" placeholder="Enter StudentId"
                value={this.state.StudentId}
                onChange={this.onChangeStudentId}></input>
                <div style={{color:"red"}}>
                    {this.state.StudentIdError}
                </div>
                
            </div>
            <div class="form-group">
                <label for="StudentId" class="form-label">Subject Name</label>
                <input type="text" class="form-control" id="StudentId" placeholder="Enter Subject name"
                value={this.state.SubjectName}
                onChange={this.onChangeSubjectName}></input>
                <div style={{color:"red"}}>
                    {this.state.SubjectNameError}
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
            </form>
        </div>







        )

    }

}