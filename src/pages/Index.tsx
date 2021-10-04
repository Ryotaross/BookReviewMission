import React from 'react';
import BookIndex from '../components/BookIndex';
import Header from './header';
import '../App.css';

function Index() {
  return (
    <div className="App">
      <Header />
      <BookIndex />
    </div>
  );
}

export default Index;