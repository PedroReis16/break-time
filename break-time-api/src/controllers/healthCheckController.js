module.exports = {
  healthCheck: (req, res) => {
    res.status(200).json({
      status: "success",
      message: "It'ssssssssss Timeeeeeeeeeeee",
    });
  },
};
