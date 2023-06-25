import mongoose, { Schema, Document } from "mongoose";
import shortid from "shortid";

interface IShortUrl extends Document {
  full: string;
  short: string;
  clicks: number;
  user: Schema.Types.ObjectId;
}

const shortUrlSchema = new mongoose.Schema<IShortUrl>({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Replace "User" with the actual model name for the User schema
  },
});

const ShortUrl = mongoose.model<IShortUrl>("ShortUrl", shortUrlSchema);

export default ShortUrl;
