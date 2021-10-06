import React from 'react';
import '../App.css';
import Registration from '../components/Registration';
import Header from '../components/header';

function Signup() {
  return (
    <div className="App">
      <Header />
      <Registration />
    </div>
  );
}

export default Signup;