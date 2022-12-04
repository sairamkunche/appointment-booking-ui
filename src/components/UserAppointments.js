import React from "react";
import { withRouter } from "react-router";
import ProjectInbox from "./ProjectInbox";
import axios from "axios";
import LeftNavigation from "./LeftNavigation";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const baseUrl = "http://localhost:8080/service/getUserAppointments/";
class UserAppointments extends React.Component {
  constructor(props) {
    super(props);
    console.log(localStorage.getItem("userId"));
    console.log(localStorage.getItem("userRole"));
    this.state = {
      userId:  localStorage.getItem("userId"),
      userRole: localStorage.getItem("userRole"),
      projectDatas : []
    };
  }

  componentWillMount() {
    
      axios.get(baseUrl+localStorage.getItem("email")).then((res) => {
        this.setState({
          projectDatas:res.data
        })
  })
    
 
  }

  updateDashboard=()=>{
    axios.get(baseUrl+localStorage.getItem("email")).then((res) => {
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


  navigateToServices = (location) =>{
    const {userId} = this.state;
    const {
      history: { push },
    } = this.props;
    push(`/userServices/${location}`);

  }
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
    const {userId,userRole,projectDatas} = this.state;
    return (

<div className=" flex flex-col" style={{backgroundColor:'aliceBlueBlue',minHeight:'100vh'}}>
  <div style={{backgroundColor:'#000080',display:'flex',justifyContent:'center',padding:'12px',borderBottom:'1px solid white',fontSize:'24px',color:'white'}}>Appointment Setting Application </div>
      <div style={{display:'flex'}}>
      <LeftNavigation isFirstTime={true} handleNewRequest={this.handleNewRequest} handleLogout={this.handleLogout}/>
      <div className="flex flex-col relative w-full" style={{marginTop:'55px'}}>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      

<TableContainer component={Paper} style={{minWidth:'1000px'}}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow style={{fontWeight:'700'}}>
          <TableCell style={{fontWeight:'700',fontSize:'16px'}}>Booking Id</TableCell>
            <TableCell style={{fontWeight:'700',fontSize:'16px'}}>Company Name</TableCell>
            <TableCell style={{fontWeight:'700',fontSize:'16px'}}>Address</TableCell>
            <TableCell style={{fontWeight:'700',fontSize:'16px'}}>Appointment Date & Time</TableCell>
            <TableCell style={{fontWeight:'700',fontSize:'16px'}}>Email</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        { projectDatas.map((projectData) => (
          <TableRow
          key={projectData.bookingId}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
            {projectData.id}
          </TableCell>
          <TableCell component="th" scope="row">
            {projectData.companyName}
          </TableCell>
          <TableCell >{projectData.companyAddress}</TableCell>
          <TableCell >{projectData.dateTime}</TableCell>
          <TableCell component="th" scope="row">
            {projectData.email}
          </TableCell>
          
          {/* <TableCell style={{display:'flex'}}>
          <Button variant="outlined" color="primary"   onClick={e=>this.handleViewDetails(projectData)} style={{marginRight:'16px'}}> View </Button>
          {(projectData.projectStatus === 'InProcess' && userId === projectData.userId) && 
          <Button variant="outlined" color="primary"   onClick={e=>this.handleCancelDone(projectData)}> Cancel Request </Button>
          }
          {(userRole === 'Approver' && projectData.projectStatus === 'InProcess' && userId !== projectData.userId) &&
          <div>
            <Button variant="outlined" color="success"  onClick={e=>this.handleStatus('Approved',projectData)} style={{marginRight:'16px'}}> Approve </Button>
            <Button variant="outlined" color="error" onClick={e=>this.handleStatus('Denied',projectData)}> Deny</Button>
          </div>
          }
          </TableCell> */}
          
        </TableRow>
        
        ))
        }
       
        </TableBody>
      </Table>
    </TableContainer>

        </div>
      
  </div>
      </div>
      
  </div>
    );
  }
}

export default withRouter(UserAppointments);
