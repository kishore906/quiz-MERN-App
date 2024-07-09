import "./nextButton.css";
import { useSelector, useDispatch } from "react-redux";
import { nextQuestion, finish } from "../redux/slice/quizSlice";

function NextButton({ quizResultObj, quizAttempted }) {
  const { answer, index, quiz } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  if (answer === null) return null;

  if (index < quiz?.questions.length - 1)
    return (
      <button className="nextBtn" onClick={() => dispatch(nextQuestion())}>
        Next
      </button>
    );

  if (index === quiz?.questions?.length - 1)
    return (
      <button
        className="nextBtn"
        onClick={() => {
          dispatch(finish());
          quizAttempted(quizResultObj);
        }}
      >
        Finish
      </button>
    );
}

export default NextButton;
