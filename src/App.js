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

import GlobalProvider from './globals/globalContext'
import { FirebaseCnn } from "./Classes/firebase.base"

function App() {
  const firebase = new FirebaseCnn().init();

  return (
    <div>
      <GlobalProvider>
        <Router>
          <div className="App" className="App">

            <header className="App-header">
              {/* <Navbar /> */}
            </header>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/editProfile" element={<Profile />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/serviceList" element={<serviceList />} />
              <Route exact path="/serviceRegister" element={<Service />} />
              <Route exact path="/serviceDetail/:service_id" element={<ServiceDetail />} />
            </Routes>
          </div>
        </Router>
      </GlobalProvider>
    </div>

  );
}

export default App;
