import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Signup,
  Login,
  LoginConfirm,
  LogoutConfirm,
  SignupConfirm,
  EmployeeDash
} from ".";
const App = () => {
  const { isLoggedIn } = useContext(AuthContext);
  // console.log({ token });

  // let username;

  // if (token) {
  //   const jwt = jwt_decode(token);
  //   username = jwt.username;
  //   console.log(username);
  //this goes inside header username={username}
  // }

  return (
    <Router>
      <Switch>
        {!isLoggedIn && (
          <Switch>
            {/* <Route exact path="/" component={Login} /> */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
        {isLoggedIn && (
          <Switch>
            <Route path="/login/confirm/msg" component={LoginConfirm} />
            <Route path="/logout/confirm/msg" component={LogoutConfirm} />
            <Route path="/signup/confirm/msg" component={SignupConfirm} />
            <Route path="/dashboard" component={EmployeeDash} />
          </Switch>
        )}
      </Switch>
    </Router>
  );
};
export default App;