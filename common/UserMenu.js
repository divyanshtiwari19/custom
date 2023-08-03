// import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { getAWSUserPictureByObjOrArr } from "../../utils/utils";
import { FiLogOut } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import { CgMenuLeft } from "react-icons/cg";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Context } from "../../context";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import { SiGoogleclassroom } from "react-icons/si";
import { Avatar } from "@mui/material";

// export default function UserMenu() {
//   const {
//     state: { user },
//     dispatch,
//   } = useContext(Context);
//   const router = useRouter();
//   const logout = () => {
//     function getCookie(key) {
//       var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
//       return b ? b.pop() : "";
//     }
//     const sid = getCookie("SID") ? getCookie("SID") : null;
//     dispatch({ type: "LOGOUT" });
//     router.push(
//       `http://accounts.cyberyami.com/logout?url=${process.env.NEXT_PUBLIC_BASE_URL}&sid=${sid}`
//     );
//   };

//   return (
//     <Menu as="div" className="relative inline-block text-left">
//       <div>
//         <Menu.Button
//           className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-full text-sm text-center h-10 w-10 border-zinc-200 border"
//           type="button"
//         >
//           <Image
//             className="object-cover rounded-full"
//             src={getAWSUserPictureByObjOrArr(user?.picture)}
//             fill
//             alt="profile picture"
//           />
//         </Menu.Button>
//       </div>
//       <Transition
//         as={Fragment}
//         enter="transition ease-out duration-100"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//           <div className="px-1 py-1 ">
//             <Menu.Item>
//               {({ active }) => (
//                 <Link
//                   href="/dashboard/profile"
//                   className={`${
//                     active ? "bg-cy-green-900/70 text-white" : "text-gray-900"
//                   } group flex gap-3 w-full items-center rounded-md px-2 py-2 text-sm`}
//                 >
//                   <BsPersonCircle />
//                   {`${user?.firstname} ${user?.lastname}`}
//                 </Link>
//               )}
//             </Menu.Item>
//             <Menu.Item>
//               {({ active }) => (
//                 <Link
//                   href="/dashboard"
//                   className={`${
//                     active ? "bg-cy-green-900/70 text-white" : "text-gray-900"
//                   } group flex gap-3 w-full items-center rounded-md px-2 py-2 text-sm`}
//                 >
//                   <FaChalkboardTeacher />
//                   My Dashboard
//                 </Link>
//               )}
//             </Menu.Item>
//             <Menu.Item>
//               {({ active }) => (
//                 <Link
//                   href="/dashboard"
//                   className={`${
//                     active ? "bg-cy-green-900/70 text-white" : "text-gray-900"
//                   } group flex w-full gap-3 w-full items-center rounded-md px-2 py-2 text-sm sm:hidden`}
//                 >
//                   <SiGoogleclassroom />
//                   My Classroom
//                 </Link>
//               )}
//             </Menu.Item>
//           </div>
//           <div className="px-1 py-1">
//             <Menu.Item>
//               {({ active }) => (
//                 <button
//                   onClick={logout}
//                   className={`${
//                     active ? "bg-red-500 text-white" : "text-gray-900"
//                   } group flex gap-3 w-full items-center rounded-md px-2 py-2 text-sm`}
//                 >
//                   <FiLogOut />
//                   Logout
//                 </button>
//               )}
//             </Menu.Item>
//           </div>
//         </Menu.Items>
//       </Transition>
//     </Menu>
//   );
// }

// import * as React from 'react';
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ManageStuProfile from "../admin/manage/ManageStuProfile";
import ManageProfile from "../admin/manage/ManageProfile";
import ManageInstrProfile from "../admin/manage/ManageInstrProfile";
import InstitutionalAdmin from "../admin/manage/InstitutionalAdmin";
import CustomModal from "./CustomModal";

export default function BasicMenu() {
  const [openStudentProfileModal, setOpenStudentProfileModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  const router = useRouter();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    handleClose();
    toast.success("Logout successfully");
    router.push("/");
  };

  return (
    <div>
      <CustomModal
        label="Manage Profile"
        isOpen={openStudentProfileModal}
        setIsOpen={setOpenStudentProfileModal}
        renderData={
          user?.role?.includes("admin") ? (
            <ManageProfile />
          ) : user?.role?.includes("instructor") ? (
            <ManageInstrProfile />
          ) : user?.role?.includes("student") ? (
            <ManageStuProfile />
          ) : (
            <InstitutionalAdmin />
          )
        }
        maxWidth="sm"
        buttonLabel="Submit"
        showFullScreenIcon={false}
        showSubmitButton={false}
      />
      <Button
        sx={{ p: 0, minWidth: "20px" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <div className="relative text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-full text-sm text-center h-8 w-8 border-zinc-200 border">
          {user?.picture?.Location ? (
            <Image
              className="absolute object-cover rounded-full"
              // src={getAWSUserPictureByObjOrArr(user?.picture)}
              src={user?.picture?.Location || "/images/no-image.png"}
              alt="profile pic"
              layout="fill"
            />
          ) : (
            <Avatar className="!bg-zinc-800 !capitalize !w-full !h-full text-base">
              {Array.isArray(user?.role) && user?.role.includes("admin")
                ? `${user?.firstName ? user?.firstName.charAt(0) : "N/A"}${
                    user?.lastName ? user?.lastName.charAt(0) : null
                  }`
                : `${user?.firstname ? user?.firstname.charAt(0) : "N/A"}${
                    user?.lastname ? user?.lastname.charAt(0) : null
                  }`}
            </Avatar>
          )}
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            "& .MuiList-root": {
              background: "#18181b",
              color: "#d4d4d8",
            },
            "& .MuiMenuItem-root:hover": {
              background: "#27272a",
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
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => setOpenStudentProfileModal(true)}>
          <div
            className={`!text-white  flex gap-3 w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            <BsPersonCircle />

            {user?.username}
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <Link
            href={
              user?.role?.includes?.("student")
                ? "/dashboard"
                : user?.role?.includes?.("instructor")
                ? "/instructor/dashboard"
                : user?.role?.includes?.("admin")
                ? "/admin/dashboard"
                : "/"
            }
            // className={`${
            //   active ? "bg-cy-green-900/70 text-white" : "text-gray-900"
            // } group flex gap-3 w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            <a
              className={`!text-white  flex gap-3 w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              <FaChalkboardTeacher />
              My Dashboard
            </a>
          </Link>
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          {" "}
          <Link
            href="/dashboard"
         
          >
            <a
              className={`  flex gap-3 w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              <SiGoogleclassroom />
              My Classroom
            </a>
          </Link>
        </MenuItem> */}
        <MenuItem onClick={logout}>
          <div
            className={`  flex gap-3 w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            <FiLogOut />
            Logout
          </div>

          {/* </button> */}
        </MenuItem>
      </Menu>
    </div>
  );
}
