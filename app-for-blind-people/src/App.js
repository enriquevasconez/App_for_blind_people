import './App.css';
import React, { useEffect, useState} from 'react';
import Navbar from './Components/navbar';
import Footer from './Components/footer';
import Login from './Components/login';
import Register from './Components/register';
import Home from './Components/home';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




 function App () {

 
   return (
    <Router>
      <div className="App">

        <header className="App-header">
         {/* <Navbar /> */}
        </header>
        <Switch>
          <Route  path="/register" >
            <Register />
          </Route>
          <Route exact path="/" >
             <Home />
 
          </Route>
          <Route exact path="/login">
         
            <Login />
                     
          </Route>
          <Route exact path="/home">
            <Home/>
                     
          </Route>

          <Route exact path="/serviceList">
            
            <serviceList />

          </Route>
        </Switch>
        

        {/* <Footer/> */}
       
      </div>
    </Router>
    

  );
}

export default App;
