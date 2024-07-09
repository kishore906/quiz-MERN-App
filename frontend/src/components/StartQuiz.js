import "./startQuiz.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { start } from "../redux/slice/quizSlice";
import { useLazyGetQuestionsByTopicQuery } from "../redux/api/adminApi";

function StartQuiz() {
  const { user } = useSelector((state) => state.auth);
  const [topic, setTopic] = useState("");
  const [getQuestionsByTopic, { isLoading, error, isSuccess, data }] =
    useLazyGetQuestionsByTopicQuery();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    getQuestionsByTopic(topic);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      dispatch(start(data.topicAndQuestions[0]));
    }
  }, [error, isSuccess, data, dispatch]);

  return (
    <section className="section">
      <div className="selectTopicContainer">
        <h1 className="welcomeText">Hi👋, Welcome {user?.fullName} !!</h1>

        <form className="selectTopicForm" onSubmit={handleSubmit}>
          <label htmlFor="topic">Select Your Topic For Attempting Quiz:</label>
          <select
            id="topic"
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          >
            <option value="">Select Topic:</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>

          <button className="startBtn" disabled={isLoading}>
            Start
          </button>
        </form>
      </div>
    </section>
  );
}

export default StartQuiz;
