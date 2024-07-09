import "./viewQuestion.css";
import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetQuestionQuery } from "../redux/api/adminApi";

function ViewQuestion() {
  const [searchParams] = useSearchParams();

  const topic = searchParams.get("topic");
  const id = searchParams.get("id");

  const params = { topic, id };
  const { error, data } = useGetQuestionQuery(params);

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }
  }, [error]);

  return (
    <section className="viewQuestionContainer">
      <div className="questionDiv">
        <h4>
          <b>Question:</b>
        </h4>
        <div className="question">
          <p>{data?.question?.question}</p>
        </div>
      </div>
      <div className="optionsDiv">
        <h4>
          <b>Options:</b>
        </h4>
        {data?.question?.options.map((option, index) => (
          <div className="option" key={index}>
            {option}
          </div>
        ))}
      </div>

      <Link to={`/dashboard/editQuestion?topic=${topic}&id=${id}`}>
        <button className="editBtn">Edit</button>
      </Link>
    </section>
  );
}

export default ViewQuestion;
