import React,{useState} from 'react'
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
        <div className="m-20 ...">
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
}

/*import React, { Component} from 'react';

import axios from 'axios';
import { Form } from 'react-bootstrap';

export default class AddBarrowers extends Component{
    constructor(props) {
        super(props);

        this.onChangeTeacherId = this.onChangeTeacherId.bind(this);
        this.onChangeTeachername = this.onChangeTeachername.bind(this);
        this.onChangesubjectId = this.onChangesubjectId.bind(this);
        this.onChangesubjectName = this.onChangesubjectName.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        

        this.state = {
            TeacherId: '',
            Teachername: '',
            subjectId:'',
            subjectName:'',
            Amount:'',
            Barrowers: [] 

        }
    }  
    
    //componentDitMount called automatically called right before anything display on the page
    componentDidMount(){
        this.setState({
            Barrowers:['test user'],
            name : 'test user'
        })
    }
    
    
    onChangeTeacherId(e){
        this.setState({
            TeacherId: e.target.value
        });
    }
    onChangeTeachername(e){
        this.setState({
            Teachername: e.target.value
        });
    }
    onChangesubjectId(e){
        this.setState({
            subjectId: e.target.value
        });
    }
    onChangesubjectName(e){
        this.setState({
            subjectName: e.target.value
        });
    } 
    onChangeAmount(e){
        this.setState({
            Amount: e.target.value
        });
    } 
   

    onSubmit(e){
        e.preventDefault();

        //changed barrow to some name
        const feeDetails ={
            TeacherId:this.state.TeacherId,
            Teachername:this.state.Teachername,
            subjectID:this.state.subjectId,
            subjectName:this.state.subjectName,
            Amount:this.state.Amount,
        }

        
        axios.post('http://localhost:8070/feeDetails/add',feeDetails)
        .then(()=>{
            alert("New Barrower Added")
        }).catch((err)=>{
            alert(err)
        })
    }
    

 render(){
        return(
            <div className = "container">
                <h3>Barrowers Details</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-grouo">
                         
                         <label>Teacher Id</label> 
                         <input 
                            type="text"
                            className="form-control"
                            value={this.state.TeacherId}
                            onChange={this.onChangeTeacherId}
                            />      
                        
                    </div>
                    <div className="form-group">
                        
                        <label>Teacher Name</label>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.Teachername}
                            onChange={this.onChangeTeachername}
                            /> 
                        
                    </div>

                    <div className="form-grouo">
                         
                         <label>Subject ID</label> 
                         <input 
                            type="text"
                            className="form-control"
                            value={this.state.subjectId}
                            onChange={this.onChangesubjectId}
                            />      
                    </div>

                    <div className="form-grouo">
                         
                         <label>Subject Name</label> 
                         <input 
                            type="text"
                            className="form-control"
                            value={this.state.subjectName}
                            onChange={this.onChangesubjectName}
                            />      
                        
                    </div>
                    <div className="form-grouo">
                         
                         <label>amount</label> 
                         <input 
                            type="text"
                            className="form-control"
                            
                            value={this.state.Amount}
                            onChange={this.onChangeAmount}
                                
                            />  
                           
                            
                    </div>
                    
                    <br/>



                    

                    <div className="form-group" align="center">
                            <input type="submit" value="Insert new Barrower" className="btn btn-primary"/>
                    </div>
                     
                </form> 
             </div>
        )
    }

}*/