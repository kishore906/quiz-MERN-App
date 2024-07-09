import express from "express";
import {
  signUp,
  signIn,
  signOut,
  getUser,
  getAllUsers,
  getUserById,
  updatePassword,
  updateProfile,
  quiz,
  getAllQuizzess,
  deleteUser,
  getUserStats,
  getUserPerformanceStats,
  getAllAdminStats,
} from "../controllers/userController.js";
import { isAuthenticated, isAuthorized } from "../middleware/auth.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/signOut", signOut);

router.get("/getUser", isAuthenticated, getUser);
router.put("/updatePassword", isAuthenticated, updatePassword);
router.put("/updateProfile", isAuthenticated, updateProfile);
router.put("/quiz", isAuthenticated, quiz);
router.get("/getAllQuizzess", isAuthenticated, getAllQuizzess);

// admin
router.get("/admin/users", isAuthenticated, isAuthorized("admin"), getAllUsers);
router.get(
  "/admin/users/:id",
  isAuthenticated,
  isAuthorized("admin"),
  getUserById
);
router.delete(
  "/admin/users/:id",
  isAuthenticated,
  isAuthorized("admin"),
  deleteUser
);

// dahsboard
router.get("/getUserStats", isAuthenticated, getUserStats);
router.get(
  "/getUserPerformanceStats",
  isAuthenticated,
  getUserPerformanceStats
);
router.get(
  "/admin/getAllAdminStats",
  isAuthenticated,
  isAuthorized("admin"),
  getAllAdminStats
);

export default router;
