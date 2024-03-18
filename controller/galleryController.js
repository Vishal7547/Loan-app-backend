import Gallery from "../model/Gallery.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
export const galleryController = async (req, res) => {
  try {
    console.log(req.user._id, "fuasfhasfdahsfdhasf");
    const gallery = await Gallery.find({ user: req.user._id }).populate("user");
    if (!gallery) {
      return res.status(404).send({
        success: false,
        message: "Not Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All Gallery Fetched Successfully",
      gallery,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "internal server error",
      task,
    });
  }
};

export const galleryAddController = async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;
    if (!name || !file) {
      return res.status(404).send({
        success: false,
        message: "please enter all filed",
      });
    }
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    const gallery = await Gallery.create({
      name,
      pic: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      user: req.user._id,
    });

    res.status(201).send({
      success: true,
      message: "Gallery is added",
      gallery,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "internal server error",
      e,
    });
  }
};

export const galleryDeleteController = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);

    if (!gallery) {
      return res.status(404).send({
        success: false,
        message: "Gallery not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Gallery deleted successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
