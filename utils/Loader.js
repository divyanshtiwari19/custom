import React from "react";
import "antd/dist/antd.css";

import { LoadingOutlined } from "@ant-design/icons";

const Loader = () => {
  return (
    <span>
      <LoadingOutlined style={{fontSize:16, fontWeight:"bold" , marginRight:10}} /> Please wait...
    </span>
  );
};

export default Loader;
