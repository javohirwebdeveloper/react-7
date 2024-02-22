import React, { useState, useRef, useEffect } from "react";
import "./App.css"

function Timer() {
  const [seconds, setSeconds] = useState(60);

  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          stopTimer();
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(60);
  };

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  const formatSeconds = (seconds) => {
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    }
    return `0:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const inputRef = useRef(null);

  const changeInitialValue = () => {
    const inputValue = inputRef.current.value;
    if (!isNaN(inputValue)) {
      setSeconds(Number(inputValue));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="text-6xl font-bold text-blue-600"><h1>{seconds >= 0 ? formatSeconds(seconds) : 0}</h1></div>
      <div className="flex mt-4 space-x-4">
        <button
          className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          onClick={startTimer}
        >
          Boshlash
        </button>
        <button
          className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          onClick={stopTimer}
        >
          To'xtatish
        </button>
        <button
          className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
          onClick={resetTimer}
        >
          Qayta ishga tushirish
        </button>
      </div>
      <div className="flex mt-4 space-x-4">
        <input
          className="px-4 py-2 border border-gray-300 rounded-lg"
          type="text"
          placeholder="Sekundomer boshlang'ich qiymati"
          ref={inputRef}
        />
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={changeInitialValue}
        >
          O'zgartirish
        </button>
      </div>
    </div>
  );
}

export default Timer;
