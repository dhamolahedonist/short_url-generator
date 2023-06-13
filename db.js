"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI;
// connect to mongodb
function connectDB() {
  if (typeof MONGODB_URI === "string") {
    // Connect to MongoDB using Mongoose
    mongoose_1.default
      .connect(MONGODB_URI)
      .then(() => {
        console.log("Connected to MongoDB successfully");
        // Rest of your code
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
      });
  } else {
    console.error("Invalid MongoDB URI");
  }
}
exports.default = connectDB;
