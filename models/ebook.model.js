module.exports = (mongoose) => {
  const ebookSchema = mongoose.Schema(
    {
      title: String,
      linkPdf: String,
      status: {
        type: String,
        enum: ["public", "private"],
      },
    },
    { timestamps: true }
  );

  const Ebook = mongoose.model("ebook", ebookSchema);
  return Ebook;
};
