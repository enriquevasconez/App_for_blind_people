import './bootstrap.config.scss';
import './App.css';

import Login from './Components/pages/login/login';
import Register from './Components/pages/user/register';
import Home from './Components/pages/home/home';
import RecoverPassword from './Components/pages/recoverPassword/recoverPassword';

import {
  BrowserRouter as Router,
  Routes,
  Route

} from "react-router-dom";
import Profile from './Components/pages/user/profile';
import Service from './Components/serviceRegister';
import ServiceDetail from './Components/pages/serviceDetail/serviceDetail';

import GlobalProvider from './globals/globalContext'
import { FirebaseCnn } from "./Classes/firebase.base"
import DemandService from "./Components/pages/demandService/demandService"
function App() {
  new FirebaseCnn().init();

  return (
    <div>
      
        <Router>
          <div className="App">

            <header className="App-header">
              {/* <Navbar /> */}
            </header>
            <Routes>
              <Route path="/register" element={<GlobalProvider><Register /></GlobalProvider>} />
              <Route exact path="/" element={<GlobalProvider><Home /></GlobalProvider>} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/editProfile" element={<Profile />} />
              <Route exact path="/serviceList" element={<serviceList />} />
              <Route exact path="/serviceRegister" element={<Service />} />
              <Route exact path="/serviceDetail/:service_id" element={<ServiceDetail />} />
              <Route exact path="/forum" element={<DemandService />} />
              {/* <Route exact path="/forum" element={<Forum />} /> */}
              <Route exact path="/forgotpass" element={<RecoverPassword />} />
            </Routes>
          </div>
        </Router>
      {/* <Footer/> */}
    </div>

  );
}

export default App;
