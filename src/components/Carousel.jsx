import React, { useEffect, useRef } from "react";

const images = [
  "i1.png",
  "i2.png",
  "i3.png",
  "i4.png",
  "i7.png",
  "i8.png",
  "i9.png",
  "i10.png",
  "i11.png",
  "i1.png",
  "i2.png",
  "i3.png",
  "i4.png",
  "i7.png",
  "i8.png",
  "i9.png",
  "i10.png",
  "i11.png",
];

const Carousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5; // Adjust this value to control the speed
      if (scrollPosition >= carousel.scrollWidth / 2) {
        scrollPosition = 0;
      }
      carousel.scrollLeft = scrollPosition;
      requestAnimationFrame(scroll);
    };

    requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(scroll);
  }, []);

  return (
    <div
      ref={carouselRef}
      className="flex absolute z-20 overflow-hidden w-full"
      style={{ height: "150px" }} // Adjust this value to control the height of the carousel
    >
      {[...images, ...images].map((image, index) => (
        <div key={index} className="flex-shrink-0 mx-2">
          <img
            src={image}
            alt=""
            className="h-full pt-4 w-auto object-contain relative "
            style={{ maxWidth: "200px" }} // Adjust this value to control the maximum width of each image
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
