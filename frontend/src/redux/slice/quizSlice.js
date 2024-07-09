import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quiz: {},
  status: "ready",
  index: 0,
  answer: null,
  correctAnswers: 0,
  noOfEasyQuestionsAnswered: 0,
  noOfMediumQuestionsAnswered: 0,
  noOfHardQuestionsAnswered: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

const quizSlice = createSlice({
  name: "quizSlice",
  initialState,
  reducers: {
    start(state, action) {
      state.quiz = action.payload;
      state.status = "active";
      state.secondsRemaining = state.quiz.questions.length * SECS_PER_QUESTION;
    },

    newAnswer(state, action) {
      const question = state.quiz.questions.at(state.index);

      state.answer = action.payload;
      state.correctAnswers =
        action.payload === question.correctAnswer
          ? state.correctAnswers + 1
          : state.correctAnswers;
      state.noOfEasyQuestionsAnswered =
        action.payload === question.correctAnswer && question.level === "Easy"
          ? state.noOfEasyQuestionsAnswered + 1
          : state.noOfEasyQuestionsAnswered;
      state.noOfMediumQuestionsAnswered =
        action.payload === question.correctAnswer && question.level === "Medium"
          ? state.noOfMediumQuestionsAnswered + 1
          : state.noOfMediumQuestionsAnswered;
      state.noOfHardQuestionsAnswered =
        action.payload === question.correctAnswer && question.level === "Hard"
          ? state.noOfHardQuestionsAnswered + 1
          : state.noOfHardQuestionsAnswered;
    },

    nextQuestion(state, action) {
      state.index = state.index + 1;
      state.answer = null;
    },

    finish(state, action) {
      state.status = "finished";
    },

    tick(state, action) {
      state.secondsRemaining = state.secondsRemaining - 1;
      state.status = state.secondsRemaining === 0 ? "finished" : state.status;
    },

    reset(state, action) {
      state.quiz = {};
      state.status = "ready";
      state.index = 0;
      state.answer = null;
      state.correctAnswers = 0;
      state.noOfEasyQuestionsAnswered = 0;
      state.noOfMediumQuestionsAnswered = 0;
      state.noOfHardQuestionsAnswered = 0;
      state.secondsRemaining = null;
    },
  },
});

export const { start, newAnswer, nextQuestion, finish, tick, reset } =
  quizSlice.actions;

export default quizSlice.reducer;
