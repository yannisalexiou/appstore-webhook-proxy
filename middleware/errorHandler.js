function errorHandler(err, req, res, next) {
  console.error("❌ Unexpected error:", err.stack || err);
  res.status(500).send("Internal Server Error");
}

module.exports = { errorHandler };
