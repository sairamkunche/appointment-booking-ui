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

class NewProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        projectId : props.isNew ? '' : props.projectData.projectId ,
        projectName: props.isNew ? '' : props.projectData.projectName ,
        projectDescription: props.isNew ? '' : props.projectData.projectDescription ,
        projectLicense: props.isNew ? '' : props.projectData.projectLicense ,
        projectUrl: props.isNew ? '' : props.projectData.projectUrl ,
        projectStatus: props.isNew ? '' : props.projectData.state ,
        lastUpdatedTime: props.isNew ? '' : props.projectData.lastUpdatedTime ,
        userId: props.isNew ? '' : props.projectData.userId ,
        openDialog:true

    };
  }


  createProjectData = () =>{
    const {projectId,userId,projectName, projectDescription, projectLicense, projectUrl, projectStatus, lastUpdatedTime} = this.state;
    const {
        history: { push },
      } = this.props;
    let reqUrl = "http://localhost:9100/project/saveProject";
    const json={
        userId : parseInt(localStorage.getItem('userId')),
        projectName: projectName,
        projectDescription: projectDescription,
        projectLicense: projectLicense,
        projectUrl: projectUrl,
        projectStatus: 'InProcess',
    }
    axios.post(reqUrl,json).then((res) => {
          push(`/dashboardLayout`);
})
  }

  handleClose=()=>{
    const {
        history: { push },
      } = this.props;
      this.setState({
          openDialog:false
      })
      push(`/dashboardLayout`);
  }

  render() {
      const {openDialog,projectId, projectName, projectDescription, projectLicense, projectUrl, projectStatus, lastUpdatedTime,userId} = this.state;
      const {isEnableEdit,isNew} = this.props;
    return (
 <div>

<Dialog open={openDialog} onClose={this.handleClose}>
        <DialogTitle style={{minWidth:'600px'}}>Create New Project</DialogTitle>
        <DialogContent>
         
        <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                    <label style={{minWidth:'125px'}} for="project_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Project name:</label>
                    <input type="text" id="project_name" value={projectName} onChange={(e) => {this.setState({projectName: e.target.value})}} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `} required />
                </div>

                <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                    <label  style={{minWidth:'125px'}} for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description:</label>
                    <textarea value={projectDescription} onChange={(e) => {this.setState({projectDescription: e.target.value})}} 
                   class={` form-control block w-full px-3 py-1.5 text-base font-normal text-gray-900 bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:ring-gray-900  focus:border-gray-900 `}
                    id="exampleFormControlTextarea1" rows="3" placeholder="Description of project"></textarea>
                </div>  
                <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                    <label  style={{minWidth:'125px'}} for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Project License:</label>
                    <input type="text" id="phone" value={projectLicense} onChange={(e) => {this.setState({projectLicense: e.target.value})}} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}  required />
                </div>
                <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                    <label  style={{minWidth:'125px'}} for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Project URL:</label>
                    <input type="projectUrl" id="website" value={projectUrl} onChange={(e) => {this.setState({projectUrl: e.target.value})}} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}  required />
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

export default withRouter(NewProjectPage);
