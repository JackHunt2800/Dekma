import React,{ Component} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';

//report
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const generatePDF = feeDetails=> {

    const doc = new jsPDF();
    const tableColumn = ["TeacherID", "Teacher name", "Subject ID","Subject name","Amount"];
    const tableRows = [];
   

    feeDetails.map(Fee => {
        const FeeData = [
            Fee.TeacherId,
            Fee.Teachername,
            Fee.subjectId,
            Fee.subjectName,
            Fee.Amount,
             
        ];
        tableRows.push(FeeData);
    })
   
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
    doc.save("Book Details Report.pdf");
};

const TuitionFeeDetail = props =>(
    <tr>
        <td>{props.feeDetails.TeacherId}</td>
        <td>{props.feeDetails.Teachername}</td>
        <td>{props.feeDetails.subjectId}</td>
        <td>{props.feeDetails.subjectName}</td>
        <td>{props.feeDetails.Amount}</td>
        
     
        {/*<td >

        <Link to ={"/updateTuitionFee/"+props.feeDetails._id}>Edit details</Link> | <a href="#" onClick={() => { props.DeleteTuitionFee(props.feeDetails._id)}}>Delete</a></td>
        */}
      <td>
             <a className="btn btn-warning" href={`/updateTuitionFee/${props.feeDetails._id}`}>
                 <i className="fas fa-edit"></i>&nbsp;Edit
            </a>
             &nbsp;
           <a className="btn btn-danger" href="#" onClick={()=>{ props.DeleteTuitionFee(props.feeDetails._id) }}>
                 <i className="far fa-trash-alt"></i>&nbsp;Delete
            </a>
      </td>
      </tr>
)

export default class DisplayTuitionFee extends Component{
    constructor(props){
        super(props);

        this.DeleteTuitionFee = this.DeleteTuitionFee.bind(this);
        this.state = {feeDetails: []}
    }

    componentDidMount(){
        axios.get('http://localhost:8070/feeDetails/')
        .then(response => {
            this.setState({feeDetails: response.data})
        })
        .catch((error) =>{
         console.log(error);
        })
    }

    DeleteTuitionFee(id){
        axios.delete('http://localhost:8070/feeDetails/delete/'+id)
        .then(res => console.log(res.data));

        this.setState({
            feeDetails: this.state.feeDetails.filter(el => el._id !== id)
        })
    }

    //search
    filterData(feeDetails,searchKey){

        const result = feeDetails.filter((Fee)=>

        Fee.TeacherId.toLowerCase().includes(searchKey)||
        Fee.Teachername.toLowerCase().includes(searchKey)||
        Fee.subjectId.toLowerCase().includes(searchKey)||
        Fee.subjectName.toLowerCase().includes(searchKey)
       
        )

        this.setState({feeDetails:result})

    }

    handleSearchArea = (e) =>{
          const searchKey = e.currentTarget.value;
          axios.get('http://localhost:8070/feeDetails/').then(res =>{

            this.filterData(res.data,searchKey)
        })

      }

    CurrentTuitionFeeTable(){
        return this.state.feeDetails.map(currentexercise => {

            return <TuitionFeeDetail feeDetails={currentexercise} DeleteTuitionFee={this.DeleteTuitionFee} key={currentexercise._id}/>

        })

    }

    

   render(){
       return (

           <div  className = "container" className="m-20 border-1 border-gray-400 ... ">
               <h3>Tuition Fee Details</h3>
               <br></br>
               <div className="container">
            <div className="row">
            <div className="col-lg-9 mt-2 mb-2"/>
            <div className="col-lg-3 mt-2 mb-2">

            <input className="form-control" type="search" placeholder="Search" name="searchEmployee" onChange={this.handleSearchArea}>                                
            </input>
            </div>
            </div>
               
               <table  className="table">
                   <thead className="thead-light">
                       <tr>
                       <th>Teacher ID</th>
                       <th>Teacher name</th>
                       <th>Subject ID</th>
                       <th>Subject Name</th>
                       <th>Amount</th>

                       </tr>
                       </thead>
                       <tbody>
                           {this.CurrentTuitionFeeTable()  }
                       </tbody>
               </table>
           </div>
           <div class="button">
         <button type ="button" class = "btn btn-secondary btn-sm" onClick={()=> generatePDF(this.state.feeDetails)}>Generate Report</button>
        </div>
           </div>
       )
   }
}