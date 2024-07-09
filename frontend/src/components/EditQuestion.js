import "./editQuestion.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  useGetQuestionQuery,
  useUpdateQuestionMutation,
} from "../redux/api/adminApi";

function EditQuestion() {
  const [searchParams] = useSearchParams();

  const topic = searchParams.get("topic");
  const id = searchParams.get("id");

  const params = { topic, id };
  const { isSuccess, error, data } = useGetQuestionQuery(params);

  const [
    updateQuestion,
    { isSuccess: success, error: updateErr, data: updateMsg, isLoading },
  ] = useUpdateQuestionMutation();

  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [level, setLevel] = useState("");

  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedQuestionObj = {
      topic,
      id,
      body: {
        question,
        options: [option1, option2, option3, option4],
        correctAnswer,
        level,
      },
    };
    updateQuestion(updatedQuestionObj);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      setQuestion(data?.question?.question);
      setOption1(data?.question?.options[0]);
      setOption2(data?.question?.options[1]);
      setOption3(data?.question?.options[2]);
      setOption4(data?.question?.options[3]);
      setCorrectAnswer(data?.question?.correctAnswer);
      setLevel(data?.question?.level);
    }

    if (updateErr) {
      toast.error(error.data.message);
    }

    if (success) {
      toast.success(updateMsg?.message);
      navigate("/dashboard/admin/stats");
    }
  }, [
    error,
    isSuccess,
    data?.question?.question,
    data?.question?.options,
    data?.question?.correctAnswer,
    data?.question?.level,
    success,
    updateMsg?.message,
    updateErr,
    navigate,
  ]);

  return (
    <section className="editQuestionContainer">
      <h3>Update Question</h3>

      <form onSubmit={handleUpdate}>
        <div className="field">
          <label htmlFor="question">
            <b>Question:</b>
          </label>
          <textarea
            rows={5}
            id="question"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
        </div>

        <div className="field">
          <label htmlFor="option1">
            <b>Option1:</b>
          </label>
          <input
            type="text"
            id="option1"
            name="option1"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="option2">
            <b>Option2:</b>
          </label>
          <input
            type="text"
            id="option2"
            name="option2"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="option3">
            <b>Option3:</b>
          </label>
          <input
            type="text"
            id="option3"
            name="option3"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="option4">
            <b>Option4:</b>
          </label>
          <input
            type="text"
            id="option4"
            name="option4"
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="correctAnswer">
            <b>CorrectAnswer:</b>
          </label>
          <input
            type="text"
            id="correctAnswer"
            name="correctAnswer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="level">
            <b>Difficulty Level:</b>
          </label>
          <select
            id="level"
            name="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <button className="editBtn" disabled={isLoading}>
          {isLoading ? "Updating" : "Update"}
        </button>
      </form>
    </section>
  );
}

export default EditQuestion;
