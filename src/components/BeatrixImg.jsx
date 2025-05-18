const Beatrix = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center  bg-transparent  cursor-pointer"
    >
      <img
        src="/beatrix.png"
        alt="Beatrix"
        className=" h-24 w-24 object-contain"
      />
    </div>
  );
};
export default Beatrix;
