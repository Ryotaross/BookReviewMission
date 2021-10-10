import React from 'react';
import '../style/Form.css';
import { useState } from 'react';
import { Redirect,useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { blueGrey } from '@mui/material/colors';
import { grey } from '@mui/material/colors';
import DialogInterface from './Dialog';

function NewReview() {
  const[review,setReview] = useState({id: "",title: "",url: "",detail: "",review: "",reviewer: ""})
  const[errorCodes,setErrorCodes] = useState([])
  const[ErrorMessageJP,setErrorMessageJP] = useState([])
  const[ErrorMessageEN,setErrorMessageEN] = useState([])
  const[Error,setError] = useState(false)
  const[open, setOpen] = useState(false);
  const token = localStorage.getItem('token');
  const history = useHistory();

  const handleSubmit = () => {
    setError(false)
    const requestOptions ={
      method: 'POST',
      headers:{ Authorization: `Bearer ${token}`,},
      body: JSON.stringify({title:review.title,url:review.url,detail:review.detail,review:review.review},
      )
    };
    fetch("https://api-for-missions-and-railways.herokuapp.com/books",requestOptions,)
      .then((response)=> response.json()
      )
      .then((response) =>{
        setErrorCodes(response.ErrorCode)
        setErrorMessageJP(response.ErrorMessageJP)
        setErrorMessageEN(response.ErrorMessageEN)
        if(response.ErrorCode){
          setError(true)
        }else{
          history.replace('/')
          localStorage.setItem('message', '投稿しました')
        }
      })
      .catch((error)=>{
      })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const card = (
    <React.Fragment >
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
          variant="standard"
          onChange={event => setReview({ ...review, title: event.target.value })}
          sx={{my:2}}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="商品ページURL"
          variant="standard"
          onChange={event => setReview({ ...review, url: event.target.value })}
          sx={{my:2}}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="あらすじ"
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
          variant="standard"
          multiline={true}
          maxRows= {10}
          onChange={event => setReview({ ...review, review: event.target.value })}
          sx={{my:2}}
        />
        <Button variant="contained" sx={{m:1}} onClick={handleClickOpen} >投稿</Button>
        <DialogInterface open={open} handleClose={handleClose} review={review} handleSubmit={handleSubmit} type="create" button="投稿" />
      </CardContent>
    </React.Fragment>
  );

  return (
    <>
      {token === '' || token === null || token === 'undefined'?<Redirect to="/login" />:
        <div>
          <Box sx={{ minWidth: 275}} >
            <Card sx={{px:{ xs: 3, md: 10 },py:5}}>{card}</Card>
          </Box>
        </div>
      }
    </>
  );
}

export default NewReview;