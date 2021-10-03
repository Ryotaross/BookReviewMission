import React from 'react';
import '../style/Form.css';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs= {
  email:string
  password:string
}

function Signin() {
  const[errorCodes,setErrorCodes] = useState([])
  const[ErrorMessageJP,setErrorMessageJP] = useState([])
  const[ErrorMessageEN,setErrorMessageEN] = useState([])
  const token = localStorage.getItem('token');

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
    const requestOptions ={
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({email:values.email,password:values.password},
      )
    };
    fetch("https://api-for-missions-and-railways.herokuapp.com/signin",requestOptions,)
      .then((response)=> response.json()
      )
      .then((response) =>{
        setErrorCodes(response.ErrorCode)
        setErrorMessageJP(response.ErrorMessageJP)
        setErrorMessageEN(response.ErrorMessageEN)
        localStorage.setItem('token', response.token)
        if(response.token === '' || response.token === null || response.token === undefined){
        }else{
          return(<Redirect to="/index" />)
        }
      })
      .catch((error)=>{
      })
      return false;
  }

  return (
    <>
      {token === '' || token === null || token === undefined?
        <div className="formBody">
          <h2>ログイン</h2>
          <p>{errorCodes} {ErrorMessageJP}</p>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <input
              placeholder="メールアドレス"
              {...register("email", {
                required: true,
                maxLength: 10,
                pattern: /[0-9a-zA-Z]/,
              })}
            />
            <div className="error">
              {errors.email?.types?.required && "メールアドレスが入力されていません"}
              {errors.email?.types?.maxLength && "10文字以上が入力されています"}
              {errors.email?.types?.pattern && "英数字以外の文字が含まれています"}
            </div>
            <input
              placeholder="パスワード"
              type="password"
              {...register("password", {
                required: true,
                maxLength: 30,
                pattern: /[0-9a-zA-Z]/,
              })}
            />
            <div className="error">
              {errors.password?.types?.required && "パスワードが入力されていません"}
              {errors.password?.types?.maxLength && "30文字以上が入力されています"}
              {errors.password?.types?.pattern && "英数字以外の文字が含まれています"}
            </div>
            <button type="submit">ログイン</button>
            <a href="/signup" className="forgot">
              新規登録はこちら
            </a>
          </form>
        </div>
      :<Redirect to="/index" />}
    </>
  );
}

export default Signin;