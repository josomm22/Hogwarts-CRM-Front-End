import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import {Students} from './components/table'
import Navbar from './components/Navbar'
import Welcome from './components/main'
import Studentdetails from './components/Student'

function App() {
  return (
    <Router>

    <div className="App">
        <Navbar/>
      {/* <Welcome/> */}
        
        {/* <Students/> */}
        <Studentdetails/>
        
    </div>
    </Router>
  );
}

export default App;
