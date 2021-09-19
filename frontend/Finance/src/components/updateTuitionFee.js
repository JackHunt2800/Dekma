import React, { Component } from 'react';
import axios from 'axios';



export default class EditTuitionFeeDetail extends Component{
    constructor(props) {
        super(props);
         
        this.state = {
            TeacherId: '',
            Teachername: '',
            subjectId:'',
            subjectName:'',
            Amount:'',
            FeeDetails: [] 

        }
    
    }

    componentDidMount(){
        axios.get('http://localhost:8070/feeDetails/'+this.props.match.params.id)
        .then(response => {
            this.setState({
            
            
                TeacherId: response.data.TeacherId,
                Teachername: response.data.Teachername,
                subjectId:response.data.subjectId,
                subjectName:response.data.subjectName,
                Amount:response.data.Amount,
                
               })
        })
        .catch(function (error){
            console.log(error);
        })
    }
    
    onChangeTeacherId=(e)=>{
        this.setState({
            TeacherId : e.target.value
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
            subjectName : e.target.value
        });
    }
    onChangeAmount=(e)=>{
        this.setState({
            Amount : e.target.value
        });
    }
   
    
    onSubmit=(e)=>{
        e.preventDefault();
        const FeeDetails ={

            TeacherId: this.state.TeacherId,
            Teachername: this.state.Teachername,
            subjectId:this.state.subjectId,
            subjectName:this.state.subjectName,
            Amount:this.state.Amount,
            
        }

    
       console.log(FeeDetails);

       axios.put('http://localhost:8070/feeDetails/update/'+this.props.match.params.id ,FeeDetails)
       .then(res => console.log(res.data));

       window.location='/list'; 
        
    }



    render(){

        return(
            <div className="container">
            <div>
                <h3>Edit FeeDetails</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-grouo">
                         
                         <label>Teacher ID</label> 
                         <input 
                            type="text"
                            className="form-control"
                            value={this.state.TeacherId}
                            onChange={this.onChangeTeacherId}
                            />      
                        
                    </div> 
                    <div className="form-grouo">
                         
                         <label>Teacher Name</label> 
                         <input 
                            type="text"
                            className="form-control"
                            value={this.state.Teachername}
                            onChange={this.onChangeTeachername}
                            />      
                        
                    </div> 
                    <div className="form-grouo">
                         
                         <label>Subject Id</label> 
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
                         
                         <label>Amount</label> 
                         <input 
                            type="text"
                            className="form-control"
                            value={this.state.Amount}
                            onChange={this.onChangeAmount}
                            />      
                        
                    </div>
                    
                    <br/>
                    <div className="form-group" align="center">
                            <input type="submit" value="Edit FeeDetails" className="btn btn-primary"/>
                    </div>
                     
                </form> 
             </div> 
             </div>
        )
    }
}