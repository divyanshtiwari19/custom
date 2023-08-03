import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { MdClose } from "react-icons/md";
import { Box } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenModal({
  open,
  setOpen,
  title,
  renderData,
  showButton = true,
  saveBtnTitle,
  onSubmit,
  handleSubmit,
  loading,
  reset,
  headerRightComp,
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{
        "& .MuiPaper-root": {
          background: "#18181b",
        },
      }}
    >
      <AppBar
        sx={{
          position: "fixed",
        }}
      >
        <Toolbar className="!bg-zinc-900">
          <Typography sx={{ flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
          <div className="flex gap-8 items-center">
            {headerRightComp && headerRightComp}
            {showButton && !loading && (
              <Button
                autoFocus
                className={`!bg-blue-600 hover:!bg-blue-700 !text-zinc-50`}
                onClick={handleSubmit && onSubmit && handleSubmit(onSubmit)}
              >
                {saveBtnTitle}
              </Button>
            )}
            {showButton && loading && (
              <Button
                className={`!bg-blue-600 hover:!bg-blue-700 !text-zinc-50 !opacity-50`}
              >
                {saveBtnTitle}
              </Button>
            )}
            <IconButton
              edge="start"
              color="inherit"
              className="!bg-zinc-800 !text-2xl hover:!bg-zinc-700 !duration-300"
              onClick={handleClose}
              aria-label="close"
            >
              <MdClose />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Box sx={{ pt: "4rem" }}>{renderData}</Box>
    </Dialog>
  );
}
