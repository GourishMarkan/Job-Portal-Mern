import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
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
      required: true,
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
      type: String,
    },
    hiringMultipleCandidates: {
      type: String,
      required: true,
      default: "No",
      enum: ["yes", "No"],
    },
    personalWebSite: {
      title: String,
      url: String,
    },
    jobNiche: {
      type: String,
      required: true,
    },
    newsLettersSent: {
      type: Boolean,
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
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
