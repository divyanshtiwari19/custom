import React, { useEffect, useState } from "react";
import Image from "next/image";

const ImageWithFallback = (props) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(fallbackSrc);
  useEffect(() => {
    if (src) {
      setImgSrc(src);
    } else {
      setImgSrc(fallbackSrc);
    }
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithFallback;
