const db = require("../models");
const Ebook = db.ebooks;
const s3 = require("../config/s3.config");
const s3Upload = (file, title) => {
  const pdfURL = s3
    .upload({
      Bucket: "s3bucket",
      Key: `${Math.random() * 100}${title}.pdf`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    })
    .promise();
  return pdfURL;
};

// Create and Save a new Ebook
exports.create = async (req, res) => {
  try {
    const pdfURL = await s3Upload(req.file, req.body.title);
    const ebook = new Ebook({
      title: req.body.title,
      linkPdf: `https://x6t2.c10.e2-2.dev/s3bucket/${pdfURL.Key}`,
      status: "public",
    });
    const data = await ebook.save();
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Ebook.",
    });
  }
};

// Retrieve all Ebook from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Ebook.find({ status: "public" }).sort({ createdAt: -1 });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving ebook.",
    });
  }
};

// Find a single Ebook with an id
exports.findOne = async (req, res) => {
  try {
    const data = await Ebook.findById(req.params.id);
    if (!data) {
      return res.status(404).send({ message: "Ebook not found" });
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Error retrieving Ebook with id=" + req.params.id,
    });
  }
};

//patch a single Ebook with an id
exports.patch = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const ebook = await Ebook.findOneAndUpdate(
      { _id: id },
      {
        status: status,
      },
      { new: true }
    );
    if (!ebook) {
      return res.status(404).send({ message: "Ebook not found" });
    }
    res.status(200).send({ message: "Ebook updated successfully" });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Error retrieving Ebook with id=" + req.params.id,
    });
  }
};

// delete a single Ebook with an id
exports.delete = async (req, res) => {
  try {
    const data = await Ebook.findByIdAndRemove(req.params.id);
    if (!data) {
      return res.status(404).send({ message: "Ebook not found" });
    }
    res.status(200).send({ message: "Ebook deleted successfully" });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Error retrieving Ebook with id=" + req.params.id,
    });
  }
};

// find all ebook by admin
exports.findAllByAdmin = async (req, res) => {
  try {
    const data = await Ebook.find({}).sort({ createdAt: -1 });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving ebook.",
    });
  }
};
