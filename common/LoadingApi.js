import React from "react";

function LoadingApi({ containerclassName }) {
  return (
    <div className={`${containerclassName && containerclassName}`}>
      <div className="dots"></div>
    </div>
  );
}

export default LoadingApi;
