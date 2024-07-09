import User from "../models/userSchema.js";
import Question from "../models/questionSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { delete_file, upload_file } from "../utils/cloudinary.js";

// register: api/signUp
const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Please enter all the fields" });
  }

  try {
    const isEmailExists = await User.findOne({ email });

    if (isEmailExists) {
      return res.status(400).json({ error: "Email Already Exists" });
    }

    const user = await User.create({ fullName, email, password });

    res.status(201).json({ message: "Registration Successful, Please Login" });
  } catch (err) {
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      return res.status(400).json({ error: message[0] });
    }
    res.status(500).json({ error: err.message });
  }
};

// login: /api/signIn
const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please Enter all fields" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ error: "No EmailId Was Found" });
    }

    // comparing password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid Password" });
    }

    // generating token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_TIME,
      }
    );

    // options object for cookie
    const options = {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
    };

    res.status(200).cookie("token", token, options).json({
      fullName: user.fullName,
      role: user.role,
      isAuthenticated: true,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// signOut: /api/signOut
const signOut = async (req, res) => {
  res.cookie("token", null, { httpOnly: true, expires: new Date(Date.now()) });
  res.status(200).json({ message: "SignedOut Successfully" });
};

// getUser: /api/getUser
const getUser = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "No user detials exists" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// updatepassword: /api/updatePassword
const updatePassword = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id).select("+password");
    const isPasswordMatch = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ error: "Please enter oldPassword correctly.." });
    }

    user.password = req.body.password;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      return res.status(400).json({ error: message[0] });
    }
    res.status(500).json({ error: err.message });
  }
};

