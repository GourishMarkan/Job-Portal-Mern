import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      min: [3, "Too Short Name"],
      max: [20, "Too Long Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      validator: [validator.isEmail, "Please Enter Valid Email"],
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please Enter Your Phone Number"],
      min: [10, "phone number should be of 10 digits"],
      // max: [10, "phone number cannot exceed 10 digits"],
    },
    address: {
      type: String,
      required: [true, "Please Enter Your Address"],
    },
    niches: {
      firstNiche: String,
      secondNiche: String,
      thirdNiche: String,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must contain at least 8 chatacters."],

      select: false,
    },
    resume: {
      public_id: String,
      url: String,
    },
    coverLetter: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["Job Seeker", "Employer"],
    },
    resetPasswordToken: String,

    resetPasswordTokenExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// userSchema.methods.hashPassword = async function (password) {
//   return await bcrypt.hash(password, 10);
// };

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
