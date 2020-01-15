import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import { Students } from './components/table'
import Navbar from './components/Navbar'
import Welcome from './components/main'
import Studentdetails from './components/Student'
import Newstudentform from './pages/newstudentForm'
import { Chart} from './pages/summary'

function App() {
  return (
    <Router>

      <div className="App">
        <Navbar />
        <Switch>

          {/* <Welcome/> */}
          <Route path="/students">
            <Students />
          </Route>
          <Route path="/newstudent">
            <Newstudentform />
          </Route>
          <Route path="/summary">
            <Chart/>
          </Route>
          <Route path='/studentdetails/:id' component={Studentdetails} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
