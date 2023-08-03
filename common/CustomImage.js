import { useEffect, useState } from "react";
import Image from "next/image";

const CustomImage = ({ fallbackSrc, src, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      fill
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc ? fallbackSrc : "/avatar.png");
      }}
    />
  );
};

export default CustomImage;
