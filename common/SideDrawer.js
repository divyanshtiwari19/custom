import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function SideDrawer({
  anchor,
  renderData,
  size,
  open,
  setOpen,
  zIndex = 100,
}) {
  // const [state, setState] = React.useState({
  //   top: false,
  //   left: false,
  //   bottom: false,
  //   right: false,
  // });

  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }

  //   setState({ ...state, [anchor]: open });
  // };

  return (
    <div>
      <React.Fragment key={anchor}>
        {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
        <Drawer
          style={{ zIndex: zIndex }}
          sx={{
            "& .MuiBox-root": {
              height: "100% !important",
            },
          }}
          PaperProps={{
            sx: {
              backgroundColor: "#27272a",
              // width: "100%",
            },
            className: `!w-full ${size}`,
          }}
          anchor={anchor}
          // open={state[anchor]}
          open={open}
          onClose={() => setOpen(false)}
        >
          <Box
          // sx={{
          //   width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
          // }}

          // role="presentation"
          // onClick={toggleDrawer(anchor, false)}
          // onKeyDown={toggleDrawer(anchor, false)}
          >
            {renderData}
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
