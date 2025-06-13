const express = require("express");
const router = express.Router();
const { verifyAppleSignature } = require("../services/signatureVerifier");
const { sendToTeams } = require("../services/teamsNotifier");
const { sendToSlack } = require("../services/slackNotifier");

const SHARED_SECRET = process.env.SHARED_SECRET;
const TEAMS_WEBHOOK_URL = process.env.TEAMS_WEBHOOK_URL;
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

router.post("/", async (req, res, next) => {
  const rawBody = req.rawBody;
  const signatureHeader = req.headers["x-apple-signature"];

  if (!verifyAppleSignature(rawBody, signatureHeader, SHARED_SECRET)) {
    console.warn("❌ Invalid signature");
    return res.status(401).send("Invalid signature");
  }

  try {
    const payload = JSON.parse(rawBody);

    if (TEAMS_WEBHOOK_URL) {
      await sendToTeams(payload, TEAMS_WEBHOOK_URL);
    }

    if (SLACK_WEBHOOK_URL) {
      await sendToSlack(payload, SLACK_WEBHOOK_URL);
    }

    res.status(200).send("Forwarded to Teams/Slack");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