// updateProfile: /api/updateProfile
const updateProfile = async (req, res) => {
  // generating public_id, url related to profilePic using cloudinary
  let profilePhotoResponse = {};

  if (typeof req.body.profilePhoto === "string") {
    profilePhotoResponse = await upload_file(
      req.body.profilePhoto,
      "QuizApp/profilePhotos"
    );
  } else {
    profilePhotoResponse = req.body.profilePhoto;
  }

  const detailsToBeUpdated = {
    fullName: req.body.fullName,
    email: req.body.email,
    profilePhoto: profilePhotoResponse,
  };

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      detailsToBeUpdated,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "No User Found To Update Details" });
    }

    // res.status(200).json({ user: updatedUser });
    res.status(200).json({ message: "Profile Updated Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// attempted quiz insertion into db: /api/quiz
const quiz = async (req, res) => {
  const { _id } = req.user;
  const quizobj = {
    noOfEasyQuestions: req.body.noOfEasyQuestions,
    noOfMediumQuestions: req.body.noOfMediumQuestions,
    noOfHardQuestions: req.body.noOfHardQuestions,
    noOfEasyQuestionsAnswered: req.body.noOfEasyQuestionsAnswered,
    noOfMediumQuestionsAnswered: req.body.noOfMediumQuestionsAnswered,
    noOfHardQuestionsAnswered: req.body.noOfHardQuestionsAnswered,
    accuracy: req.body.accuracy,
    knowledge: req.body.knowledge,
    comprehension: req.body.comprehension,
    quizAttemptedDate: req.body.quizAttemptedDate,
    totalNoOfQuestions: req.body.totalNoOfQuestions,
    quizScore: req.body.quizScore,
    quizCategory: req.body.quizCategory,
  };

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "No User Found" });
    }

    user.quizzessAttempted = [...user.quizzessAttempted, quizobj];
    await user.save();

    res.status(200).json({ message: "Quiz Saved to DB successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all quizzess for pagination: /api/getAllQuizzess
const getAllQuizzess = async (req, res) => {
  const { _id } = req.user;
  const { page } = req.query;
  const resultsPerPage = 4;
  const currentPage = page || 1;
  const skipResults = (currentPage - 1) * resultsPerPage;

  try {
    // Query to get total count of quizzes attempted by the user
    const totalQuizzesCount = await User.findOne({ _id }).select(
      "quizzessAttempted"
    );

    if (!totalQuizzesCount) {
      return res.status(404).json({ error: "User not found" });
    }

    const quizzessCount = totalQuizzesCount.quizzessAttempted.length;

    // Query to get paginated quizzes attempted by the user
    const quizResultsForPagination = await User.findOne({ _id })
      .select("quizzessAttempted")
      .slice("quizzessAttempted", [skipResults, resultsPerPage]);

    if (!quizResultsForPagination) {
      return res.status(404).json({ error: "No quizzes found for this page" });
    }

    // Send response with paginated results and total count
    res.status(200).json({
      resultsPerPage,
      quizzessCount,
      quizResultsForPagination: quizResultsForPagination.quizzessAttempted,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------------- admin related controller methods --------------------------

// getAllusers: /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    if (allUsers.length === 0) {
      return res.status(200).json({ error: "No Users" });
    }

    res.status(200).json({ users: allUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// getUserById: /api/admin/users/:id
const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Please provide valid userId" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "No user found with the Id" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// deleteUser: /api/admin/users/:id
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "No User found with the Id" });
    }

    // remove profilePhoto in Cloudinary
    // if (user?.profilePhoto?.url) {
    //   await delete_file(user?.profilePhoto?.public_id);
    // }

    await user.deleteOne();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------- dashboard stuff controller functions --------------------------

// user dashboard data calculation

// url: /api/getUserStats
const getUserStats = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "No User was found" });
    }

    // calculating quizzessAttempted
    const quizzessCount = user.quizzessAttempted.length;

    // calculating highest score of all quizzess attempted
    const allScoresArr = user.quizzessAttempted
      .map((quiz) => quiz.quizScore)
      .sort((a, b) => b - a);
    const highestScore = allScoresArr[0];

    // calculating average accuracy
    const totalAccuracy = user.quizzessAttempted.reduce(
      (acc, quiz) => acc + quiz.accuracy,
      0
    );
    const avgAccuracy = Math.ceil(totalAccuracy / quizzessCount);

    // Aggregation pipeline to calculate average accuracy and rank users
    const results = await User.aggregate([
      {
        $project: {
          averageAccuracy: { $avg: "$quizzessAttempted.accuracy" },
        },
      },
      {
        $sort: { averageAccuracy: -1 }, // Sort by average accuracy in descending order
      },
      {
        $group: {
          _id: null,
          users: { $push: "$$ROOT" },
        },
      },
      {
        $unwind: {
          path: "$users",
          includeArrayIndex: "rank",
        },
      },
      {
        $project: {
          _id: "$users._id",
          averageAccuracy: "$users.averageAccuracy",
          rank: { $add: ["$rank", 1] }, // Rank starts from 1
        },
      },
    ]);

    const rank = results.find((user) => user._id.toString() === _id).rank;

    res.status(200).json({
      quizzessCount,
      highestScore: quizzessCount === 0 ? 0 : highestScore,
      rank,
      avgAccuracy: quizzessCount === 0 ? 0 : avgAccuracy,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// /api/getUserPerformanceStats
const getUserPerformanceStats = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Calculate averages for accuracy, comprehension, and knowledge
    const quizzessAttempted = user.quizzessAttempted;

    const totalQuizzes = quizzessAttempted.length;
    const totalAccuracy = quizzessAttempted.reduce(
      (sum, quiz) => sum + quiz.accuracy,
      0
    );
    const totalComprehension = quizzessAttempted.reduce(
      (sum, quiz) => sum + quiz.comprehension,
      0
    );
    const totalKnowledge = quizzessAttempted.reduce(
      (sum, quiz) => sum + quiz.knowledge,
      0
    );

    const averageAccuracy = totalQuizzes
      ? Math.ceil(totalAccuracy / totalQuizzes)
      : 0;
    const averageComprehension = totalQuizzes
      ? Math.ceil(totalComprehension / totalQuizzes)
      : 0;
    const averageKnowledge = totalQuizzes
      ? Math.ceil(totalKnowledge / totalQuizzes)
      : 0;

    const result = {
      totalQuizzes,
      labels: ["Accuracy", "Knowledge", "Comprehension"],
      data: [averageAccuracy, averageComprehension, averageKnowledge],
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------ admin related Stats controllers -----------------

// /api/admin/getAllAdminStats
const getAllAdminStats = async (req, res) => {
  try {
    const users = await User.find();

    // total users
    const totalUsers = users.length > 0 ? users.length : 0;

    // all topics
    const quizzess = await Question.find();
    const quizTopics = quizzess.map((quiz) => quiz.topic);
    const totalTopics = quizTopics.length > 0 ? quizTopics.length : 0;

    // total questions
    const allTopicsQuestions = quizzess.map((quiz) => quiz.questions.length);
    const totalQuestions =
      allTopicsQuestions.length > 0
        ? allTopicsQuestions.reduce((acc, val) => acc + val, 0)
        : 0;

    // ------------ graph stats -----------
    const year = new Date().getFullYear();

    // Array of all months in a year
    const monthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const results = await User.aggregate([
      // Match documents where at least one quiz was attempted in the specified year
      {
        $match: {
          "quizzessAttempted.quizAttemptedDate": {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year + 1}-01-01`),
          },
        },
      },
      // Unwind the quizzessAttempted array to de-normalize
      { $unwind: "$quizzessAttempted" },
      // Match again to filter quizzes by the specified year
      {
        $match: {
          "quizzessAttempted.quizAttemptedDate": {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year + 1}-01-01`),
          },
        },
      },
      // Project to extract month name from quizAttemptedDate and format as name
      {
        $project: {
          monthName: {
            $dateToString: {
              format: "%B",
              date: "$quizzessAttempted.quizAttemptedDate",
            },
          },
        },
      },
      // Group by month name and count occurrences
      {
        $group: {
          _id: "$monthName",
          count: { $sum: 1 },
        },
      },
      // Project to reshape the output to match desired structure with 'quizzesInEachMonth'
      {
        $project: {
          _id: 0,
          quizzesInEachMonth: {
            $map: {
              input: monthsOfYear,
              as: "month",
              in: {
                monthName: "$$month",
                count: {
                  $cond: {
                    if: { $eq: ["$$month", "$_id"] },
                    then: "$count",
                    else: 0,
                  },
                },
              },
            },
          },
        },
      },
    ]);

    res.status(200).json({
      adminStats: { totalUsers, totalTopics, totalQuestions },
      graphStats: results[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
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
};
