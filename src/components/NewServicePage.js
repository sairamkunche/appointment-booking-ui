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

class NewServicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        serviceName: props.isNew ? '' : props.projectData.serviceName ,
      
       
        openDialog:true

    };
  }


  createProjectData = () =>{
    const {serviceName} = this.state;
    const {
        history: { push },
      } = this.props;
    let reqUrl = "http://localhost:8080/service/createServiceType";
    const json={
      
        name: serviceName
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
      const {openDialog,serviceName} = this.state;
      const {isEnableEdit,isNew} = this.props;
    return (
 <div>

<Dialog open={openDialog} onClose={this.handleClose}>
        <DialogTitle style={{minWidth:'600px'}}>Create New Service</DialogTitle>
        <DialogContent>
         
        <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                    <label style={{minWidth:'125px'}} for="location_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Service name:</label>
                    <input type="text" id="location_name" value={serviceName} onChange={(e) => {this.setState({serviceName: e.target.value})}} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `} required />
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

export default withRouter(NewServicePage);
