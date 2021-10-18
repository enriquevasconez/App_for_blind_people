import './App.css';
import React from 'react';
import Navbar from './Components/navbar';
import Footer from './Components/footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Registro from './Registro';
import Register from './Components/register';


function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>

      <Switch>
               <Route exact path ="/register" >
                    <Register/>
                    
                </Route>
                <Route exact path ="/" >
                   
                </Route>
              
            </Switch>
       
         
       
       
        <Footer />
            
      
    </div>
    </Router>

  );
}

export default App;
