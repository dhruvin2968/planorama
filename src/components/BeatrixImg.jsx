const Beatrix = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center w-40 h-40  bg-transparent  cursor-pointer"
    >
      <img
        src="/beatrix.png"
        alt="Beatrix"
        className="md:w-26 md:h-26 h-24 w-24 object-contain"
      />
    </div>
  );
};
export default Beatrix;
