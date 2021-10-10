import React from 'react';
import '../style/Form.css';
import '../style/Edit.css';
import { useState,useEffect } from 'react';
import { Redirect,useParams,useHistory } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { blueGrey } from '@mui/material/colors';
import { grey } from '@mui/material/colors';
import LoadingInterface from './LoadingInterface';
import DialogInterface from './Dialog';

function BookEdit() {
  const[review,setReview] = useState({id: "",title: "",url: "",detail: "",review: "",reviewer: ""})
  const[errorCodes,setErrorCodes] = useState([])
  const[ErrorMessageJP,setErrorMessageJP] = useState([])
  const[ErrorMessageEN,setErrorMessageEN] = useState([])
  const[Error,setError] = useState(false)
  const[openDelete, setOpenDelete] = useState(false);
  const[openEdit, setOpenEdit] = useState(false);
  const[loading,setLoading] = useState(true);
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
        setLoading(false)
      })
    }
  },[])

  const handleEdit= () => {
    setError(false)
    const requestOptions ={
      method: 'PUT',
      headers:{ Authorization: `Bearer ${token}`,},
      body: JSON.stringify({title:review.title,url:review.url,detail:review.detail,review:review.review},
      )
    };
    fetch(`https://api-for-missions-and-railways.herokuapp.com/books/` + Url.id,requestOptions,)
      .then((response)=> response.json()
      )
      .then((response) =>{
        setErrorCodes(response.ErrorCode)
        setErrorMessageJP(response.ErrorMessageJP)
        setErrorMessageEN(response.ErrorMessageEN)
        if(response.ErrorCode){
          setError(true)
        }else{
          history.push({
            pathname: '/detail/' + Url.id
          })
          localStorage.setItem('message', '更新が完了しました')
        }
      })
      .catch((error)=>{
      })
  }

  const handleDelete = () => {
    setError(false)
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
        if(response.ErrorCode){
          setError(true) 
        }
      })
      .catch((error)=>{
      })
      if(Error === false){
        localStorage.setItem('message', '削除が完了しました')
      }else{
        localStorage.setItem('error', '削除が失敗しました')
      }
  }

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const card = (
    <React.Fragment key={review.id}>
      <CardMedia sx={{ width:{ xs: 400, md: 800 },height:60,m:'auto',pt:2,fontSize: 20,bgcolor:blueGrey[800],color:grey[50]}}>
          レビュー修正
      </CardMedia>
      <CardContent sx={{m:'auto',width:{ xs: 400, md: 800 },border:1,borderColor: 'grey.500',boxShadow: 1,bgcolor:grey[50]}}>
        {Error === false?'':
        <Alert severity="error">{errorCodes}  {ErrorMessageJP}-{ErrorMessageEN}</Alert>}
        <TextField
          fullWidth
          id="standard-required"
          label="タイトル"
          defaultValue={review.title}
          variant="standard"
          onChange={event => setReview({ ...review, title: event.target.value })}
          sx={{my:2}}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="商品ページURL"
          defaultValue={review.url}
          variant="standard"
          onChange={event => setReview({ ...review, url: event.target.value })}
          sx={{my:2}}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="あらすじ"
          defaultValue={review.detail}
          variant="standard"
          multiline={true}
          maxRows= {10}
          onChange={event => setReview({ ...review, detail: event.target.value })}
          sx={{my:2}}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="レビュー"
          defaultValue={review.review}
          variant="standard"
          multiline={true}
          maxRows= {10}
          onChange={event => setReview({ ...review, review: event.target.value })}
          sx={{my:2}}
        />
        <Button variant="contained" sx={{m:1}} onClick={handleClickOpenEdit} >更新</Button>
        <DialogInterface open={openEdit} handleClose={handleCloseEdit} review={review} handleSubmit={handleEdit} type="create" button="更新" />
        <Button variant="contained" sx={{m:1}} onClick={handleClickOpenDelete} color='error'>削除</Button>
        <DialogInterface open={openDelete} handleClose={handleCloseDelete} handleSubmit={handleDelete} type="delete" />
      </CardContent>
    </React.Fragment>
  );

  return (
    <>
      {token === '' || token === null || token === 'undefined'?<Redirect to="/login" />:
        <div>
          <Box sx={{ minWidth: 275}} >
          {loading?<LoadingInterface />:
            <Card sx={{px:{ xs: 3, md: 10 },py:5}}>{card}</Card>}
          </Box>
        </div>
      }
    </>
  );
}

export default BookEdit;