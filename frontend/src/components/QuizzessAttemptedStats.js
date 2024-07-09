import "./quizzessAttemptedStats.css";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAllQuizzessQuery } from "../redux/api/userApi";
import CustomPagination from "./CustomPagination";

function QuizzessAttemptedStats() {
  const [params] = useSearchParams();
  const page = Number(params?.get("page")) || 1;

  const { error, data } = useGetAllQuizzessQuery({ page });

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }
  }, [error]);

  return (
    <div className="quizzessAttemptedStatsDiv">
      <h4>Previous Attempted Quizzess:</h4>

      {data?.quizResultsForPagination?.length > 0 ? (
        data?.quizResultsForPagination?.map((quiz, index) => (
          <div className="quizDetailsDiv" key={quiz._id}>
            <div>
              <h4>{quiz?.quizCategory}</h4>
              <p className="attemptedDate">
                Attempted On: {new Date(quiz?.quizAttemptedDate).toDateString()}
              </p>
            </div>
            <div>
              <h4>
                Score:{" "}
                <span className="score">
                  {quiz?.quizScore} / {quiz?.totalNoOfQuestions}
                </span>
              </h4>
            </div>

            <div className="accuracyOuter">
              <div
                className="accuracyInner"
                style={{ width: `${quiz?.accuracy}%` }}
              >
                {quiz?.accuracy}%
              </div>
            </div>
          </div>
        ))
      ) : (
        <h4 className="noQuizzesMsg">No Quizzess Attempted Yet 😉</h4>
      )}

      {data?.quizResultsForPagination?.length > 0 &&
        data?.quizzessCount > data?.resultsPerPage && (
          <CustomPagination
            quizzessCount={data?.quizzessCount}
            resultsPerPage={data?.resultsPerPage}
          />
        )}
    </div>
  );
}

export default QuizzessAttemptedStats;
