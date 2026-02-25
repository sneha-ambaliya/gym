import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("./.env") });

console.log("CWD ", process.cwd());
console.log("ENV ", {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
});
