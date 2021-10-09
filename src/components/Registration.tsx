import React from 'react';
import '../style/Form.css';
import { useState } from 'react';
import { Redirect,useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alert } from '@mui/material';

type Inputs= {
  name:string
  email:string
  password:string
}

function Registration() {
  const[errorCodes,setErrorCodes] = useState([])
  const[ErrorMessageJP,setErrorMessageJP] = useState([])
  const[ErrorMessageEN,setErrorMessageEN] = useState([])
  const[Error,setError] = useState(false)
  const token = localStorage.getItem('token');
  const history = useHistory();

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
    const requestOptions ={
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({name:values.name,email:values.email,password:values.password},
      )
    };
    fetch("https://api-for-missions-and-railways.herokuapp.com/users",requestOptions,)
      .then((response)=> response.json()
      )
      .then((response) =>{
        setErrorCodes(response.ErrorCode)
        setErrorMessageJP(response.ErrorMessageJP)
        setErrorMessageEN(response.ErrorMessageEN)
        localStorage.setItem('token', response.token)
        if(response.ErrorCode){
          setError(true)
        }else{
          localStorage.setItem('message', '登録が完了しました')
          history.replace('/');
        }
      })
      .catch((error)=>{
      })
  }
  
  return (
    <>
      {token === '' || token === null || token === 'undefined'?
        <div className="formBody">
          <h2>新規登録</h2>
          {Error === false?'':
            <Alert severity="error">{errorCodes}  {ErrorMessageJP}-{ErrorMessageEN}</Alert>}
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <input
              placeholder="ユーザーネーム"
              {...register("name", {
                required: true,
              })}
            />
            <div className="error">
              {errors.name?.types?.required && "ユーザーネームが入力されていません"}
              </div>
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
            <button type="submit">登録</button>
            <a href="/login" className="forgot">
              ログインはこちら
            </a>
          </form>
        </div>
      :<Redirect to="/" />}
    </>
  );
}

export default Registration;