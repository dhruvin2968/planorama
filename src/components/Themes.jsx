import React from 'react';
const images = [
  
  '/r4.png',
  '/r3.png',
  '/r6.png',
  '/r5.png',
  '/r1.png',
  '/r2.png'
  
];

export const Themes= () => {
  return (
    <div className="relative masonry-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
       {images.map((image, index) => (
        <div key={index} className="masonry-item bg-gray-900 rounded-lg overflow-hidden">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};
