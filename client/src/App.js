import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import {ToastContainer} from "react-toastify"; 
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import Saved from "./components/Saved";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <NavBar />
          <ToastContainer />
          <Switch>
            <Route path="/search" component={Search} />
            <Route path="/saved" component={Saved} />
            <Route path="/" component={Search} exact />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
