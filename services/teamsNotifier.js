const axios = require("axios");
const { buildTeamsMessage } = require("../utils/eventTemplates");

async function sendToTeams(payload, webhookUrl) {
  const message = buildTeamsMessage(payload);
  if (!message) return;
  await axios.post(webhookUrl, message);
}

module.exports = { sendToTeams };
