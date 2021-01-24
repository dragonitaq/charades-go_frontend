import React from 'react';

import './loader.style.scss';

const Loader = () => {
  return (
    <div className='loader-container'>
      <div className='loader'>
        <div className='face face1'>
          <div className='circle'></div>
        </div>
        <div className='face face2'>
          <div className='circle'></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
