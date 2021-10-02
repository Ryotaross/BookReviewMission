import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Signin() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [token,setToken] = useState('')
  const [erros,setErros] = useState([])
  
  const handleSignIn = () => {
    const requestOptions ={
      method: 'POST',
      headers:{'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({email:email,password:password},
      )
    };
    fetch("https://api-for-missions-and-railways.herokuapp.com/signin",requestOptions,)
      .then((response)=> response.json()
      )
      .then((response) =>{
        setToken(response)
      })
      .catch((error)=>{
        setErros(error)
        console.log(error)
      })
      return false;
  }
  

  return (
    <div className="App">
      <h1>ログイン</h1>
      <Link to ="/signup">
        新規登録
      </Link>
      <form onSubmit={handleSignIn}>
        <input value={email} onChange={event => setEmail(event.target.value)}/>
        <input value={password} onChange={event => {setPassword(event.target.value)}}/>
        <input type="submit" value="ログイン"/>
      </form>
    </div>
  );
}

export default Signin;