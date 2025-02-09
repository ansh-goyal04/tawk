import React from "react";

const SideBg = () => {
  return (
    <div className="relative w-full h-screen bg-white flex justify-center items-center">
<div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
<path d="M 14 4 C 8.4886661 4 4 8.4886661 4 14 L 4 36 C 4 41.511334 8.4886661 46 14 46 L 36 46 C 41.511334 46 46 41.511334 46 36 L 46 14 C 46 8.4886661 41.511334 4 36 4 L 14 4 z M 14 6 L 36 6 C 40.430666 6 44 9.5693339 44 14 L 44 36 C 44 40.430666 40.430666 44 36 44 L 14 44 C 9.5693339 44 6 40.430666 6 36 L 6 14 C 6 9.5693339 9.5693339 6 14 6 z M 25 11 C 16.806196 11 10 16.724334 10 23.962891 C 10 28.422653 12.681228 32.244798 16.572266 34.560547 C 15.979588 35.500836 15.233739 36.474116 14.300781 37.384766 A 1.0001 1.0001 0 0 0 15.173828 39.083984 C 17.481979 38.674506 19.894769 37.826205 21.878906 36.597656 C 22.885987 36.785688 23.918133 36.925781 25 36.925781 C 33.193804 36.925781 40 31.201447 40 23.962891 C 40 16.724334 33.19389 11 25 11 z M 25 13 C 32.27011 13 38 17.989447 38 23.962891 C 38 29.936334 32.270196 34.925781 25 34.925781 C 23.93592 34.925781 22.905081 34.805366 21.904297 34.597656 A 1.0001 1.0001 0 0 0 21.148438 34.744141 C 20.222493 35.357332 19.095857 35.862111 17.912109 36.279297 C 18.279348 35.7823 18.664906 35.29371 18.921875 34.736328 A 1.0001 1.0001 0 0 0 18.457031 33.421875 C 14.551886 31.494479 12 27.967608 12 23.962891 C 12 17.989447 17.729804 13 25 13 z"></path>
</svg>
    </div>
    </div>
  );
};

export default SideBg;
