import { Box, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { mutate } from "swr";
import CustomModal from "./CustomModal";
import DocUploadInput from "./DocUploadInput";
import LinearWithValueLabel from "./LinearWithValueLabel";

function ImportCSV({
  importApiUrl,
  btnText,
  btnTextClass,
  mutateUrl,
  exampleCsvUrl,
  openCsvModal = false, 
  setOpenCsvModal
}) {

  const [open, setOpen] = useState(false);

  useEffect(()=>{
    setOpen(openCsvModal);
  },[openCsvModal])

  useEffect(() => {
    setOpenCsvModal && setOpenCsvModal(open);
  }, [open]);

  const [docError, setDocError] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const keys =
    Array.isArray(errors) && errors.length > 0 ? Object.keys(errors[0]) : [];

  const onSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    if (file) {
      setDocError(false);
      const formData = new FormData();
      formData.append("csvFile", file);
      try {
        setLoading(true);
        const { data } = await axios.post(importApiUrl, formData, {
          onUploadProgress: async (e) => {
            setUploadProgress(Math.round((100 * e.loaded) / e.total));
          },
        });
        setLoading(false);
        setUploadProgress(0);
        setOpen(false);
        mutate(mutateUrl);
        toast.success(data?.success || "Data imported successfully");
      } catch (err) {
        setErrors(err?.response?.data?.errors);
        toast.error(err?.response?.data?.error || "Something went wrong");
        setLoading(false);
      }
    } else {
      setDocError(true);
    }
  };

  useEffect(() => {
    if (!open) {
      setUploadProgress(0);
      setDocError(false);
      setErrors([]);
    }
  }, [open]);

  return (
    <>
      <Button
        className={`${
          btnTextClass
            ? btnTextClass
            : "!bg-blue-600 hover:!bg-blue-700 px-4 !text-zinc-50"
        }`}
        onClick={() => setOpen(true)}
      >
        {btnText}
      </Button>
      <CustomModal
        label="Import through csv"
        isOpen={open}
        setIsOpen={loading ? () => {} : setOpen}
        showSubmitButton={false}
        maxWidth="lg"
        renderData={
          <>
            <Box
              component="form"
              onSubmit={onSubmit}
              noValidate
              autoComplete="off"
            >
              <DocUploadInput
                label="CSV Data"
                subLabel="only csv"
                acceptType={["csv"]}
                accept=".csv"
                acceptTypeErrMsg="Please upload csv"
                filesize={5120} // in kb
                filesizeErrMsg="CSV size should be less than 5MB"
                error={docError}
                onUpload={(doc) => {
                  if (!doc) {
                    setErrors([]);
                  }
                }}
                //   defaultFileUrl={ImageUrl} //for set default
              />
              {loading && (
                <div className="mt-3">
                  <LinearWithValueLabel value={uploadProgress} />
                </div>
              )}
              <div className="flex justify-between items-center gap-4 mt-4">
                {exampleCsvUrl && (
                  <div>
                    <Link href={exampleCsvUrl}>
                      <a
                        className="text-blue-600 text-sm border border-blue-800 px-2 py-1"
                        download
                      >
                        Download Example CSV
                      </a>
                    </Link>
                  </div>
                )}
                {!loading && (
                  <Button
                    type="submit"
                    className="!bg-blue-600 hover:!bg-blue-700 !px-4 !text-zinc-50"
                  >
                    Upload
                  </Button>
                )}
                {loading && (
                  <Button
                    type="button"
                    className="!bg-blue-600 hover:!bg-blue-700 !px-4 !text-zinc-50 !opacity-60 !flex !gap-2 !items-center"
                  >
                    <CircularProgress size={16} className="!text-zinc-300" />
                    Uploading
                  </Button>
                )}
              </div>
            </Box>
            <div>
              {Array.isArray(errors) && errors.length > 0 && (
                <>
                  <div className="text-xl font-medium text-zinc-300 mb-4 mt-4">
                    We have found some errors in uploaded csv
                  </div>
                  <div className="rounded-md overflow-x-auto overflow-y-hidden border border-zinc-800">
                    <table class="table-auto w-full">
                      <thead className="bg-zinc-800">
                        <tr>
                          {keys.map((i) => (
                            <th className="text-zinc-300 font-medium px-4 py-3 text-left text-sm">
                              {i}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800">
                        {errors.map((item, index) => {
                          const keys = Object.keys(item);
                          return (
                            <tr className="text-xs">
                              {keys.map((i) => (
                                <td className="align-baseline px-4 py-3">
                                  <div className="text-zinc-200">
                                    {
                                      typeof item[i] === "string" ? (
                                        item[i] ? (
                                          item[i]
                                        ) : (
                                          <span className="text-zinc-400">
                                            N/A
                                          </span>
                                        )
                                      ) : null
                                      // <span className="text-zinc-400">N/A</span>
                                    }
                                  </div>
                                  {typeof item[i] === "object" && (
                                    <>
                                      <div className="text-zinc-200">
                                        {item[i]?.value}
                                      </div>

                                      <div className="text-[#F07575] mt-2">
                                        {item[i]?.message}
                                      </div>
                                    </>
                                  )}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/* {errors.map((item, index) => {
                    const keys = Object.keys(item);
                    return (
                      <div className="rounded-md overflow-x-auto overflow-y-hidden border border-zinc-800">
                        <table class="table-auto w-full">
                          <thead className="bg-zinc-800">
                            <tr>
                              {keys.map((i) => (
                                <th className="text-zinc-300 font-medium px-4 py-3 text-left">
                                  {i}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {keys.map((i) => (
                                <td className="align-baseline px-4 py-3">
                                  <div className="text-zinc-200">
                                    {typeof item[i] === "string" ? (
                                      item[i] ? (
                                        item[i]
                                      ) : (
                                        <span className="text-zinc-400">
                                          N/A
                                        </span>
                                      )
                                    ) : (
                                      <span className="text-zinc-400">N/A</span>
                                    )}
                                  </div>
                                  {typeof item[i] === "object" && (
                                    <div className="text-red-500 mt-2">
                                      {item[i]?.message}
                                    </div>
                                  )}
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    );
                  })} */}
                </>
              )}
            </div>
          </>
        }
      />
    </>
  );
}

export default ImportCSV;
