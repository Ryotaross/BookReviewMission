import React from 'react';
import ReactDOM from 'react-dom';
import '../style/Form.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';


function BookIndex() {
  const[reviews,setReviews] = useState([{id: "",title: "",url: "",detail: "",review: "",reviewer: "",}])

  useEffect(()=>{
    axios.get(`https://api-for-missions-and-railways.herokuapp.com/public/books?offset=10`)
      .then(res => {
        setReviews( res.data );
      })
  },[])

  return (
    <>
      <Button variant="contained">Hello World</Button>
    </>
  );
}

export default BookIndex;