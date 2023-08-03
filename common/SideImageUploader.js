import React, { useContext, useEffect, useRef, useState } from "react";
import IconTooltip from "../../components/common/IconTooltip";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../../context/index";
import { Download } from "../../functions/ResourceDownload";
import useSWR, { useSWRConfig } from "swr";
import {
  BsBack,
  BsFillTrashFill,
  BsFront,
  BsInfoCircle,
  BsPaperclip,
  BsTrashFill,
  BsXLg,
} from "react-icons/bs";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineUpload } from "react-icons/hi";

import { MdClose } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CustomModal from "./CustomModal";
import SideDrawer from "./SideDrawer";

function SideImageUploader({
  showSidebar,
  setShowSidebar,
  showUpload = false,
}) {
  const [zipItems, setZipItems] = useState("");
  const [visible, setVisible] = useState(false);
  const [progressZip, setProgressZip] = useState(0);
  const [zipFileName, setZipFileName] = useState("");
  const [uploadingZip, setUploadingZip] = useState(false);
  const [ifError, setIfError] = useState("");
  const [zipData, setZipData] = useState({
    name: "",
    item: {},
    type: "",
  });

  const zipInputNull = useRef();

  const { mutate } = useSWRConfig();
  const {
    state: { user },
  } = useContext(Context);

  const [openModal, setOpenModal] = useState(false);
  const [viewSrc, setViewSrc] = useState(false);
  const [color, setColor] = useState(false);

  const apiUrl = user
    ? user?.role?.includes("student")
      ? null
      : `/api/fetch-file/${user && user._id}`
    : null;

  const { data, error } = useSWR(apiUrl, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  const handleZip = async (e) => {
    try {
      const file = e.target.files[0];
      setZipFileName(file.name);
      const type = file.name.split(".");
      setUploadingZip(true);

      const zipFile = new FormData();
      zipFile.append("file", file);

      // Display the key/value pairs
      // for (var pair of zipFile.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }

      //save progress bar and send video form data to back end
      const uploadFile = zipFile.get("file");

      const { data } = await axios.post(`/api/upload-file`, zipFile, {
        onUploadProgress: async (e) => {
          setProgressZip(Math.round((100 * e.loaded) / e.total));
        },
      });

      // setZipData({ ...zipData, name: type[0], type: type[1], item: data });
      const zipObjectData = {
        ...zipData,
        name: type[0],
        type: type[1],
        item: data,
      };
      zipInputNull.current.value = "";
      await handleSubmit(zipObjectData);
      setUploadingZip(false);
    } catch (err) {
      setUploadingZip(false);
      toast.error("File upload failed");
    }
  };

  const handleZipRemove = async (e) => {
    try {
      setUploadingZip(true);
      const { data } = await axios.post(
        `/api/fetch-file/${user._id}`,
        zipData.item
      );

      setZipData({ ...zipData, name: "", type: "", item: {} });
      setProgressZip(0);
      setUploadingZip(false);
      zipInputNull.current.value = "";
      toast.success("File removed");
    } catch (err) {
      setUploadingZip(false);
      toast.error("File remove failed");
    }
  };

  const handleDeleteZip = async (id, imageKeys) => {
    // console.log(id, imageKeys, "id, imageKeys");
    if (confirm("Are you really want to delete")) {
      try {
        const { data } = await axios.patch(`/api/delete-file/${id}`, {
          ...imageKeys,
        });
        mutate(`/api/fetch-file/${user._id}`);
      } catch (err) {
        toast.error(err?.response?.data || "Something went wrong");
      }
    }
  };

  let handleSubmit = async (zipObjectData) => {
    const { data } = await axios.post(`/api/submit-file/${user?._id}`, {
      ...zipObjectData,
    });
    // setZipData({ ...zipData, name: "", type: "", item: {} });
    mutate(`/api/fetch-file/${user._id}`);
    setIfError("");
    toast.success("File Upload");
  };

  useEffect(() => {
    if (data) {
      setZipItems(data);
    }
  }, [data]);

  const handleView = (url) => {
    // setVisible(false);
    setOpenModal(true);
    setViewSrc(url);
  };

  const handleCopy = (data) => {
    setColor(true);
    if (navigator) navigator.clipboard.writeText(`${data.item.Location}`);
    setTimeout(() => {
      setColor(false);
    }, 500);

    return () => clearTimeout(timer);
  };
  return (
    <>
      <CustomModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        isFullScreen={false}
        zIndex="!z-[100]"
        showSubmitButton={false}
        modalSize={
          viewSrc && viewSrc.substring(viewSrc.lastIndexOf(".") + 1) === "pdf"
            ? "!max-w-7xl"
            : "!w-auto"
        }
        renderData={
          <>
            <div
              className={
                "flex justify-end items-center  pb-4  text-black cursor-pointer"
                // viewSrc &&
                // viewSrc.substring(viewSrc.lastIndexOf(".") + 1) === "pdf"
                //   ? "flex justify-end items-center  pb-4  text-black cursor-pointer"
                //   : "absolute top-4 right-4 text-white  shadow-md"
              }
            >
              {/* <AiFillCloseCircle /> */}
              <span
                className="cursor-pointer text-sm"
                onClick={() => setOpenModal(false)}
              >
                <BsXLg />
              </span>
            </div>
            <div
              className={`relative  overflow-hidden ${
                viewSrc &&
                viewSrc.substring(viewSrc.lastIndexOf(".") + 1) === "pdf"
                  ? " bg-white h-[90vh]"
                  : ""
              }`}
            >
              {viewSrc &&
              viewSrc.substring(viewSrc.lastIndexOf(".") + 1) === "pdf" ? (
                <iframe
                  src={viewSrc}
                  // frameBorder="0"
                  // scrolling="auto"
                  height="100%"
                  width="100%"
                ></iframe>
              ) : (
                <img
                  className="object-contain h-full mx-auto bg-zinc-300"
                  src={viewSrc}
                  alt="Image"
                />
              )}
            </div>
          </>
        }
      />
      <SideDrawer
        anchor="right"
        size="max-w-lg"
        setOpen={setShowSidebar}
        open={showSidebar}
        zIndex={9999}
        renderData={
          <div className=" h-full w-full z-50 overflow-y-auto p-2">
            <div className="flex justify-between items-center mb-4 ">
              <span className="text-xl font-semibold tracking-wide text-zinc-100 p-2 ">
                Upload File
              </span>
              <MdClose
                className="text-2xl cursor-pointer text-zinc-200 hover:text-zinc-100 duration-300 mx-2"
                onClick={() => setShowSidebar(false)}
              />
            </div>
            {/* Add file */}
            {/* <label>Upload File </label> */}
            {/* <p
          style={{
            position: "absolute",
            marginLeft: 312,
            fontSize: 22,
            marginTop: 5,
            color: "red",
          }}
          onClick={() => (zipInputNull.current.value = "")}
        >
          <BsXCircle style={{ display: "inline-block" }} />
        </p> */}
            <div className="p-2">
              {showUpload && (
                <div>
                  <input
                    type="file"
                    required
                    ref={zipInputNull}
                    accept="image/*"
                    onChange={handleZip}
                    className="admin-formControl file:bg-zinc-500 file:text-zinc-100 h-auto text-zinc-200 bg-zinc-900 border-zinc-700"
                  />
                  {!ifError ? null : (
                    <p style={{ color: "red" }} className="text-center mt-4">
                      {ifError}
                    </p>
                  )}
                  {uploadingZip && (
                    <div className="mt-5 flex gap-2 text-zinc-200 justify-center items-center">
                      {/* <p className="text-center"> */}
                      {/* <LoadingOutlined /> */}
                      uploading{" "}
                      <span>
                        <AiOutlineLoading3Quarters className="animate-spin" />
                      </span>
                      {/* {progressZip > 1 && (
                    <Progress
                      className="d-flex justify-content-center pt-2"
                      percent={progressZip}
                      steps={10}
                    />
                  )} */}
                      {/* </p> */}
                    </div>
                  )}
                </div>
              )}

              <div>
                {zipData.name === "" ? null : (
                  <div className="mt-5">
                    <p className="text-center">
                      <BsPaperclip style={{ display: "inline" }} />{" "}
                      {zipFileName}{" "}
                      <BsFillTrashFill
                        style={{
                          cursor: "pointer",
                          display: "inline",
                        }}
                        onClick={handleZipRemove}
                      />
                    </p>
                  </div>
                )}
              </div>
              <div
                className={`border  border-zinc-600 overflow-hidden sm:rounded-lg overflow-x-auto ${
                  showUpload && "mt-6"
                }`}
              >
                <table className="min-w-full divide-y divide-zinc-600 border-zinc-600">
                  <thead className="bg-zinc-600">
                    {/* <th className="px-2 py-3 text-left text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      S.no
                    </th> */}
                    <th className="px-2 py-3 text-left text-xs font-bold text-zinc-200 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-zinc-200 uppercase tracking-wider">
                      Action
                    </th>
                  </thead>
                  <tbody className="overflow-y-auto">
                    {error ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-6 py-4 whitespace-nowrap text-zinc-400"
                        >
                          <p className="text-center"> Error while fetching</p>{" "}
                        </td>
                      </tr>
                    ) : null}
                    {!zipItems ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-4 whitespace-nowrap">
                          <p className="text-center">
                            {" "}
                            {/* <Spin size="large" /> */}
                          </p>{" "}
                        </td>
                      </tr>
                    ) : (
                      <>
                        {zipItems.length === 0 ? (
                          <tr>
                            <td colSpan={3}>
                              <p className="text-center text-zinc-400 mt-6 mb-6">
                                <BsInfoCircle
                                  style={{
                                    display: "inline-block",
                                    fontSize: 18,
                                  }}
                                />{" "}
                                There is no file
                              </p>
                            </td>
                          </tr>
                        ) : (
                          <>
                            {zipItems
                              .slice(0)
                              .reverse()
                              .map((data, index) => (
                                <tr
                                  key={index}
                                  className="border-b border-slate-700 "
                                >
                                  <td className="text-sm text-zinc-200 ">
                                    <div className="flex justify-start items-center gap-x-2 ml-2">
                                      <span style={{ width: "20px" }}>
                                        {index + 1}{" "}
                                      </span>
                                      <p
                                        style={{
                                          width: "300px",
                                          cursor: "pointer",
                                        }}
                                      >
                                        {data.name}.{data.type}
                                      </p>
                                    </div>
                                  </td>
                                  <td className="text-sm text-zinc-200 flex my-4 gap-x-3 items-center justify-center">
                                    <span className="text-xl">
                                      <IconTooltip
                                        tooltipText={color ? "copied" : "copy"}
                                      >
                                        <HiOutlineClipboardCheck
                                          onClick={() => handleCopy(data)}
                                          style={{
                                            display: "inline-block",
                                          }}
                                        />
                                      </IconTooltip>
                                    </span>
                                    <span
                                      className="cursor-pointer  inline-flex text-base text-green-500"
                                      onClick={() =>
                                        data.item &&
                                        handleView(data.item.Location)
                                      }
                                    >
                                      <FaRegEye />
                                    </span>
                                    <span
                                      id="linkDownload"
                                      className="cursor-pointer  inline-flex text-base text-blue-500"
                                      onClick={() =>
                                        data.item &&
                                        Download(
                                          data.name,
                                          data.type,
                                          data.item.Location
                                        )
                                      }
                                    >
                                      <FiDownload />
                                    </span>

                                    <span className="cursor-pointer inline-flex text-base text-red-500">
                                      <BsTrashFill
                                        onClick={() =>
                                          handleDeleteZip(data._id, data.item)
                                        }
                                      />
                                    </span>
                                  </td>
                                </tr>
                              ))}
                          </>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
}

export default SideImageUploader;
