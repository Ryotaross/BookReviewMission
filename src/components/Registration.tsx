import React from 'react';
import { useState } from 'react';


function Registration() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [token,setToken] = useState('')
  const [erros,setErros] = useState([])
  
  const handleSubmit = () => {
    const requestOptions ={
      method: 'POST',
      headers:{'accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({name: name,email:email,password:password},
      )
    };
    fetch("https://api-for-missions-and-railways.herokuapp.com/users",requestOptions,)
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
      <h1>新規登録</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={event => setName(event.target.value)}/>
        <input value={email} onChange={event => setEmail(event.target.value)}/>
        <input value={password} onChange={event => {setPassword(event.target.value)}}/>
        <input type="submit" value="登録"/>
      </form>
    </div>
  );
}

export default Registration;