import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    topic: { type: String },
    noOfEasyQuestions: { type: Number },
    noOfMediumQuestions: { type: Number },
    noOfHardQuestions: { type: Number },
    totalNoOfQuestions: { type: Number },
    questions: [
      {
        question: { type: String },
        options: [],
        correctAnswer: { type: Number },
        level: { type: String, enum: ["Easy", "Medium", "Hard"] },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
