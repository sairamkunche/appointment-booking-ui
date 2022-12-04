import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
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

class UserServiceInbox extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      openCancelDailog: false,
      expanded:false,
      openViewDilaog:false,
      newUpdatedData:{}
    };
  }

  handleCardClick = (e) =>{
    e.preventDefault();
      const {
        history: { push } , projectData
      } = this.props;
      push({
        pathname: `/project/${projectData.projectId}`,
        projectData: projectData
      });
  }

  handleCancel = (e) =>{
    e.stopPropagation();
    this.setState({openCancelDailog:true})

  }

  handleCancelClose = (e) =>{
    e.stopPropagation();
    this.setState({openCancelDailog:false})
  }

  handleCancelDone = (projectData) =>{
    let reqUrl = `http://localhost:9100/project/updateProject/${projectData.id}/cancel`;
    axios.get(reqUrl).then((res) => {
          this.setState({openCancelDailog:false})
          console.log("Request Cancelled Successfully")
          this.props.updateInProjectArray(projectData);
    })

  }

   handleChange = (panel) => (event, isExpanded) => {
    // setExpanded(isExpanded ? panel : false);

    this.setState({
      expanded:isExpanded ? panel : false
    })
  };

  handleStatus = (projectStatus,projectData) =>{
    let reqUrl = `http://localhost:9100/project/updateProject/${projectData.id}/${projectStatus}`;
    axios.get(reqUrl).then((res) => {
          console.log("Status updated successfully")
          this.props.refreshData();
})
    //call api & disbale the status field
  }

  handleViewDetails=(projectData)=>{
    this.setState({
      openViewDilaog:true,
      newUpdatedData:projectData
    })
  }

  handleCloseProjectDialog=()=>{
    this.setState({
      openViewDilaog:false
    })
  }



  render() {
    const {userId,userRole,index,projectList} = this.props;
    const {expanded,openViewDilaog,newUpdatedData} = this.state;
    return (
      //       <Accordion style={{width:'50%'}} expanded={expanded === index} onChange={this.handleChange(index)}>
      //   <AccordionSummary style={{alignItems:'center'}}
      //     expandIcon={<ExpandMoreIcon />}
      //     aria-controls="panel1bh-content"
      //     id="panel1bh-header"
      //   >
      //     <Typography style={{fontSize:'17px',fontWeight:'600'}} sx={{ width: '50%', flexShrink: 0 }}>
      //     {projectData.projectName}
      //     </Typography>
      //     <Typography sx={{ color: 'text.secondary' }}>{projectData.projectStatus}</Typography>
      //   </AccordionSummary>
      //   <AccordionDetails>
      //     <Typography style={{marginBottom:'24px'}}>
      //     {projectData.projectDescription}
      //     </Typography>
      //     <Typography>
      //       <div style={{display:'flex',marginBottom:'24px'}}>
      //       <p style={{fontWeight:'600',marginRight:'8px'}}>Project License:</p>
      //       {projectData.projectLicense}
      //       </div>
      //     </Typography>
      //     <Typography>
      //     <div style={{display:'flex',marginBottom:'24px'}}>
      //     <p style={{fontWeight:'600',marginRight:'8px'}}>Project URL:</p>
      //       {projectData.projectUrl}
      //       </div>
      //     </Typography>
      //     <Typography style={{display:'flex'}} >
      //         <div style={{display:'flex',flexGrow:'1'}}>
      //             {(projectData.projectStatus === 'InProcess' && userId === projectData.userId) && 
      //             <div style={{cursor:'pointer'}} id='button_color' class="inline-flex items-center py-2 px-3 text-sm font-medium text-centerrounded-lg rounded-lg" 
      //             onClick={this.handleCancelDone}>Cancel Request</div>}
      //             {(userRole === 'Approver' && projectData.projectStatus === 'InProcess' && userId !== projectData.userId) &&
      //             <div>
      //                 <div style={{cursor:'pointer',marginRight:'24px'}} id='button_color' class="inline-flex items-center py-2 px-3 text-sm font-medium text-centerrounded-lg rounded-lg" 
      //             onClick={e=>this.handleStatus('Approved')}>Approved</div>
      //             <div style={{cursor:'pointer'}} id='button_color' class="inline-flex items-center py-2 px-3 text-sm font-medium text-centerrounded-lg rounded-lg" 
      //             onClick={e=>this.handleStatus('Denied')}>Denied</div>
      //             </div>
      //           }
      //         </div>
      //         <div style={{display:'flex',alignItems:'center',fontSize:'14px'}}>
      //           Last Updated :  {projectData.lastUpdated}
      //         </div>
      //     </Typography>
      //   </AccordionDetails>
      // </Accordion>

      <div>

      <TableContainer component={Paper} style={{minWidth:'1000px'}}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow style={{fontWeight:'700'}}>
            <TableCell style={{fontWeight:'700',fontSize:'16px'}}>Location</TableCell>
            <TableCell style={{fontWeight:'700',fontSize:'16px'}}>Service</TableCell>
            <TableCell style={{fontWeight:'700',fontSize:'16px'}}>Company Name</TableCell>
            <TableCell style={{fontWeight:'700',fontSize:'16px'}}>Phone Number</TableCell>
            <TableCell style={{fontWeight:'700',fontSize:'16px'}}>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        { projectList.map((projectData) => (
          <TableRow
          key={projectData.companyName}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {projectData.location}
          </TableCell>
          <TableCell >{projectData.service}</TableCell>
          <TableCell >{projectData.companyName}</TableCell>
          <TableCell component="th" scope="row">
            {projectData.phoneNumber}
          </TableCell>
          <TableCell component="th" scope="row">
            {projectData.address}
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


    <Dialog open={openViewDilaog} onClose={this.handleCloseProjectDialog}>
      <DialogTitle style={{minWidth:'600px'}}>Project Details</DialogTitle>
      <DialogContent>
      <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                  <label  style={{minWidth:'125px'}} for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Project ID:</label>
                  <input disabled type="projectUrl" id="website" value={newUpdatedData.id} onChange={(e) => {this.setState({projectUrl: e.target.value})}} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}  required />
              </div>
       <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                  <label style={{minWidth:'125px'}} for="project_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Project name:</label>
                  <input disabled type="text" id="project_name" value={newUpdatedData.projectName} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `} required />
              </div>

              <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                  <label  style={{minWidth:'125px'}} for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description:</label>
                  <textarea disabled value={newUpdatedData.projectDescription} onChange={(e) => {this.setState({projectDescription: e.target.value})}} 
                 class={` form-control block w-full px-3 py-1.5 text-base font-normal text-gray-900 bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:ring-gray-900  focus:border-gray-900 `}
                  id="exampleFormControlTextarea1" rows="3" placeholder="Description of project"></textarea>
              </div>  
              <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                  <label  style={{minWidth:'125px'}} for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Project License:</label>
                  <input disabled type="text" id="phone" value={newUpdatedData.projectLicense} onChange={(e) => {this.setState({projectLicense: e.target.value})}} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}  required />
              </div>
              <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                  <label  style={{minWidth:'125px'}} for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Project URL:</label>
                  <input disabled type="projectUrl" id="website" value={newUpdatedData.projectUrl} onChange={(e) => {this.setState({projectUrl: e.target.value})}} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}  required />
              </div>
              <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                  <label  style={{minWidth:'125px'}} for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Project Status:</label>
                  <input disabled type="projectUrl" id="website" value={newUpdatedData.projectStatus} onChange={(e) => {this.setState({projectUrl: e.target.value})}} class={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}  required />
              </div> 
      </DialogContent>
      <DialogActions>
      
        <Button onClick={this.handleCloseProjectDialog}>OK</Button>
      </DialogActions>
      </Dialog> 
      

      
         </div>

    );
  }
}

export default withRouter(UserServiceInbox);
