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

class NewLocationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        locationId : props.isNew ? '' : props.projectData.locationId ,
        locationName: props.isNew ? '' : props.projectData.locationName ,
        country: props.isNew ? '' : props.projectData.country ,
       
        openDialog:true

    };
  }


  createProjectData = () =>{
    const {locationName,country} = this.state;
    const {
        history: { push },
      } = this.props;
    let reqUrl = "http://localhost:8080/location/createlocation";
    const json={
      
        name: locationName,
        country: country
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
      const {openDialog,locationId,locationName,country} = this.state;
      const {isEnableEdit,isNew} = this.props;
    return (
 <div>

<Dialog open={openDialog} onClose={this.handleClose}>
        <DialogTitle style={{minWidth:'600px'}}>Create New Location</DialogTitle>
        <DialogContent>
         
        <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                    <label style={{minWidth:'125px'}} for="location_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Location name:</label>
                    <input type="text" id="location_name" value={locationName} onChange={(e) => {this.setState({locationName: e.target.value})}} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `} required />
                </div>
                <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                    <label style={{minWidth:'125px'}} for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Country</label>
                    <input type="text" id="country" value={country} onChange={(e) => {this.setState({country: e.target.value})}} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `} required />
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

export default withRouter(NewLocationPage);
