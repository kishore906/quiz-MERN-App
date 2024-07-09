import "./timer.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tick } from "../redux/slice/quizSlice";

function Timer() {
  const { secondsRemaining } = useSelector((state) => state.quiz);
  const mins = Math.floor(secondsRemaining / 60); // total minutes calculation
  const seconds = secondsRemaining % 60; // calculating no of seconds remaining (per 60 seconds)
  const dispatch = useDispatch();

  useEffect(() => {
    const id = setInterval(function () {
      dispatch(tick());
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [dispatch]);

  return (
    <h4 className="timer">
      {mins < 10 && "0"}
      {mins} : {seconds < 10 && "0"}
      {seconds}
    </h4>
  );
}

export default Timer;
