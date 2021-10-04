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
import { isSetAccessor } from 'typescript';
import { reverse } from 'dns';

function BookDetail() {
  const[review,setReview] = useState({id: "",title: "",url: "",detail: "",review: "",reviewer: ""})
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

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  
  const card = (
    
    <React.Fragment key={review.id}>
      <CardContent sx={{ mx: "auto",my:1,width:600,border:1,borderColor: 'grey.500',boxShadow: 1}}>
        <Typography sx={{ ml:1,fontSize: 14 ,textAlign:'left'}} color="text.secondary" gutterBottom>
          {review.reviewer}
        </Typography>
        <Typography variant="h5" component="div" sx={{my:2,ml:1,textAlign:'left'}}>
          {review.review}
        </Typography>
        <Typography sx={{ my:1,ml:2,fontSize: 14 ,textAlign:'left'}} color="text.secondary" gutterBottom>
          {review.title}
        </Typography>
        <Typography sx={{ my:1,ml:2,fontSize: 14 ,textAlign:'left'}} color="text.secondary" gutterBottom>
          {review.detail}
        </Typography>
        <Typography sx={{ my:1,ml:2,fontSize: 14 ,textAlign:'left'}} color="text.secondary" gutterBottom>
          {review.url}
        </Typography>
        <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
      </CardContent>
    </React.Fragment>
    
  );

  return (
    <>
    {token === '' || token === null || token === 'undefined'?<Redirect to="/login" />:
      <div>
        <p>{loginUser.name}</p>
        <Box sx={{ minWidth: 275}} >
          <Card variant="outlined" >{card}</Card>
        </Box>
      </div>
    }
    </>
  );
}

export default BookDetail;