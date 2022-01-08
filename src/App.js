import './App.css';

import Login from './Components/login';
import Register from './Components/register';
import Home from './Components/home';

import {
  BrowserRouter as Router,
  Routes,
  Route

} from "react-router-dom";
import Profile from './Components/editProfile';
import Service from './Components/serviceRegister';
import ServiceDetail from './Components/serviceDetail';

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDs1syJw90-lcmWdeF6yofajvaKMhk1iY0",
  authDomain: "blind-people-image-storage.firebaseapp.com",
  projectId: "blind-people-image-storage",
  storageBucket: "blind-people-image-storage.appspot.com",
  messagingSenderId: "951998931962",
  appId: "1:951998931962:web:ff1c42da54540b8dc57a43"
};
const app = initializeApp(firebaseConfig);

 function App () {

 
   return (
    <Router>
      <div className="App" className="App">

        <header className="App-header">
         {/* <Navbar /> */}
        </header>
        <Routes>
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

          <Route exact path="/serviceDetail/:service_id">

          <ServiceDetail />
            
          </Route>
      
        </Routes>
        

        {/* <Footer/> */}
       
      </div>
    </Router>
    

  );
}

export default App;
