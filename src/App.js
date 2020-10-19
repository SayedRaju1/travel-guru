import React, { createContext, useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import Booking from './components/Booking/Booking';
import Hotels from './components/Hotels/Hotels';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (

    <div className="app">
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Header></Header>
          <Switch>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/booking/:code">
              <Booking></Booking>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/hotels/:code">
              <Hotels></Hotels>
            </PrivateRoute>
            <Route path="/">
              <Home></Home>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>

    </div>

  );
}

export default App;
