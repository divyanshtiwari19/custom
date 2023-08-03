import { useTimer } from "react-timer-hook";

function Timer({ expiryTimestamp, timeExpiredHandler }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      timeExpiredHandler();
    },
  });
  return (
    <p className="mb-0 font-medium text-sm text-red-500">
      {String(minutes).length == 1 ? `0${minutes}` : `${minutes}`}:
      {String(seconds).length == 1 ? `0${seconds}` : `${seconds}`} Left
    </p>
  );
}

export default Timer;
