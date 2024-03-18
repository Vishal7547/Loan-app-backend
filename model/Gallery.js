import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pic: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
