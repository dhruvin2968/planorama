
const Beatrix = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center w-40 h-40  bg-transparent  cursor-pointer"
    >
      <img
        src="/beatrix.png" 
        alt="Beatrix"
        className="w-28 h-28 object-contain"
      />
    </div>
  );
};
export default Beatrix