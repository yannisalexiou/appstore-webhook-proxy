// Load environment variables from .env in development only
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require("express");
const bodyParser = require("body-parser");
const webhookRouter = require("./routes/webhook");
const { logRequests } = require("./middleware/logging");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

// This middleware preserves the raw body string for HMAC verification
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString("utf8");
    },
  })
);

app.use(logRequests);

app.get("/health", (req, res) => res.status(200).send("OK"));

// Attach router with timestamp formatting responsibility delegated inside
app.use("/appstore-webhook", webhookRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(
    `🚀 Webhook proxy running at http://localhost:${port}/appstore-webhook`
  );
});
