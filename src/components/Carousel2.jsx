import React, { useEffect, useRef } from 'react';

const images = [
  'i1.png', 'i2.png', 'i3.png', 'i4.png', 'i7.png', 
  'i8.png', 'i9.png', 'i10.png', 'i11.png'
];

const Carousel2 = () => {
  const carouselRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const content = contentRef.current;
    if (!carousel || !content) return;

    const scrollSpeed = 0.5;
    let animationFrameId;

    const scroll = () => {
      carousel.scrollLeft += scrollSpeed;
      if (carousel.scrollLeft >= content.offsetWidth / 2) {
        carousel.scrollLeft -= content.offsetWidth / 2;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      ref={carouselRef}
      className="flex absolute z-40 overflow-hidden w-full"
      style={{ height: '200px' }}
    >
      <div ref={contentRef} className="flex" style={{ whiteSpace: 'nowrap' }}>
        {[...images, ...images].map((image, index) => (
          <div key={index} className="flex-shrink-0 mx-2">
            <img 
              src={image} 
              alt="" 
              className="h-full pt-4 w-auto object-contain relative"
              style={{ maxWidth: '200px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel2;
