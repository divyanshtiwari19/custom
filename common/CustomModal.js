import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { BsXLg } from "react-icons/bs";
import { AiOutlineExpand } from "react-icons/ai";
import { MdClose } from "react-icons/md";

export default function CustomModal({
  label,
  isOpen,
  setIsOpen,
  renderData,
  maxWidth,
  isFullScreen = false,
  setIsFullScreen,
  showFullScreenIcon = true,
  showSubmitButton = true,
  buttonLabel = "Submit",
  onFooterBtnClick,
  footerBtnClass,
  showHeader = true,
}) {
  const [fullScreen, setFullScreen] = useState(isFullScreen);

  useEffect(() => {
    setIsFullScreen && setIsFullScreen(fullScreen);
  }, [fullScreen]);

  return (
    <div>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "#18181b",
            boxShadow: "none",
          },
        }}
        fullWidth
        maxWidth={maxWidth}
        fullScreen={fullScreen}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        {showHeader && (
          <DialogTitle id="responsive-dialog-title" className="!pb-0">
            <div className="flex justify-between items-center">
              <div className="text-lg text-zinc-50 font-bold ">{label}</div>
              <div className="flex gap-2 items-center justify-between text-sm text-zinc-50 cursor-pointer">
                {showFullScreenIcon ? (
                  <div
                    className="text-base"
                    onClick={() => setFullScreen(!fullScreen)}
                  >
                    <AiOutlineExpand />
                  </div>
                ) : null}
                <div
                  className="text-xl text-zinc-500 hover:text-zinc-100 duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <MdClose />
                </div>
              </div>
            </div>
          </DialogTitle>
        )}

        <DialogContent className="!pt-6">
          {renderData && renderData}
        </DialogContent>
        {showSubmitButton ? (
          <DialogActions className="!px-6 !pb-4">
            <div className="flex items-center justify-end">
              <Button
              type="submit"
                onClick={onFooterBtnClick}
                variant="contained"
                className={
                  footerBtnClass
                    ? footerBtnClass
                    : "!bg-blue-600 hover:!bg-blue-700"
                }
              >
                {buttonLabel}
              </Button>
            </div>
          </DialogActions>
        ) : null}
      </Dialog>
    </div>
  );
}
