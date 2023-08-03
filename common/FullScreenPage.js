import React, { useCallback, useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";


function FullScreenPage({ children, fullScreen, screen1 }) {
  const [fullScreenCloseCount, setFullScreenCloseCount] = useState(0);
  const [firstTime, setFirstTime] = useState(true);
  // const screen1 = useFullScreenHandle();
  fullScreenCloseCount;


  useEffect(() => {
    fullScreen && screen1.enter();
  }, []);


  useEffect(()=>{
    window.onbeforeunload = function () {
      return "Are you really want to perform the action?";
    };
  })


  const reportChange = useCallback(
    (state, handle) => {
      if (handle === screen1) {
        if (state) {
          setFirstTime(false);
        }
        if (!firstTime && !state) {
          setFullScreenCloseCount((prev) => prev + 1);
        }
        // console.log("Screen 1 went to", state, handle);
      }
    },
    [screen1]
  );

  useEffect(() => {
    if (!firstTime) {
      if (fullScreenCloseCount >= 3) {
        alert(`You are block`);
      } else {
        alert(`You have ${3 - fullScreenCloseCount} chance left`);
      }
    }
  }, [fullScreenCloseCount]);

  useEffect(() => {
    if (screen1?.active) {
      document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey && e.keyCode == 85) {
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === 75) {
        e.preventDefault();
      }
      if (e.metaKey && e.altKey && e.keyCode === 75) {
        e.preventDefault();
      }
      if (e.keyCode === 123) {
        e.preventDefault();
      }
      if (e.metaKey && e.altKey && e.keyCode === 73) {
        e.preventDefault();
      }
    });
  }, [screen1?.active]);

  return (
    <div>
      {/* <button onClick={screen1.enter} className="!bg-white !text-black !px-5 !py-4">First</button> */}
      <FullScreen className="bg-white" handle={screen1} onChange={reportChange}>
        {/* {screen1.active && ( */}
        <div className="">
          {children}
          {/* <button onClick={screen1.exit}>Exit</button> */}
        </div>
        {/* )} */}
      </FullScreen>

      {/* <FullScreen handle={screen2} onChange={reportChange}>
        <div className="full-screenable-node" style={{ background: "green" }}>
          Second
          <button onClick={screen1.enter}>Switch</button>
          <button onClick={screen2.exit}>Exit</button>
        </div>
      </FullScreen> */}
    </div>
  );
}

export default FullScreenPage;
