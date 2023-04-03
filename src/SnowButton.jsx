const SnowButton = ({ isActive, handleClick }) => {
  return (
    <button
      id="Snowy"
      onClick={handleClick}
      className="hover:bg-acnh-brown hover:shadow-lg p-6 rounded-xl transition-all duration-200 group"
    >
      <svg
        className={`w-12 h-12 ${
          isActive ? "fill-acnh-blue" : "fill-grey"
        } group-hover:fill-grey transition-all duration-200`}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M23,12a1,1,0,0,1-1,1H18.414l2.293,2.293a1,1,0,0,1-1.414,1.414L15.586,13H13v2.586l3.707,3.707a1,1,0,0,1-1.414,1.414L13,18.414V22a1,1,0,0,1-2,0V18.414L8.707,20.707a1,1,0,1,1-1.414-1.414L11,15.586V13H8.414L4.707,16.707a1,1,0,0,1-1.414-1.414L5.586,13H2a1,1,0,0,1,0-2H5.586L3.293,8.707A1,1,0,1,1,4.707,7.293L8.414,11H11V8.414L7.293,4.707A1,1,0,1,1,8.707,3.293L11,5.586V2a1,1,0,0,1,2,0V5.586l2.293-2.293a1,1,0,1,1,1.414,1.414L13,8.414V11h2.586l3.707-3.707a1,1,0,1,1,1.414,1.414L18.414,11H22A1,1,0,0,1,23,12Z" />
      </svg>
    </button>
  );
};

export default SnowButton;
