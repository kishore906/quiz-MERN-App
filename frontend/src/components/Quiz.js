import Timer from "./Timer";
import "./quiz.css";
import { useSelector, useDispatch } from "react-redux";
import { newAnswer } from "../redux/slice/quizSlice";
import NextButton from "./NextButton";

function Quiz({ quizResultObj, quizAttempted }) {
  const { quiz, index, answer } = useSelector((state) => state.quiz);
  const questionObj = quiz.questions.at(index);
  const hasAnswered = answer !== null;
  const dispatch = useDispatch();

  return (
    <section className="quizSection">
      <h1>Quiz</h1>

      <Timer />

      <div className="quizForm">
        <div className="question">
          <h3>{questionObj.question}</h3>
        </div>
        <div className="options">
          {questionObj?.options?.map((option, index) => (
            <button
              className="option"
              key={index}
              disabled={hasAnswered}
              onClick={() => dispatch(newAnswer(index))}
            >
              {option}
            </button>
          ))}
        </div>

        <NextButton
          quizAttempted={quizAttempted}
          quizResultObj={quizResultObj}
        />
      </div>
    </section>
  );
}

export default Quiz;
