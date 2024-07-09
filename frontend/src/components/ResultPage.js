import "./resultPage.css";
import { useEffect, useRef } from "react";

function ResultPage({ quizResultObj }) {
  // ---- emoji display based on accuracy (percentage) -----
  let emoji;
  if (quizResultObj.accuracy === 100) emoji = "🏆";
  if (quizResultObj.accuracy >= 80 && quizResultObj.accuracy < 100)
    emoji = "🎉";
  if (quizResultObj.accuracy >= 50 && quizResultObj.accuracy < 80) emoji = "😊";
  if (quizResultObj.accuracy >= 0 && quizResultObj.accuracy < 50) emoji = "🤔";
  if (quizResultObj.accuracy === 0) emoji = "🤦‍♂️";

  const easyAnswersRef = useRef(null);
  const mediumAnswersRef = useRef(null);
  const hardAnswersRef = useRef(null);
  const parameter1 = useRef(null);
  const parameter2 = useRef(null);
  const parameter3 = useRef(null);

  useEffect(() => {
    if (easyAnswersRef.current) {
      const easyPercentage = Math.ceil(
        (quizResultObj.noOfEasyQuestionsAnswered /
          quizResultObj.noOfEasyQuestions) *
          100
      );
      easyAnswersRef.current.style.background = `conic-gradient(aqua 0 ${easyPercentage}%, rgb(243, 236, 236) ${easyPercentage}% 100%)`;
    }

    if (mediumAnswersRef.current) {
      const mediumPercentage = Math.ceil(
        (quizResultObj.noOfMediumQuestionsAnswered /
          quizResultObj.noOfMediumQuestions) *
          100
      );
      mediumAnswersRef.current.style.background = `conic-gradient(deeppink 0 ${mediumPercentage}%, rgb(243, 236, 236) ${mediumPercentage}% 100%)`;
    }

    if (hardAnswersRef.current) {
      const hardPercentage = Math.ceil(
        (quizResultObj.noOfHardQuestionsAnswered /
          quizResultObj.noOfHardQuestions) *
          100
      );
      hardAnswersRef.current.style.background = `conic-gradient(gold 0 ${hardPercentage}%, rgb(243, 236, 236) ${hardPercentage}% 100%)`;
    }

    if (parameter1.current) {
      parameter1.current.style.width = `${quizResultObj.accuracy}%`;
    }

    if (parameter2.current) {
      parameter2.current.style.width = `${quizResultObj.knowledge}%`;
    }

    if (parameter3.current) {
      parameter3.current.style.width = `${quizResultObj.accuracy}%`;
    }
  }, [
    quizResultObj.noOfEasyQuestions,
    quizResultObj.noOfEasyQuestionsAnswered,
    quizResultObj.noOfMediumQuestions,
    quizResultObj.noOfMediumQuestionsAnswered,
    quizResultObj.noOfHardQuestions,
    quizResultObj.noOfHardQuestionsAnswered,
    quizResultObj.accuracy,
    quizResultObj.knowledge,
  ]);

  return (
    <section>
      <div className="result">
        <div className="result_container">
          <span>{emoji}</span>
          <h2>Congratulations,</h2>
          <h3>
            You answered {quizResultObj.quizScore < 10 && "0"}
            {quizResultObj.quizScore} questions correctly out of&nbsp;
            {quizResultObj.totalNoOfQuestions} questions
          </h3>
        </div>

        {/* Result Conatiner */}

        <div className="result_analysis">
          <h3>Result Of The Quiz:</h3>
          <div className="result_analysis_container">
            <div className="questionTypeDiv">
              <h3>Easy</h3>
              <div className="questionType" ref={easyAnswersRef}>
                <div className="questionsAnswered">
                  <span>
                    {quizResultObj.noOfEasyQuestionsAnswered} / {""}
                    {quizResultObj.noOfEasyQuestions}
                  </span>
                </div>
              </div>
            </div>
            <div className="questionTypeDiv">
              <h3>Medium</h3>
              <div className="questionType" ref={mediumAnswersRef}>
                <div className="questionsAnswered">
                  <span>
                    {quizResultObj.noOfMediumQuestionsAnswered} / {""}
                    {quizResultObj.noOfMediumQuestions}
                  </span>
                </div>
              </div>
            </div>
            <div className="questionTypeDiv">
              <h3>Hard</h3>
              <div className="questionType" ref={hardAnswersRef}>
                <div className="questionsAnswered">
                  <span>
                    {quizResultObj.noOfHardQuestionsAnswered} / {""}
                    {quizResultObj.noOfHardQuestions}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Analysis Container */}

        <div className="overallAnalysis">
          <h3>Overall Quiz Analysis:</h3>
          <div className="analysisParameter">
            <h3>Accuracy (Percentage)</h3>
            <div className="outer">
              <div className="inner" ref={parameter1}>
                {Math.ceil(quizResultObj.accuracy)}%
              </div>
            </div>
          </div>
          <div className="analysisParameter">
            <h3>Knowledge (on Topic)</h3>
            <div className="outer">
              <div className="inner" ref={parameter2}>
                {quizResultObj.knowledge}%
              </div>
            </div>
          </div>
          <div className="analysisParameter">
            <h3>Comprehension (Understandability)</h3>
            <div className="outer">
              <div className="inner" ref={parameter3}>
                {quizResultObj.accuracy}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResultPage;
