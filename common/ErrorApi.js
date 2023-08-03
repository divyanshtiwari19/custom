import React from "react";

function ErrorApi() {
  return (
    <div className="flex flex-col justify-center items-center p-8 h-96">
      <h1 className="text-center text-zinc-200 font-semibold text-3xl mb-2">
        Internal Server Error
      </h1>
      <p className="text-zinc-500 text-center text-sm">
        Sorry for inconvenience, Reqeust you to reload the page, if it is still
        occur then contact to developer.
      </p>
    </div>
  );
}

export default ErrorApi;
