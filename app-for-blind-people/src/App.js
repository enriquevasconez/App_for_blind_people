import './App.css';
import React from 'react';
import Navbar from './Components/navbar';
import Register from './Components/register';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
      </header>
    
    <Register/>
    </div>
  );
}

export default App;
