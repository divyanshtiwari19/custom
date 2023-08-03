import { Button, CircularProgress, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Download } from "../../functions/ResourceDownload";
import {MdOutlineKeyboardArrowDown} from 'react-icons/md';

function ExportCSV({
  name = "Export",
  exportUrl,
  exportPdfUrl,
  exportLabel,
  extension,
  showMenu,
  size = "large",
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log("inside handleclidk");
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isExporting, setIsExporting] = useState(false);
  const exportData = (exportType) => {
    setIsExporting(true);
    const data = Download(exportLabel, exportType || extension, exportType === "pdf" ? exportPdfUrl : exportUrl);
    data
      .then((res) => {
        setIsExporting(false);
      })
      .catch((err) => {
        setIsExporting(false);
      });
  };
  return (
    <>
      {isExporting ? (
        <Button className="!bg-green-600 hover:!bg-green-700 px-4 !text-zinc-50 opacity-60">
          Exporting
          <CircularProgress size={16} className="!text-zinc-300" />
        </Button>
      ) : (
        <Button
          // onClick={() => exportData()}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={(e) => (showMenu ? handleClick(e) : exportData())}
          className={`!bg-green-600 hover:!bg-green-700 !px-4 !text-zinc-50 ${size === "large" ? "!text-base !py-1": size === "medium" ? "!text-sm": "!text-xs"}`}
          endIcon={showMenu && <MdOutlineKeyboardArrowDown />}
        >
          {name}
        </Button>
      )}

      {showMenu && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          // elevation={0}
          PaperProps={{
            elevation: 0,
            sx: {
              "& .MuiList-root": {
                background: "#3f3f46",
                color: "#d4d4d8",
              },
              "& .MuiMenuItem-root:hover": {
                background: "#52525b",
              },
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
                background: "#3f3f46",
              },
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => {
              exportData("pdf"), handleClose();
            }}
          >
            Export as PDF
          </MenuItem>
          <MenuItem
            onClick={() => {
              exportData("xlsx"), handleClose();
            }}
          >
            Export as Excel File
          </MenuItem>
        </Menu>
      )}
      {/* <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}
    </>
  );
}

export default ExportCSV;
