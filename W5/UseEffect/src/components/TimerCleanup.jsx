// Timer cleanup

import { useEffect } from "react";

function TimerCleanup() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Timer tick");
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>Check your console for timer ticks!</div>;
}

export default TimerCleanup;
