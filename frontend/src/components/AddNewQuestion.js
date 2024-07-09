import { useState, useEffect } from "react";
import "./addNewQuestion.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddQuizQuestionsMutation } from "../redux/api/adminApi";

function AddNewQuestion() {
  const [formData, setFormData] = useState({
    topic: "",
    questions: [
      {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctAnswer: "",
        level: "",
      },
    ],
  });
  const [addQuizQuestions, { isLoading, isSuccess, error, data }] =
    useAddQuizQuestionsMutation();
  const navigate = useNavigate();

  // reusable function to add complete new Question
  function addItem(key, item) {
    setFormData((prevData) => ({
      ...prevData,
      [key]: [...prevData[key], item],
    }));
  }

  function addQuestion(e) {
    e.preventDefault();
    addItem("questions", {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: "",
      level: "",
    });
  }

  const handleResuableInputChange = (key, index, e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      //const updateItems = [...prevData[key]];
      //updateItems[index][name] = value; // updating object properties

      return {
        ...prevData,
        [key]: prevData[key].map((obj, i) =>
          i === index ? { ...obj, [name]: value } : obj
        ),
      };
    });
  };

  const handleQuestionChange = (e, index) => {
    handleResuableInputChange("questions", index, e);
  };

  function deleteItem(key, index) {
    setFormData((prevData) => ({
      ...prevData,
      [key]: [...prevData[key].filter((_, i) => i !== index)],
    }));
  }

  const deleteQuestion = (e, index) => {
    e.preventDefault();
    deleteItem("questions", index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionsArr = formData.questions.map((question) => {
      return {
        question: question.question,
        options: [
          question.option1,
          question.option2,
          question.option3,
          question.option4,
        ],
        correctAnswer: question.correctAnswer,
        level: question.level,
      };
    });
    const obj = { topic: formData.topic, questions: questionsArr };
    addQuizQuestions(obj);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      toast.success(data?.message);
      navigate("/dashboard/admin/stats");
    }
  }, [error, isSuccess, data?.message, navigate]);

  return (
    <section className="addNewQuestionSection">
      <h3>Create New Topic And Questions</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="topic">Topic:</label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={formData.topic}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              [e.target.name]: e.target.value,
            }))
          }
          required
        />

        {formData?.questions?.map((item, index) => (
          <div className="completeQuestionDiv" key={index}>
            <label htmlFor="question">Question:</label>
            <textarea
              rows="4"
              id="question"
              name="question"
              value={item.question}
              onChange={(e) => handleQuestionChange(e, index)}
              required
            ></textarea>

            <label htmlFor="option1">Option1:</label>
            <input
              type="text"
              id="option1"
              name="option1"
              value={item.option1}
              onChange={(e) => handleQuestionChange(e, index)}
              required
            />

            <label htmlFor="option2">Option2:</label>
            <input
              type="text"
              id="option2"
              name="option2"
              value={item.option2}
              onChange={(e) => handleQuestionChange(e, index)}
              required
            />

            <label htmlFor="option3">Option3:</label>
            <input
              type="text"
              id="option3"
              name="option3"
              value={item.option3}
              onChange={(e) => handleQuestionChange(e, index)}
              required
            />

            <label htmlFor="option4">Option4:</label>
            <input
              type="text"
              id="option4"
              name="option4"
              value={item.option4}
              onChange={(e) => handleQuestionChange(e, index)}
              required
            />

            <label htmlFor="correctAnswer">Correct Answer:</label>
            <input
              type="text"
              id="correctAnswer"
              name="correctAnswer"
              value={item.correctAnswer}
              onChange={(e) => handleQuestionChange(e, index)}
              required
            />

            <label htmlFor="level">Level:</label>
            <select
              id="level"
              name="level"
              value={item.level}
              onChange={(e) => handleQuestionChange(e, index)}
              required
            >
              <option value="">Select Level:</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <button
              className="deleteQuestionBtn"
              onClick={(e) => deleteQuestion(e, index)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        ))}

        <div className="addQuestionBtn">
          <button onClick={addQuestion}>+Add Question</button>
        </div>

        <button className="addBtn" disabled={isLoading}>
          Add
        </button>
      </form>
    </section>
  );
}

export default AddNewQuestion;
