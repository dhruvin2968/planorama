import React from 'react';

const BgImg= () => {
  return (
    <div className="absolute right-0 top-0 h-full">
      <img
        src="/nature.jpg" 
        alt="Background"
        className=" h-screen rounded-l-full object-cover relative right-0 "
      />
      <div className="absolute inset-0 bg-gradient-to-b" />
    </div>
  );
};

export default BgImg;


