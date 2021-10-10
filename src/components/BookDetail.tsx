import React from 'react';
import '../style/Form.css';
import { useState,useEffect } from 'react';
import { Redirect,useParams,useHistory } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';
import { Link } from '@mui/material';
import { Avatar } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { blueGrey } from '@mui/material/colors';
import { grey } from '@mui/material/colors';
import { lightBlue } from '@mui/material/colors';
import LoadingInterface from './LoadingInterface';

function BookDetail() {
  const[review,setReview] = useState({id: "",title: "",url: "",detail: "",review: "",reviewer: "",isMine:true})
  const token = localStorage.getItem('token');
  const message = localStorage.getItem('message');
  const[loading,setLoading] = useState(true);
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
    setTimeout(() => localStorage.removeItem("message"), 500);
  },[])

  const handleEdit = (event: any)=> {
    history.push({
      pathname: '/edit/' + event.target.value
  })
  }
  
  function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }

  const card = (
    <React.Fragment key={review.id}>
      <CardContent sx={{m:'auto',my:{ xs: 3, md: 10 },width:{ xs: 400, md: 800 },border:1,bgcolor:blueGrey[800],color:grey[50],borderColor: 'grey.500',boxShadow: 1}}>
        <Typography sx={{ display:'flex',ml:1,fontSize: 14 ,textAlign:'left',overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap'}} gutterBottom>
          <Avatar {...stringAvatar(review.reviewer)} /><div className="indexReviewer">{review.reviewer}</div>
        </Typography>
        <Typography variant="h6" component="div" sx={{my:2,ml:1,textAlign:'left',mb:3}}>
          {review.review}
        </Typography>
        <Typography sx={{ display:'flex',my:1,ml:2,fontSize: 13 ,textAlign:'left',color:blueGrey[200]}} gutterBottom >
          <BookIcon /><div className="indexTitleName">{review.title}</div>
        </Typography>
        <Typography sx={{ display:'flex',my:1,ml:2,fontSize: 13 ,textAlign:'left',color:blueGrey[200]}} gutterBottom >
          <ArrowForwardIosIcon /><div className="indexTitleName">{review.detail}</div>
        </Typography>
        <CardActions>
        <Link href={review.url} underline="hover" sx={{color:lightBlue[500]}}>
          商品ページを見る
        </Link>
          {review.isMine === true?<Button size="small" variant="contained" onClick={handleEdit} value={review.id} sx={{ml:2}}>修正</Button>:<span></span>}
        </CardActions>
      </CardContent>
    </React.Fragment>
  );

  return (
    <>
    {token === '' || token === null || token === 'undefined'?<Redirect to="/login" />:
      <div>
        {message?
        <Alert severity="success">{message}</Alert>:''}
        <Box sx={{ minWidth: 275}} >
        {loading?<LoadingInterface />:
          <Card sx={{px:{ xs: 3, md: 10 },py:1}}>{card}</Card>}
        </Box>
      </div>
    }
    </>
  );
}

export default BookDetail;