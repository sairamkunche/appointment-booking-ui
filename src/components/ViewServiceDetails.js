
import { withRouter } from "react-router";
import ProjectInbox from "./ProjectInbox";
import axios from "axios";
import LeftNavigation from "./LeftNavigation";
import TextField from "@mui/material/TextField";

import React, { useState } from 'react';
import { DatePickerComponent, DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
 import DatePicker from 'react-date-picker';


const baseUrl = "http://localhost:8080/service/bookAppointment/";
class ViewServiceDetails extends React.Component {
  
  constructor(props) {
    super(props);
    console.log(localStorage.getItem("userId"));
    console.log(localStorage.getItem("userRole"));
    this.state = {
      date:'',
      email:localStorage.getItem("email"),
      userId:  localStorage.getItem("userId"),
      userRole: localStorage.getItem("userRole"),
      projectDatas : {},
     
    };
   
  }

  componentWillMount() {
    
      axios.get("http://localhost:8080/service/getServiceById/"+this.props.match.params.id).then((res) => {
        this.setState({
          projectDatas:res.data
        })
  })
    
 
  }     

  updateDashboard=()=>{
    axios.get(baseUrl+this.props.match.params.id).then((res) => {
      this.setState({
        projectDatas:res.data
      })
})
  }

  handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    const {
      history: { push },
    } = this.props;
    push("/");
  };

  
//   navigateToBooking = (service) =>{
//     const {userId} = this.state;
//     const {
//       history: { push },
//     } = this.props;
//     push(`/getServiceById/${this.props.match.params.id}`);

//   }

  handleNewRequest = () =>{
    const {userId} = this.state;
    const {
      history: { push },
    } = this.props;
    push(`/createNewProject/${userId}`);

  }

  updateInProjectArray = (projectData) => {
    this.setState({projectDatas: this.state.projectDatas.filter(function(data) { 
      return data.projectId !== projectData.projectId
  })});
  }

  handleDate = (e) => {
    console.log(e.target.value);
    this.setState({ date: e.target.value });
  };


  bookAppointment = () => {
    const { date,email } = this.state;
    const {
      history: { push },
    } = this.props;
    // if (date === "") {
    //   this.setState({ shouldAlertDisplay: true });
    //   return;
    // }
    // this.setState({ shouldAlertDisplay: false });
    
    const reqJson={
      email:email,
      bookingId:this.props.match.params.id,
      dateTime:date
     }
    
     axios.post(baseUrl,reqJson).then((res) => {
       if(!res=='success'){
        this.setState({
         signupErrorMessage:res.data.error,
         shouldErrorMessageDisplay:true
        }) 
       }else{
         push('/dashboardLayout');
        }
     });
  };




  updateProjectArrayStatus = (index,status) => {
    this.setState(({projectDatas}) => ({
      projectDatas: [
          ...projectDatas.slice(0,index),
          {
              ...projectDatas[index],
              state: status,
          },
          ...projectDatas.slice(index+1)
      ]
  }));

  }

  

  render() {
    const {userId,userRole,projectDatas,startDate} = this.state;
  
  
    return (
      

<div className=" flex flex-col" style={{backgroundColor:'aliceBlueBlue',minHeight:'100vh'}}>
  <div style={{backgroundColor:'#000080',display:'flex',justifyContent:'center',padding:'12px',borderBottom:'1px solid white',fontSize:'24px',color:'white'}}>Appointment Booking </div>
      <div style={{display:'flex'}}>
      <LeftNavigation isFirstTime={true} handleNewRequest={this.handleNewRequest} handleLogout={this.handleLogout}/>
      <div className="flex flex-col relative w-full" style={{marginTop:'55px'}}>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
       {/* <ProjectInbox projectList={projectDatas} refreshData={this.updateDashboard}  userRole={userRole} userId={parseInt(userId)}   updateInProjectArray={this.updateInProjectArray} updateProjectArrayStatus={this.updateProjectArrayStatus}/> */}
       <div className="flex flex-col space-y-5 max-w-md mx-auto my-16 min-w-500" style={{backgroundColor:'aliceblue',padding:'30px',borderRadius:10}}>
        <h2 style={{color:'cornflowerblue',display:'flex',justifyContent:'center'}} className="text-4xl font-semibold uppercase">Book Appointment</h2>
        <TextField
          
          id="outlined-company"
          value={projectDatas.companyName}
          label="Company Name"
          autoComplete="off"
          
        />
         <TextField
          
          
          id="outlined-service"
          value={projectDatas.service}
          label="Service"
         
        />

        <TextField
          value={projectDatas.location}
          
          id="outlined-location"
          label="Location"
         
        />
        <TextField
          
          
          id="outlined-address"
          value={projectDatas.address}
          label="address"
        
        />
        <TextField
          
          
          id="outlined-phone"
          value={projectDatas.phoneNumber}
          label="Phone Number"
         
        />

    <input class='form-control' type="datetime-local" id="dat" onChange={(e) => this.handleDate(e)} name="dat"></input>

{/* <DatePicker
      selected={setHours(setMinutes(new Date(), 30), 16)}
     // onChange={(date) => setStartDate(date)}
      showTimeSelect
      // excludeTimes={[
      //   setHours(setMinutes(new Date(), 0), 17),
      //   setHours(setMinutes(new Date(), 30), 18),
      //   setHours(setMinutes(new Date(), 30), 19),
      //   setHours(setMinutes(new Date(), 30), 17),
      // ]}
      dateFormat="MMMM d, yyyy h:mm aa"
    /> */}
        <div className="flex items-center justify-between">
        <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 " onClick={this.bookAppointment}>Submit</button>
 
         
        </div>
       
        
      </div>
        </div>
      
  </div>
      </div>
      
  </div>
    );
  }
}

export default withRouter(ViewServiceDetails);
