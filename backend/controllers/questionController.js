import Question from "../models/questionSchema.js";

// create new topic and quiz questions: /api/admin/addNewTopicAndQuestions
const addNewTopicAndQuestions = async (req, res) => {
  const easyCount = req.body.questions.filter(
    (question) => question.level === "Easy"
  ).length;
  const mediumCount = req.body.questions.filter(
    (question) => question.level === "Medium"
  ).length;
  const hardCount = req.body.questions.filter(
    (question) => question.level === "Hard"
  ).length;

  const newTopicAndQuestions = {
    topic: req.body.topic,
    questions: req.body.questions,
    noOfEasyQuestions: easyCount,
    noOfMediumQuestions: mediumCount,
    noOfHardQuestions: hardCount,
    totalNoOfQuestions: easyCount + mediumCount + hardCount,
  };

  try {
    const newTopicAndQuestionsDoc = await Question.create(newTopicAndQuestions);

    //res.status(200).json({ result: newTopicAndQuestionsDoc });
    res.status(201).json({ message: "Quiz Questions created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// getQuestionsByTopic: /api/getQuestionsByTopic?topic=string
const getQuestionsByTopic = async (req, res) => {
  const topic = req.query.topic;

  try {
    const questionsDoc = await Question.find({ topic });

    if (questionsDoc.length === 0) {
      return res.status(404).json({ error: "No topic was found" });
    }

    res.status(200).json({ topicAndQuestions: questionsDoc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// getQuestion: /admin/getQuestion?topic=string&id=string
const getQuestion = async (req, res) => {
  const { topic, id } = req.query;

  try {
    const questionDoc = await Question.find({ topic });

    if (questionDoc.length === 0) {
      return res.status(404).json({ error: "No topic was found" });
    }

    const question = questionDoc[0].questions.find(
      (question) => question._id.toString() === id.toString()
    );

    if (!question) {
      return res.status(404).json({ error: "No question was found" });
    }

    res.status(200).json({ question });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// updateQuestion: /admin/updateQuestion?topic=string&id=string
const updateQuestion = async (req, res) => {
  const { topic, id } = req.query;

  const updatedQuestion = {
    question: req.body.question,
    options: req.body.options,
    correctAnswer: req.body.correctAnswer,
    level: req.body.level,
  };

  try {
    const questionsDoc = await Question.find({ topic });

    if (questionsDoc.length === 0) {
      return res.status(404).json({ error: "No topic was found" });
    }

    const obj = questionsDoc[0];

    const updatedQuestions = obj.questions.map((question) =>
      question._id.toString() === id.toString() ? updatedQuestion : question
    );

    await Question.updateOne(
      { _id: obj._id },
      { $set: { questions: updatedQuestions } }
    );

    res.status(200).json({ message: "Question updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// deleteQuestion: /admin/deleteQuestion?topic=string&id=string
const deleteQuestion = async (req, res) => {
  const { topic, id } = req.query;

  try {
    const questionsDoc = await Question.find({ topic });

    if (questionsDoc.length === 0) {
      return res.status(404).json({ error: "No topic was found" });
    }

    const obj = questionsDoc[0];

    const updatedQuestions = obj.questions.filter(
      (question) => question._id.toString() !== id.toString()
    );

    await Question.updateOne(
      { _id: obj._id },
      { $set: { questions: updatedQuestions } }
    );

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  addNewTopicAndQuestions,
  getQuestionsByTopic,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
