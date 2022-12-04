import "./App.css";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import Popper from 'popper.js';
import { BrowserRouter, Route } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import DashboardLayout from "./components/DashboardLayout";
import UserSignup from "./components/UserSignup";
import Project from "./components/Project";
import NewLocation from "./components/NewLocation";
import AdminLogin from "./components/AdminLogin";
import Admin from "./components/Admin";
import NewService from "./components/NewService";
import NewServiceInLocationPage from "./components/NewServiceInLocationPage";
import CreateNewServiceInLocation from "./components/CreateNewServiceInLocation";
import UserServices from "./components/UserServices";
import ViewServiceDetails from "./components/ViewServiceDetails"
import ServiceInLocation from "./components/ServiceInLocation";
import UserAppointments from "./components/UserAppointments";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen" >
        
        <Route path="/" component={UserLogin} exact></Route>
        <Route path="/adminLogin" component={AdminLogin} exact></Route>
        <Route path="/adminHome" component={Admin} exact></Route>
        <Route path="/userSignup" component={UserSignup}></Route>
        <Route path="/dashboardLayout" component={DashboardLayout}></Route>
        <Route path="/project/:id" component={Project}></Route>
        <Route path="/createLocation" component={NewLocation}></Route>
        <Route path="/createService" component={NewService}></Route>
        <Route path="/createServiceInLocation" component={CreateNewServiceInLocation}></Route>
        <Route path="/userServices/:location" component={UserServices}/> 
        <Route path="/viewAllServices/:location/:service" component={ServiceInLocation}/> 
        <Route path="/viewServiceDetails/:id" component={ViewServiceDetails}/>
        <Route path="/viewAppointments" component={UserAppointments}/>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
