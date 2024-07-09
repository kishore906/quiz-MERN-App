import StartQuiz from "../components/StartQuiz";
import Quiz from "../components/Quiz";
import ResultPage from "../components/ResultPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useQuizAttemptedMutation } from "../redux/api/userApi";

function Home() {
  const {
    status,
    quiz,
    noOfEasyQuestionsAnswered,
    noOfMediumQuestionsAnswered,
    noOfHardQuestionsAnswered,
    correctAnswers,
  } = useSelector((state) => state.quiz);
  const [quizAttempted, { isSuccess, error, data }] =
    useQuizAttemptedMutation();

  // ---- parameters calculation -----

  // 1. Accuracy (percentage) calculation
  const percentage = (correctAnswers / quiz?.questions?.length) * 100;

  // 2. Knowledge calculation on Topic

  // calculating weighted score - weight = 1 -> for easy question, weight = 2 ->  for medium, weight = 3 -> for hard
  const totalWeightedScoreOfCorrectAnswers =
    noOfEasyQuestionsAnswered +
    noOfMediumQuestionsAnswered * 2 +
    noOfHardQuestionsAnswered * 3;

  // calculationg total possible weighted score
  const totalPossibleWeightedScore =
    quiz?.noOfEasyQuestions +
    quiz?.noOfMediumQuestions * 2 +
    quiz?.noOfHardQuestions * 3;

  // calculating Knowledge score
  let knowledgeScore =
    (totalWeightedScoreOfCorrectAnswers / totalPossibleWeightedScore) * 100;

  // result object
  const quizResultObj = {
    noOfEasyQuestions: quiz?.noOfEasyQuestions,
    noOfMediumQuestions: quiz?.noOfMediumQuestions,
    noOfHardQuestions: quiz?.noOfHardQuestions,
    noOfEasyQuestionsAnswered,
    noOfMediumQuestionsAnswered,
    noOfHardQuestionsAnswered,
    accuracy: Math.ceil(percentage),
    knowledge: Math.ceil(knowledgeScore),
    comprehension: Math.ceil(percentage),
    quizAttemptedDate: new Date().toUTCString(),
    totalNoOfQuestions: quiz?.totalNoOfQuestions,
    quizScore: correctAnswers,
    quizCategory: quiz?.topic,
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      toast.success(data?.message);
    }
  }, [error, isSuccess, data?.message]);

  return (
    <>
      {status === "ready" && <StartQuiz />}
      {status === "active" && (
        <Quiz quizAttempted={quizAttempted} quizResultObj={quizResultObj} />
      )}
      {status === "finished" && <ResultPage quizResultObj={quizResultObj} />}
    </>
  );
}

export default Home;
