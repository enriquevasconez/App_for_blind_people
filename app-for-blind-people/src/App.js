import './App.css';

import Login from './Components/login';
import Register from './Components/register';
import Home from './Components/home';

import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";
import Profile from './Components/editProfile';
import Service from './Components/serviceRegister';




 function App () {

 
   return (
    <Router>
      <div className="App" className="App">

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

          <Route exact path="/editProfile">
            
            <Profile />

          </Route>

          <Route exact path="/home">
            <Home/>
                     
          </Route>

          <Route exact path="/serviceList">
            
            <serviceList />

          </Route>

          <Route exact path= "/serviceRegister">
            
            <Service />

          </Route>
      
        </Switch>
        

        {/* <Footer/> */}
       
      </div>
    </Router>
    

  );
}

export default App;
