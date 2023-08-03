import React from "react";

function IconTooltip({ children, tooltipText }) {
  return (
    <div className="tooltip-parent">
      <span className="tooltip ">{tooltipText}</span>
      <span>{children}</span>
    </div>
  );
}

export default IconTooltip;
