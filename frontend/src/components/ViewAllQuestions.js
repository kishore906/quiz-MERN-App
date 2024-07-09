import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./viewAllQuestions.css";
import Question from "./Question";
import {
  useLazyGetQuestionsByTopicQuery,
  useDeleteQuestionMutation,
} from "../redux/api/adminApi";

function ViewAllQuestions() {
  const [topic, setTopic] = useState("");
  const [getQuestionsBytopic, { isLoading, error, data }] =
    useLazyGetQuestionsByTopicQuery();
  const [deleteQuestion, { error: deletErr, data: deleteMsg }] =
    useDeleteQuestionMutation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    getQuestionsBytopic(topic);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
      return;
    }

    if (deletErr) {
      toast.error(deletErr.data.message);
      return;
    }

    if (deleteMsg) {
      toast.success(deleteMsg.message);
      navigate("/dashboard/admin/stats");
    }
  }, [error, deletErr, deleteMsg, navigate]);

  return (
    <section className="viewQuestionsSection">
      <h3>Select Question Category:</h3>
      <form onSubmit={handleSearch}>
        <select
          id="topic"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          <option value="">Select Category:</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
          <option value="react">React</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <button className="searchBtn" disabled={isLoading}>
          Search
        </button>
      </form>

      {/* All Questions based on selected category */}
      {data && (
        <div className="allQuestionsDiv">
          {data?.topicAndQuestions[0]?.questions.map((question) => (
            <Question
              key={question._id}
              question={question}
              topic={topic}
              deleteQuestion={deleteQuestion}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ViewAllQuestions;
