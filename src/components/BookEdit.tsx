import React from 'react';
import '../style/Form.css';
import { useState,useEffect } from 'react';
import { Redirect,useParams,useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

type Inputs= {
  title:string
  url:string
  detail:string
  review:string
}

function BookEdit() {
  const[review,setReview] = useState({id: "",title: "",url: "",detail: "",review: "",reviewer: ""})
  const[errorCodes,setErrorCodes] = useState([])
  const[ErrorMessageJP,setErrorMessageJP] = useState([])
  const[ErrorMessageEN,setErrorMessageEN] = useState([])
  const[loginUser,setLoginUser] = useState<any>([{name:'ゲスト'}]);
  const token = localStorage.getItem('token');
  const Url: { id: string } = useParams();
  const history = useHistory();

  useEffect(()=>{
    if(token === "" || token === 'null' || token === 'undefined'){
      history.push('/login')
    }else{
      axios.get(`https://api-for-missions-and-railways.herokuapp.com/books/` + Url.id,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(res => {
        setReview( res.data );
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
      body: JSON.stringify({title:values.title,url:values.url,detail:values.detail,review:values.review},
      )
    };
    fetch(`https://api-for-missions-and-railways.herokuapp.com/books/` + Url.id,requestOptions,)
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

  const handleDelete = () => {
    const requestOptions ={
      method: 'DELETE',
      headers:{ Authorization: `Bearer ${token}`,},
    };
    fetch(`https://api-for-missions-and-railways.herokuapp.com/books/` + Url.id,requestOptions,)
      .then((response)=> response.json()
      )
      .then((response) =>{
        setErrorCodes(response.ErrorCode)
        setErrorMessageJP(response.ErrorMessageJP)
        setErrorMessageEN(response.ErrorMessageEN)
        history.push('/')
      })
      .catch((error)=>{
      })
      return false;
  }

  return (
    <>
      {token === '' || token === null || token === 'undefined'?<Redirect to="/login" />:
        <div className="formBody">
          <h2>レビュー投稿</h2>
          <p>{errorCodes} {ErrorMessageJP}</p>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <input
              defaultValue={review.title}
              type="text"
              {...register("title", {
                required: true,
              })}
            />
            <div className="error">
              {errors.title?.types?.required && "タイトルが入力されていません"}
            </div>
            <input
              defaultValue={review.url}
              type="text"
              {...register("url", {
                required: true,
              })}
            />
            <div className="error">
              {errors.url?.types?.required && "商品URLが入力されていません"}
            </div>
            <textarea
              defaultValue={review.detail}
              {...register("detail", {
                required: true,
              })}
            />
            <div className="error">
              {errors.detail?.types?.required && "あらすじが入力されていません"}
            </div>
            <textarea
              defaultValue={review.review}
              {...register("review", {
                required: true,
              })}
            />
            <div className="error">
              {errors.review?.types?.required && "レビューが入力されていません"}
            </div>
            <button type="submit">更新</button>
          </form>
          　<button type="submit" onClick={handleDelete}>削除</button>
        </div>
      }
    </>
  );
}

export default BookEdit;