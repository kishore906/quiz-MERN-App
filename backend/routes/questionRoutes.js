import express from "express";
import { isAuthenticated, isAuthorized } from "../middleware/auth.js";
import {
  addNewTopicAndQuestions,
  deleteQuestion,
  getQuestionsByTopic,
  updateQuestion,
  getQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

router.post(
  "/admin/addNewTopicAndQuestions",
  isAuthenticated,
  isAuthorized("admin"),
  addNewTopicAndQuestions
);
router.get("/getQuestionsByTopic", isAuthenticated, getQuestionsByTopic);
router.get(
  "/admin/getQuestion",
  isAuthenticated,
  isAuthorized("admin"),
  getQuestion
);
router.put(
  "/admin/updateQuestion",
  isAuthenticated,
  isAuthorized("admin"),
  updateQuestion
);
router.delete(
  "/admin/deleteQuestion",
  isAuthenticated,
  isAuthorized("admin"),
  deleteQuestion
);

export default router;
