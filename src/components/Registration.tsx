import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs= {
  name:string
  email:string
  password:string
}

function Registration() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [token,setToken] = useState('')
  const [erros,setErros] = useState([])
  
  const handleRegister = () =>{
    const requestOptions ={
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
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

   //バリデーション
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Inputs>({
      mode: "onChange",
      criteriaMode: "all",
      shouldFocusError: false,
    });

  const handleOnSubmit: SubmitHandler<Inputs> = (values) => {
    setName(values.name)
    setEmail(values.email)
    setPassword(values.password)
    handleRegister()
  }
  

  return (
    <div className="App">
      <h1>新規登録</h1>
      <Link to ="/login">
        ログイン
      </Link>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <input
          {...register("name", {
            required: true,
            maxLength: 10,
            pattern: /[0-9a-zA-Z]/,
          })}
        />
        {errors.name?.types?.required && "文字が入力されていません"}
        {errors.name?.types?.maxLength && "10文字以上が入力されています"}
        {errors.name?.types?.pattern && "英数字以外の文字が含まれています"}
        <input
          {...register("email", {
            required: true,
            maxLength: 10,
            pattern: /[0-9a-zA-Z]/,
          })}
        />
        {errors.email?.types?.required && "文字が入力されていません"}
        {errors.email?.types?.maxLength && "10文字以上が入力されています"}
        {errors.email?.types?.pattern && "英数字以外の文字が含まれています"}
        <input
          type="password"
          {...register("password", {
            required: true,
            maxLength: 30,
            pattern: /[0-9a-zA-Z]/,
          })}
        />
        {errors.password?.types?.required && "文字が入力されていません"}
        {errors.password?.types?.maxLength && "30文字以上が入力されています"}
        {errors.password?.types?.pattern && "英数字以外の文字が含まれています"}
        <input type="submit" value="登録"/>
      </form>
    </div>
  );
}

export default Registration;