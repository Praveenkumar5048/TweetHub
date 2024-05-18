import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="h-[95vh] w-full flex justify-center items-center">
      <ThreeCircles
        visible={true}
        height="70"
        width="70"
        color="#1F2937"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperclassName=""
      />
    </div>
  );
};
export default Loader;