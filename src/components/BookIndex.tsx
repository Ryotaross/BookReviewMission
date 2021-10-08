import React from 'react';
import '../style/Form.css';
import { useState,useEffect } from 'react';
import { Redirect,useHistory } from 'react-router-dom';
import axios from 'axios';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { grey } from '@mui/material/colors';
import { lightBlue } from '@mui/material/colors';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';

function BookIndex() {
  const[reviews,setReviews] = useState([{id: "",title: "",url: "",detail: "",review: "",reviewer: "",}])
  const[loginUser,setLoginUser] = useState<any>([{name:''}]);
  const token = localStorage.getItem('token');
  const history = useHistory();

  useEffect(()=>{
    if(token === "" || token === 'null' || token === 'undefined'){
      axios.get(`https://api-for-missions-and-railways.herokuapp.com/public/books`)
      .then(res => {
        setReviews( res.data );
      })
    }else{
      axios.get(`https://api-for-missions-and-railways.herokuapp.com/books`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(res => {
        setReviews( res.data );
      })
      axios.get('https://api-for-missions-and-railways.herokuapp.com/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(res => {
        setLoginUser(res.data);
        console.log(loginUser);
      })
    }
  },[])

  const handleDetail = (event: any)=> {
    history.push({
      pathname: '/detail/' + event.target.value
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
    reviews.map((review) =>
    <React.Fragment key={review.id}>
      <CardContent sx={{mx:'auto',my:2,width:400,height:350,border:1,bgcolor:blueGrey[800],color:grey[50],borderColor: 'grey.500',boxShadow: 1}}>
        <Typography sx={{ display:'flex',ml:1,fontSize: 14 ,textAlign:'left',overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap'}} gutterBottom>
          <Avatar {...stringAvatar(review.reviewer)} /><div className="indexReviewer">{review.reviewer}</div>
        </Typography>
        <Typography variant="h6" component="div" sx={{my:2,ml:1,textAlign:'left',mb:3}} className="indexReview">
          {review.review}
        </Typography>
        <Typography sx={{ display:'flex',my:1,ml:2,fontSize: 13 ,textAlign:'left',color:blueGrey[200]}} gutterBottom className="indexTitle">
          <BookIcon /><div className="indexTitleName">{review.title}</div>
        </Typography>
        <CardActions>
          <Button size="small" onClick={handleDetail} value={review.id} sx={{color:lightBlue[500]}}>詳しく見る</Button>
        </CardActions>
      </CardContent>
    </React.Fragment>
    )
  );

  return (
    <>
    {token === '' || token === null || token === 'undefined'?<Redirect to="/login" />:
      <div>
        <Box sx={{bgcolor: 'background.paper',pt: 8,pb: 6}}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h4"
              align="left"
              color="text.primary"
              gutterBottom
            >
              本を紹介してみよう！
            </Typography>
            <Typography variant="h5" align="left" color="text.secondary" paragraph>
              書籍のレビューサイトです。<br />
              気になる書籍のレビューを読んでみよう！<br />
              お気に入りの書籍のレビューもしてみよう！<br />
            </Typography>
          </Container>
        </Box>
        <Box sx={{ minWidth: 275}} >
          <Typography variant="body1" align="right" color="text.secondary" sx={{ml:3,display:'flex'}} paragraph>
            <PersonIcon /><div>{loginUser.name}</div>    
          </Typography>
          <Card sx={{display:'flex',flexWrap: 'wrap',alignItems:'flex-start',px:{ xs: 3, md: 10 },py:1,bgcolor:grey[200]}}>{card}</Card>
        </Box>
      </div>
    }
    </>
  );
}

export default BookIndex;