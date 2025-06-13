const axios = require("axios");
const { buildTeamsMessage } = require("../utils/eventTemplates");

async function sendToTeams(payload, webhookUrl) {
  const message = buildTeamsMessage(payload);
  if (!message) return;

  try {
    await axios.post(webhookUrl, message);
    console.log("✅ Teams message sent successfully.");
  } catch (error) {
    console.error("❌ Failed to send Teams message:", error.response?.data || error.message);
  }
}

module.exports = { sendToTeams };
