import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      minLength: [8, "Password should be min 8 characters"],
      select: false,
    },
    profilePhoto: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    quizzessAttempted: [
      {
        noOfEasyQuestions: { type: Number },
        noOfMediumQuestions: { type: Number },
        noOfHardQuestions: { type: Number },
        noOfEasyQuestionsAnswered: { type: Number },
        noOfMediumQuestionsAnswered: { type: Number },
        noOfHardQuestionsAnswered: { type: Number },
        accuracy: { type: Number },
        knowledge: { type: Number },
        comprehension: { type: Number },
        quizAttemptedDate: { type: Date },
        overAllQuizpercentage: { type: Number },
        totalNoOfQuestions: { type: Number },
        quizScore: { type: Number },
        quizCategory: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// middleware to handle password hashing before saving the password to db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // hashing the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
