/*import React,{useState} from 'react'
import axios from "axios";

export default function AddFeeDetails(){

    const [TeacherId,setTeacherId]=useState("");
    const [Teachername,setTeacherName]=useState("");
    const [subjectId,setSubjectId]=useState("");
    const [subjectName,setSubjectName]=useState("");
    const [Amount,setAmount]=useState("");

    function sendData(e){
        //preventDefault() is used to stop doing the allocated task in submit
        e.preventDefault();
        
        const newFeeDetails ={
            TeacherId,
            Teachername,
            subjectId,
            subjectName,
            Amount,
        }
        //console.log(newFeeDetails)
        //adding data
        axios.post("http://localhost:8070/feeDetails/add",newFeeDetails).then(()=>{
            alert("Fee details added")
        }).catch((err)=>{
            alert(err);
            console.log(err)
        })

    }


    return(
        <div className="m-24 p-3 border-1 border-gray-400 ...">
            <form onSubmit={sendData}>
            <div class="form-group">
                <label for="TeacherId" class="form-label">Teacher Id</label>
                <input type="text" class="form-control"  id="TeacherId" placeholder="Enter Teacher Id" 
                onChange={(e)=>{
                    setTeacherId(e.target.value);
                }}></input>
                
            </div>
            <div class="form-group">
                <label for="Name" class="form-label">Teacher name</label>
                <input type="text" class="form-control" id="Name" placeholder="Enter Name"
                onChange={(e)=>{
                    setTeacherName(e.target.value);
                }}></input>
                
            </div>
            <div class="form-group">
                <label for="SubjectID" class="form-label">Suject Id</label>
                <input type="text" class="form-control" id="subjectID" placeholder="Enter Subject ID"
                onChange={(e)=>{
                    setSubjectId(e.target.value);
                }}></input>
                
            </div>
            <div class="form-group">
                <label for="SubjectName" class="form-label">Suject Name</label>
                <input type="text" class="form-control" id="SubjectName" placeholder="Enter Subject Name"
                onChange={(e)=>{
                    setSubjectName(e.target.value);
                }}></input>
                
            </div>
            <div class="form-group">
                <label for="Amount" class="form-label">Amount</label>
                <input type="text" class="form-control" id="Amount" placeholder="Enter amount"
                onChange={(e)=>{
                    setAmount(e.target.value);
                }}></input>
                
            </div>
            <br></br>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>







        
    )
}*/

import React, { Component} from 'react';

import axios from 'axios';
import { Form } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class TuitionFeeDetails extends Component{
    constructor(props) {
        super(props);

        //this.onChangeTeacherId = this.onChangeTeacherId.bind(this);
        //this.onChangeTeachername = this.onChangeTeachername.bind(this);
        //this.onChangesubjectId = this.onChangesubjectId.bind(this);
        //this.onChangesubjectName = this.onChangesubjectName.bind(this);
        //this.onChangeAmount = this.onChangeAmount.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);
        

        this.state = {
            TeacherId: '',
            Teachername: '',
            subjectId:'',
            subjectName:'',
            Amount:'',
            feeDetails: [],
            TeacherIdError:'',
            TeachernameError:'',
            subjectIdError:'',
            AmountError:''

        }
    }  
    
    //componentDitMount called automatically called right before anything display on the page
    componentDidMount(){
        this.setState({
            feeDetails:['test user'],
            name : 'test user'
        })
    }
    
    
    onChangeTeacherId=(e)=>{
        this.setState({
            TeacherId: e.target.value
        });
    }
    onChangeTeachername=(e)=>{
        this.setState({
            Teachername: e.target.value
        });
    }
    onChangesubjectId=(e)=>{
        this.setState({
            subjectId: e.target.value
        });
    }
    onChangesubjectName=(e)=>{
        this.setState({
            subjectName: e.target.value
        });
    } 
    onChangeAmount=(e)=>{
        this.setState({
            Amount: e.target.value
        });
    }
    //validation part
    validate=()=>{

        let TeacherIdError='';
        let TeachernameError='';
        let subjectIdError='';
        let AmountError='';

        if(!this.state.TeacherId){
            TeacherIdError="Teacher Id cannot be empty";
        }
        if(!this.state.Teachername){
            TeachernameError="Teacher name cannot be empty";
        }
        if(!this.state.subjectId){
            subjectIdError="Subject ID cannot be empty";
        }
        if(!this.state.Amount){
            AmountError="Amount cannot be empty";
        }

        if(TeacherIdError || TeachernameError || subjectIdError || AmountError){
            this.setState({TeacherIdError,TeachernameError,subjectIdError,AmountError});
            return false;
        }

        return true;



    } 
   

    onSubmit=(e)=>{
        e.preventDefault();

        //changed barrow to some name
        const feeDetails ={
            TeacherId:this.state.TeacherId,
            Teachername:this.state.Teachername,
            subjectId:this.state.subjectId,
            subjectName:this.state.subjectName,
            Amount:this.state.Amount,
        }

        const isValid = this.validate()

        if(isValid){
        axios.post('http://localhost:8070/feeDetails/add',feeDetails)
        .then(()=>{
            alert("New Fee Details Added")
        }).catch((err)=>{
            alert(err)
        })
    }
}
    

 render(){
        return(

            <div className="m-24 p-3 border-1 border-gray-400 ...">
                <h3><b>Add Fee details</b></h3>
            <form onSubmit={this.onSubmit}>
            <div class="form-group">
                <label for="TeacherId" class="form-label">Teacher Id</label>
                <input type="text" class="form-control"  id="TeacherId" placeholder="Enter Teacher Id"
                value={this.state.TeacherId}
                onChange={this.onChangeTeacherId}></input>
                <div style={{color:"red"}}>
                    {this.state.TeacherIdError}
                </div>   
                
            </div>
            <div class="form-group">
                <label for="Name" class="form-label">Teacher name</label>
                <input type="text" class="form-control" id="Name" placeholder="Enter Name"
                value={this.state.Teachername}
                onChange={this.onChangeTeachername}></input>
                <div style={{color:"red"}}>
                    {this.state.TeachernameError}
                </div>   
                
            </div>
            <div class="form-group">
                <label for="SubjectID" class="form-label">Suject Id</label>
                <input type="text" class="form-control" id="subjectID" placeholder="Enter Subject ID"
                value={this.state.subjectId}
                onChange={this.onChangesubjectId} required></input>
                <div style={{color:"red"}}>
                    {this.state.subjectIdError}
                </div>   
                
            </div>
            <div class="form-group">
                <label for="SubjectName" class="form-label">Suject Name</label>
                <input type="text" class="form-control" id="SubjectName" placeholder="Enter Subject Name"
                value={this.state.subjectName}
                onChange={this.onChangesubjectName}></input>
                
            </div>
            <div class="form-group">
                <label for="Amount" class="form-label">Amount</label>
                <input type="text" class="form-control" id="Amount" placeholder="Enter amount"
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
                <Link to ={"/listTFeeDetails"}>View Details</Link></td>
            </div>
            </form>
        </div>







        )
    }

}