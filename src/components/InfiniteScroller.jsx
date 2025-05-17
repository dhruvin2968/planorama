export const InfiniteScroller = () => {
  const images = [
    'https://images.squarespace-cdn.com/content/v1/64ba44348b6a05559a816bc1/1690282971608-B4BD48EE7DOGJDWKOL52/A+Guide+to+Travel+Photography-152.jpg',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJhdmVsfGVufDB8fDB8fHww',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZbPykpUstdGC5498x9jp1UDbEUfIhVz58ow&s',
    'https://dailywildlifephoto.nathab.com/photography-guide/wp-content/uploads/2016/05/alaska-1.jpg',
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/77/c8/1c/caption.jpg?w=1200&h=1200&s=1',
    'https://lp-cms-production.imgix.net/2022-12/GettyImages-679775764.jpeg?w=1095&fit=crop&crop=faces%2Cedges&auto=format&q=75',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1200px-Taj_Mahal_%28Edited%29.jpeg'
  ];

  return (
    <div className="relative h-48 overflow-hidden group">
      <div className="absolute flex w-max animate-infinite-scroll group-hover:[animation-play-state:paused]">
        {[...images, ...images].map((img, i) => (
          <img 
            key={i}
            src={img}
            className="w-48 h-48 mx-4 rounded-lg shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            alt="scrolling visual"
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};
