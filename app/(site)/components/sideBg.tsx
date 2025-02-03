import React from "react";

const SideBg = () => {
  return (
    <div className="relative w-1/2 h-screen bg-[#F7F7F7] flex justify-center items-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        <path
          fill="#6C63FF"
          d="M50,-63.3C63.3,-50,72.5,-31.1,75.4,-11.1C78.3,8.9,75,29.9,64.6,45.7C54.2,61.5,36.6,72.1,18.1,78.8C-0.5,85.5,-19.8,88.3,-34.7,79.7C-49.7,71.2,-60.2,51.3,-65.1,33.3C-70,15.3,-69.3,-0.9,-66.4,-19.5C-63.5,-38.2,-58.3,-59.3,-44.2,-72.1C-30.2,-84.9,-15.1,-89.5,2.5,-92.7C20.1,-96,40.1,-97.8,50,-63.3Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
};

export default SideBg;