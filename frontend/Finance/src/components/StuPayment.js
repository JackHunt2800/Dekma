import React, { Component} from 'react';

import axios from 'axios';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert2";


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
            Amount: e.target.value.replace(/\D/g,'')
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

    //amount only inputting numbers
    
     
   

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
        swal.fire("Inserted","payment details  added successfully!","success")
        .then(()=>{
            //alert("Expense added")
            this.setState({
                ClassId:"",
                StudentId:"",
                SubjectName:"",
                //PaymentDate:"",
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
                <h3><center><b>Add Student payment</b></center></h3>
            <form onSubmit={this.onSubmit}>
            
            <div className="form-group">
                         
                <label>Payment Date</label> 
                    <div >
                         <DatePicker className="border-2 ..."
                        selected={this.state.PaymentDate}
                        onChange={this.onChangeDate}
                        maxDate={new Date()}
                        placeholderText="Select a day"
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
                onChange={this.onChangeAmount} inputMode="numeric"></input>
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