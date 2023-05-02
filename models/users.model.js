module.exports = (mongoose) => {
  const userSchema = new mongoose.Schema(
    {
      username: String,
      role: String,
      password: String,
    },
    { timestamps: true }
  );
  return mongoose.model("User", userSchema);
};
