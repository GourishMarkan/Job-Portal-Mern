import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  jobType: {
    type: String, //full-time, part-time, contract, internship, temporary
    required: true,
    enum: ["full-time", "part-time"],
  },

  location: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
    // required: true,
  },
  responsibilities: {
    type: String,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  offers: {
    type: String, //salary, benefits, perks
  },
  salary: {
    type: String,
    required: true,
  },
  hiringMultipleCandidates: {
    type: String,
    // required: true,
    default: "No",
    enum: ["Yes", "No"],
  },
  personalWebSite: {
    title: String,
    url: String,
    // type: String,
  },
  jobNiche: {
    type: String,
    required: true,
  },
  newsLettersSent: {
    type: Boolean, //send job to person who subscribed to news letter
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
