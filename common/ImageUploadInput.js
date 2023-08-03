import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";

function ImageUploadInput({
  onImageUpload,
  error,
  defaultImage,
  label,
  acceptType,
  acceptTypeErrMsg = "please upload valid file",
  filesizeErrMsg = "Image size should be less",
  filesize,
}) {
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isDefaultImage, setIsDefaultImage] = useState(false);
  const imageRef = useRef();
  const handleImage = (e) => {
    let image = document.getElementById("previewImage");
    let file = e.target.files[0];
    if (file) {
      const parts = file.name.split(".");
      const fileExtention = parts[parts.length - 1].toLowerCase();
      if (
        Array.isArray(acceptType) &&
        acceptType.length > 0 &&
        !acceptType.includes(fileExtention)
      ) {
        setImageError(true);
        setErrorMessage(acceptTypeErrMsg);
        image.src = "";
        e.target.value = null;
        onImageUpload(null);
        setImage(null);
        return;
      }
      if (filesize && parseInt(file.size) > parseInt(filesize * 1024)) {
        setImageError(true);
        setErrorMessage(filesizeErrMsg);
        image.src = "";
        e.target.value = null;
        onImageUpload(null);
        setImage(null);
        return;
      }
      const FR = new FileReader();
      FR.addEventListener("load", function (evt) {
        image.src = evt.target.result;
        onImageUpload(evt.target.result);
        setImage(evt.target.result);
      });
      FR.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    let image = document.getElementById("previewImage");
    imageRef.current.value = null;
    image.src = "";
    onImageUpload(null);
    setImage(null);
    setErrorMessage(null);
    setIsDefaultImage(false);
  };

  useEffect(() => {
    if (defaultImage) {
      let image = document.getElementById("previewImage");
      image.src = defaultImage;
      setImageError(false);
      setIsDefaultImage(true);
    }
  }, [defaultImage]);

  useEffect(() => {
    setImageError(error);
  }, [error]);

  useEffect(() => {
    if (image) {
      setImageError(false);
    }
  }, [image]);

  return (
    <div>
      <div
        className={`w-full h-full border rounded-[5px] relative border-zinc-500 hover:border-zinc-300 duration-300 min-h-[10rem] group ${
          imageError && "!border-[#F07575]"
        }`}
      >
        {(image || isDefaultImage) && (
          <>
            <MdClose
              onClick={removeImage}
              className="absolute z-20 -top-2.5 -right-2.5 bg-red-500 p-1 text-2xl border-2 rounded-full text-white duration-300 cursor-pointer"
            />
            <p className="absolute -top-2.5 text-white left-2 bg-zinc-900 z-20 px-1.5 py-0.5 text-xs rounded-md">
              {label}
            </p>
          </>
        )}

        <div className="absolute inset-0 grid place-content-center">
          <IoCloudUploadOutline
            className={`text-zinc-500 group-hover:text-zinc-400 duration-300 text-5xl mx-auto mb-2 ${
              imageError && "!text-[#F07575]"
            }`}
          />
          <p
            className={`text-zinc-500 group-hover:text-zinc-400 duration-300 ${
              imageError && "!text-[#F07575]"
            }`}
          >
            Upload {label}
          </p>
        </div>
        <Button
          className="!block !h-full !opacity-0 !absolute !inset-0 !z-10"
          variant="contained"
          component="label"
        >
          <input
            ref={imageRef}
            onChange={(e) => handleImage(e)}
            hidden
            accept="image/*"
            type="file"
          />
        </Button>
        <img
          className="w-full object-contain max-h-[22rem] relative rounded-md"
          id="previewImage"
          src=""
        />
      </div>
      {imageError && errorMessage && (
        <div className="text-[#F07575] text-xs ml-4 mt-1">{errorMessage}</div>
      )}
    </div>
  );
}

export default ImageUploadInput;
