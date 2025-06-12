const express = require("express");
const { verifyAppleSignature } = require("../services/signatureVerifier");
const { sendToTeams } = require("../services/teamsNotifier");

const router = express.Router();

const SHARED_SECRET = process.env.SHARED_SECRET;
const TEAMS_WEBHOOK_URL = process.env.TEAMS_WEBHOOK_URL;

router.post("/", async (req, res, next) => {
  const rawBody = req.rawBody;
  const signatureHeader = req.headers["x-apple-signature"];

  if (!verifyAppleSignature(rawBody, signatureHeader, SHARED_SECRET)) {
    return res.status(401).send("Invalid signature");
  }

  try {
    const payload = JSON.parse(rawBody);
    await sendToTeams(payload, TEAMS_WEBHOOK_URL);
    res.status(200).send("Forwarded to Teams");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
