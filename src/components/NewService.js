import React from "react";
import { withRouter } from "react-router";
import ProjectInbox from "./ProjectInbox";
import NewProjectPage from "./NewProjectPage";
import AdminNavigation from "./AdminNavigation";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NewServicePage from "./NewServicePage";

class NewService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enableEdit:false,
      openDialog:true
    };
  }


  handleLogout = () => {
    localStorage.removeItem("username");
    const {
      history: { push },
    } = this.props;
    push("/");
  };

  enableEdit = () =>{
    this.setState({enableEdit:true});
  }

  handleClose=()=>{
    const {
        history: { push },
      } = this.props;
      this.setState({
          openDialog:false
      })
      push(`/adminHome`);
  }

  render() {
    return (

<div className=" flex flex-col" style={{backgroundColor:'aliceBlueBlue',minHeight:'100vh'}}>
  <div style={{backgroundColor:'lightslategray',display:'flex',justifyContent:'center',padding:'12px',borderBottom:'1px solid white',fontSize:'24px',color:'white'}}>Project Management System</div>
      <div style={{display:'flex'}}>
      <AdminNavigation isFirstTime={true} handleNewRequest={this.handleNewRequest} handleNewService={this.handleNewService} handleNewServiceAndLocation={this.handleNewServiceAndLocation} handleLogout={this.handleLogout}/>
    <div className="flex flex-col relative w-full" style={{marginTop:'80px',marginLeft:'200px'}}>
          <NewServicePage isEnableEdit={true} isNew/>
          
        </div>
      </div>
      
  </div>
    );
  }
}

export default withRouter(NewService);
