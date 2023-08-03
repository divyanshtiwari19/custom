import React from 'react'
import ImageWithFallback from './ImageWithFallback';

function CollegeCard({image,title}) {
  return (
    <div className="bg-zinc-800 rounded-md">
      <div className="w-full items-center flex flex-col rounded-md shrink-0 gap-1 aspect-square bg-zinc-800 relative overflow-hidden">
        <ImageWithFallback
          className="rounded-lg object-contain p-4"
          layout="fill"
          alt="profile pic"
          src={image || "/images/course-not-found.png"}
          fallbackSrc="/images/course-not-found.png"
        />
      </div>
      <div className="p-3 cursor-pointer bg-green-600">
        <h1 className=" !text-white text-lg font-semibold  line-clamp-2 text-ellipsis overflow-hidden ">
          {title}
        </h1>
      </div>
    </div>
  );
}

export default CollegeCard