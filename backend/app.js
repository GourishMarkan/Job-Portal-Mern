import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
import { connectDB } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/user.route.js";
import jobRouter from "./routes/job.route.js";
import blogRouter from "./routes/blog.route.js";
import applicationRouter from "./routes/application.route.js";
import fileUpload from "express-fileupload";
import { newsLetterCron } from "./automation/newLetterCron.js";
// import { sendEmail } from "./utils/sendEmail.js";
const app = express();
config({ path: "./config/.env" });
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // sameSite: "strict",
    // httpsOnly: true,
    // secure: process.env.NODE_ENV === "production",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
newsLetterCron();
connectDB();
app.use(errorMiddleware);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/blog", blogRouter);
// app.post("/send-email", async (req, res) => {
//   const { email, subject, message } = req.body;
//   await sendEmail({ email, subject, message });
//   res.status(200).json({ message: "Email sent successfully" });
// });
export default app;
