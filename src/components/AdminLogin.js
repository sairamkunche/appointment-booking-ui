import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import React from "react";
import Alert from "@mui/material/Alert";
import { withRouter } from "react-router";
import axios from "axios";
import { Email } from "@mui/icons-material";

const baseUrl = "http://localhost:8080/user/login";
class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      shouldAlertDisplay: false,
      shouldLoginErrorDisplay:false
    };
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = () => {
    const { username, password } = this.state;
    const {
      history: { push },
    } = this.props;
    if (username === "" || password === "") {
      this.setState({ shouldAlertDisplay: true });
      return;
    }
    this.setState({ shouldAlertDisplay: false });
    this.setState({ shouldLoginErrorDisplay: false });

    if(username === "admin" && password === "admin") {
      push({
        pathname: "/adminHome",
      });
      return;

    }
    const reqJson={
      email:username,password:password
    }
    axios.get(baseUrl+"/"+username+"/"+password).then((res) => {
      console.log(res);
     if(res.data.status=='success')
     {
       console.log("test");
       console.log(res.data.data.id);
      push({
        pathname: "/adminHome",
      
      });
     }
     if(res.data.status!='success'){
       this.setState({shouldLoginErrorDisplay: true})
     }
    });
  };

  render() {
    const { username, password, shouldAlertDisplay,shouldLoginErrorDisplay } = this.state;
    return (
      <div className="flex flex-col space-y-5 max-w-md mx-auto my-16 min-w-500"  style={{backgroundColor:'aliceblue',padding:'30px',borderRadius:10}}>
        <div style={{color:'cornflowerblue',display:'flex',justifyContent:'center'}} className="flex items-center justify-between">
          <h2   className="text-4xl font-semibold  uppercase">Admin Login</h2>
          
        </div>
        <TextField
          value={username}
          required
          id="outlined-required"
          label="Username"
          onChange={(e) => this.handleUsernameChange(e)}
        />
        <TextField
          id="outlined-password-input"
          required
          label="Password"
          type="password"
          value={password}
          onChange={(e) => this.handlePasswordChange(e)}
        />
       
          <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 " onClick={this.handleLogin}>Login</button>
        {shouldAlertDisplay && (
          <Alert severity="error">Field cannot be empty</Alert>
        )}
        {shouldLoginErrorDisplay && (
          <Alert severity="error">Invalid email or password</Alert>
        )}
        <div className="flex">
          
            <Link
              to="/"
              style={{color:'cornflowerblue'}}  className=" font-semibold text-lg px-1"
            >
              User Login
            </Link>
          </div>
      </div>
    );
  }
}

export default withRouter(AdminLogin);
