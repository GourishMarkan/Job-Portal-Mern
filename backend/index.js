import cloudinary from "cloudinary";
import app from "./app.js";
console.log(process.env.PORT);
const port = process.env.PORT || 3000;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.listen(port, () => {
  console.log("Server is running on port ", port);
});
