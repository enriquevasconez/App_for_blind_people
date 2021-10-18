import './App.css';
import React from 'react';
import Navbar from './Components/navbar';
import Register from './Components/register';
import Footer from './Components/footer';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


function Registro() {
  return (
    <div className="Registro">
      <header className="Registro">
     
      </header>
      <body>
      <Register/>
      </body>
     
     
    </div>

  );
}
export default Registro;
