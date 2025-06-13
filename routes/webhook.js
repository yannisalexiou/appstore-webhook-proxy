const express = require("express");
const router = express.Router();
const { verifySignature } = require("../services/signatureVerifier");
const { sendToTeams } = require("../services/teamsNotifier");
const { sendToSlack } = require("../services/slackNotifier");

router.post("/", async (req, res) => {
  const signature = req.headers["x-apple-notification-signature"];
  const rawBody = JSON.stringify(req.body);

  // 🔒 Verify App Store signature
  if (!verifySignature(signature, rawBody)) {
    return res.status(401).send("Invalid signature");
  }

  const payload = req.body;

  try {
    // 📤 Send to Microsoft Teams (if webhook is configured)
    if (process.env.TEAMS_WEBHOOK_URL) {
      await sendToTeams(payload, process.env.TEAMS_WEBHOOK_URL);
    }

    // 📤 Send to Slack (if webhook is configured)
    if (process.env.SLACK_WEBHOOK_URL) {
      await sendToSlack(payload, process.env.SLACK_WEBHOOK_URL);
    }

    return res.status(200).send("OK");
  } catch (error) {
    console.error("❌ Error handling webhook:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
