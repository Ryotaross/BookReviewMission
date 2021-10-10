import React from 'react';
import '../style/Form.css';
import { useState,useEffect } from 'react';
import { Redirect,useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import LoadingInterface from './LoadingInterface';
import { Alert } from '@mui/material';

type Inputs= {
  name:string
}

function ProfileUpdate() {
  const[errorCodes,setErrorCodes] = useState([])
  const[ErrorMessageJP,setErrorMessageJP] = useState([])
  const[ErrorMessageEN,setErrorMessageEN] = useState([])
  const[loginUser,setLoginUser] = useState<any>([{name:'ゲスト'}])
  const[loading,setLoading] = useState(true)
  const[Error,setError] = useState(false)
  const token = localStorage.getItem('token')
  const history = useHistory()

  useEffect(()=>{
    if(token === "" || token === 'null' || token === 'undefined'){
      return
    }else{
      axios.get('https://api-for-missions-and-railways.herokuapp.com/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(res => {
        setLoginUser(res.data);
        setLoading(false)
      })
    }
  },[])

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
      method: 'PUT',
      headers:{ Authorization: `Bearer ${token}`,},
      body: JSON.stringify({name:values.name},
      )
    };
    fetch("https://api-for-missions-and-railways.herokuapp.com/users",requestOptions,)
      .then((response)=> response.json()
      )
      .then((response) =>{
        setErrorCodes(response.ErrorCode)
        setErrorMessageJP(response.ErrorMessageJP)
        setErrorMessageEN(response.ErrorMessageEN)
        if(response.ErrorCode){
          setError(true)
        }else{
          localStorage.setItem('message', 'ユーザー名を変更しました')
          history.replace('/');
        }
      })
      .catch((error)=>{
      })
  }

  return (
    <>
      {token === '' || token === null || token === 'undefined'?<Redirect to="/login" />:
        <div className="formBody">
          <h2>ユーザー名変更</h2>
          {Error === false?'':
            <Alert severity="error">{errorCodes}  {ErrorMessageJP}-{ErrorMessageEN}</Alert>}
          <p>{errorCodes} {ErrorMessageJP}</p>
          {loading?<LoadingInterface />:
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <input
                type="text"
                defaultValue={loginUser.name}
                {...register("name", {
                  required: true,
                  maxLength: 10,
                  pattern: /[0-9a-zA-Z]/,
                })}
              />
              <div className="error">
                {errors.name?.types?.required && "名前が入力されていません"}
                {errors.name?.types?.maxLength && "10文字以上が入力されています"}
                {errors.name?.types?.pattern && "英数字以外の文字が含まれています"}
              </div>
              <button type="submit">変更</button>
            </form>
          }
        </div>
      }
    </>
  );
}

export default ProfileUpdate;