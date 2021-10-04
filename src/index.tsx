import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Index from './pages/Index';
import Profile from './pages/Profile';
import New from './pages/New';
import Detail from './pages/Detail';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/new">
          <New />
        </Route>
        <Route exact path="/detail/:id">
          <Detail />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
