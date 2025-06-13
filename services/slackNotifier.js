const axios = require("axios");
const { buildSlackMessage } = require("../utils/slackTemplates");

async function sendToSlack(payload, webhookUrl) {
  const message = buildSlackMessage(payload);
  if (!message) return;

  try {
    await axios.post(webhookUrl, message);
    console.log("✅ Slack message sent successfully.");
  } catch (error) {
    console.error("❌ Failed to send Slack message:", error.response?.data || error.message);
  }
}

module.exports = { sendToSlack };
