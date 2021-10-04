import React from 'react';
import '../style/Form.css';
import { useState,useEffect } from 'react';
import { Redirect} from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

type Inputs= {
  name:string
}


function ProfileUpdate() {
  const[errorCodes,setErrorCodes] = useState([])
  const[ErrorMessageJP,setErrorMessageJP] = useState([])
  const[ErrorMessageEN,setErrorMessageEN] = useState([])
  const[loginUser,setLoginUser] = useState<any>([{name:'ゲスト'}]);
  const token = localStorage.getItem('token');

  useEffect(()=>{
    if(token === "" || token === 'null' || token === 'undefined'){
      
    }else{
      axios.get('https://api-for-missions-and-railways.herokuapp.com/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(res => {
        setLoginUser(res.data);
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
      })
      .catch((error)=>{
      })
      return false;
  }

  return (
    <>
    {token === '' || token === null || token === 'undefined'?<Redirect to="/login" />:
        <div className="formBody">
          <h2>ユーザー名変更</h2>
          <p>{errorCodes} {ErrorMessageJP}</p>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <input
              placeholder={loginUser.name}
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
        </div>
      }
    </>
  );
}

export default ProfileUpdate;