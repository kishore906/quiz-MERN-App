import { Link } from "react-router-dom";
import "./question.css";

function Question({ question, topic, deleteQuestion }) {
  return (
    <div className="questionContainer">
      <div className="question">
        <p>
          {question?.question?.substring(0, 70)}
          {question?.question?.length > 70 && "..."}
        </p>
      </div>
      <div className="actions">
        <Link to={`/dashboard/question?topic=${topic}&id=${question?._id}`}>
          <button>
            <i className="bi bi-eye"></i>
          </button>
        </Link>

        <Link to={`/dashboard/editQuestion?topic=${topic}&id=${question?._id}`}>
          <button>
            <i className="bi bi-pencil-square"></i>
          </button>
        </Link>

        <button onClick={() => deleteQuestion({ topic, id: question?._id })}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default Question;
