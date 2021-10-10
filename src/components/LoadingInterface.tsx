import React from 'react';
import Loader from 'react-loader-spinner';

function LoadingInterface(){
  return(
    <Loader
      type="TailSpin"
      color="#00BFFF"
      height={100}
      width={100}
    />
  );
}

export default LoadingInterface;