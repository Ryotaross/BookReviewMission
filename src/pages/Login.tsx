import React from 'react';
import Signin from '../components/Signin';
import Header from '../components/header';
import '../App.css';

function Login() {
  return (
    <div className="App">
      <Header />
      <Signin />
    </div>
  );
}

export default Login;