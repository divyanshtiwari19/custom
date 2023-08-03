import React from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";

function CourseCard({
  image,
  title,
  level,
  semester,
  startOfMonth,
  endOfMonth,
  button = false,
  slug,
  link,
  renderData = null,
  showCode = true,
  viewButton = false,
  viewButtonHandler,
  viewButtonText = "",
  viewButton2 = false,
  viewButtonHandler2,
  viewButtonText2 = "",
  viewButton2Style = " !bg-purple-700 hover:!bg-purple-700",
  buttonText,
  viewButtonStyle = " !bg-orange-700 hover:!bg-orange-700",
  courseCode = "",
}) {
  return (
    <div className="bg-zinc-800 rounded-md">
      <Link href={link}>
        <a>
          <div className="w-full items-center flex flex-col rounded-lg shrink-0 gap-1 aspect-video bg-zinc-800 relative overflow-hidden">
            <ImageWithFallback
              className="rounded-lg object-cover"
              layout="fill"
              alt="profile pic"
              src={image || "/images/course-not-found.png"}
              fallbackSrc="/images/course-not-found.png"
            />
          </div>
        </a>
      </Link>

      <div className="p-3 cursor-pointer">
        <Link href={link}>
          <a>
            <h1 className=" !text-white text-lg font-semibold  line-clamp-2 text-ellipsis overflow-hidden ">
              {title}
            </h1>
            {semester && (
              <h2 className=" text-zinc-200 text-md font-semibold  line-clamp-2 text-ellipsis overflow-hidden ">
                Semester {semester}
              </h2>
            )}
            {startOfMonth && endOfMonth && (
              <h1 className=" text-zinc-200 text-xs font-semibold  line-clamp-2 text-ellipsis overflow-hidden ">
                {startOfMonth}
                {" - "}
                {endOfMonth}
              </h1>
            )}
            {/* <small className=" !text-zinc-500  line-clamp-1 text-ellipsis overflow-hidden">
              {level}
            </small> */}
            <div>{renderData && renderData}</div>
          </a>
        </Link>

        <div className="mt-4 flex flex-wrap gap-2">
          {showCode && button && (
            <Button
              className="!text-xs !bg-blue-700 hover:!bg-blue-700 mb-2"
              size="small"
              variant="contained"
              onClick={() => {
                navigator.clipboard.writeText(courseCode).then(
                  () => {
                    toast.success("Copied Successfully");
                  },
                  () => {
                    /* clipboard write failed */
                  }
                );
              }}
            >
              {buttonText ? buttonText : "Copy Course Code"}
            </Button>
          )}
          {viewButton && (
            <Button
              className={`!text-xs ${viewButtonStyle}`}
              size="small"
              variant="contained"
              onClick={viewButtonHandler}
            >
              {viewButtonText ? viewButtonText : "view"}
            </Button>
          )}
          {viewButton2 && (
            <Button
              className={`!text-xs ${viewButton2Style}`}
              size="small"
              variant="contained"
              onClick={viewButtonHandler2}
            >
              {viewButtonText2 ? viewButtonText2 : "view"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
