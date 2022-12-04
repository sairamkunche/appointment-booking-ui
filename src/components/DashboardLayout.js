import React from "react";
import { withRouter } from "react-router";
import ProjectInbox from "./ProjectInbox";
import axios from "axios";
import LeftNavigation from "./LeftNavigation";


const baseUrl = "http://localhost:8080/location/getLocations";
class DashboardLayout extends React.Component {
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
    
      axios.get(baseUrl).then((res) => {
        this.setState({
          projectDatas:res.data
        })
  })
    
 
  }

  updateDashboard=()=>{
    axios.get(baseUrl).then((res) => {
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
    push(`/viewAppointments`);

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
        {/* <ProjectInbox projectList={projectDatas} refreshData={this.updateDashboard}  userRole={userRole} userId={parseInt(userId)}   updateInProjectArray={this.updateInProjectArray} updateProjectArrayStatus={this.updateProjectArrayStatus}/> */}
        { projectDatas.map((projectData) => (
         <div style={{margin:'10px',width:'300px',textAlign:'center',minHeight: '20px',
         padding: '19px',
         marginBottom: '20px',
         backgroundColor: '#5cb85c',
         border: '1px solid #e3e3e3',
         borderRadius: '4px'}} onClick={e=>this.navigateToServices(projectData)}>
          {projectData}
          </div>
        ))
        }
        </div>
      
  </div>
      </div>
      
  </div>
    );
  }
}

export default withRouter(DashboardLayout);
