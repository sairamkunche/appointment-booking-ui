import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class CreateNewServiceInLocationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        location : props.isNew ? '' : props.projectData.location ,
        service: props.isNew ? '' : props.projectData.service ,
        companyName: props.isNew ? '' : props.projectData.companyName ,
        phoneNumber: props.isNew ? '' : props.projectData.phoneNumber, 
        address: props.isNew ? '' : props.projectData.address ,
       
        openDialog:true


    };
  }


  createProjectData = () =>{
    const {location,service,companyName,phoneNumber,address} = this.state;
    const {
        history: { push },
      } = this.props;
    
    let reqUrl = "http://localhost:8080/service/addNewService";
    const json={
      
        location: location,
        service: service,
        companyName: companyName,
        phoneNumber: phoneNumber,
        address: address
    }
    axios.post(reqUrl,json).then((res) => {
          push(`/adminHome`);
})
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
      const {openDialog,location,service,companyName,phoneNumber,address} = this.state;
      const {isEnableEdit,isNew} = this.props;
    return (
 <div>

<Dialog open={openDialog} onClose={this.handleClose}>
        <DialogTitle style={{minWidth:'600px'}}>Create New Service</DialogTitle>
        <DialogContent>
         
        <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                    <label style={{minWidth:'125px'}} for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">location:</label>
                    <input type="text" id="location" value={location} onChange={(e) => {this.setState({location: e.target.value})}} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `} required />
                </div>

                <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                    <label style={{minWidth:'125px'}} for="service" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">service:</label>
                    <input type="text" id="service" value={service} onChange={(e) => {this.setState({service: e.target.value})}} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `} required />
                </div>
                <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                    <label  style={{minWidth:'125px'}} for="companyName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">companyName:</label>
                    <input type="text" id="companyName" value={companyName} onChange={(e) => {this.setState({companyName: e.target.value})}} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}  required />
                </div>
                <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                    <label  style={{minWidth:'125px'}} for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">phoneNumber:</label>
                    <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => {this.setState({phoneNumber: e.target.value})}} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}  required />
                </div>
                <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                    <label  style={{minWidth:'125px'}} for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">address:</label>
                    <input type="text" id="address" value={address} onChange={(e) => {this.setState({address: e.target.value})}} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}  required />
                </div>
        </DialogContent>
        <DialogActions>
        <Button onClick={this.createProjectData}>Create</Button>
          <Button onClick={this.handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>


</div> 
    );
   
  }
}

export default withRouter(CreateNewServiceInLocationPage);
