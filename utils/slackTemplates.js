const {
  getAppStoreStatusLabel,
  getStatusEmoji,
} = require("./stateDescriptions");

const { DateTime } = require("luxon");

function formatTimestamp(iso) {
  const timezone = process.env.TIMEZONE || "UTC";
  const date = DateTime.fromISO(iso, { zone: "utc" }).setZone(timezone);
  return date.toFormat("ccc, dd LLL yyyy HH:mm:ss ZZZZ");
}

function buildSlackMessage(payload) {
  const type = payload.data?.type || "unknown";
  const rawTimestamp =
    payload.data?.attributes?.timestamp || new Date().toISOString();
  const timestamp = formatTimestamp(rawTimestamp);

  const APP_STORE_URL = process.env.APP_STORE_URL || null;

  const events = {
    appStoreVersionAppVersionStateUpdated: () => {
      const newValue = payload.data.attributes.newValue;
      const oldValue = payload.data.attributes.oldValue;
      const versionId = payload?.data?.relationships?.instance?.data?.id;

      let blocks = [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🚀 App Version Status Updated",
            emoji: true,
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*${getStatusEmoji(newValue)} Current Status:*\n${getAppStoreStatusLabel(newValue)}`,
            },
            {
              type: "mrkdwn",
              text: `*Previous Status:*\n${getAppStoreStatusLabel(oldValue)}`,
            },
            {
              type: "mrkdwn",
              text: `*Timestamp:*\n${timestamp}`,
            },
            {
              type: "mrkdwn",
              text: `*Version ID:*\n${versionId}`,
            },
          ],
        },
      ];

      if (APP_STORE_URL) {
        blocks.push({
          type: "section",
          text: {
            type: "mrkdwn",
            text: `<${APP_STORE_URL}|🔗 View on App Store>`,
          },
        });
      }

      return { blocks };
    },

    webhookPingCreated: () => ({
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🔄 Webhook Test Ping",
            emoji: true,
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Ping ID:*\n${payload.data.id}`,
            },
            {
              type: "mrkdwn",
              text: `*Timestamp:*\n${timestamp}`,
            },
          ],
        },
      ],
    }),

    webhookPings: () => null,
  };

  const template = events[type]?.() ?? {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `📬 Unhandled App Store Event: ${type}`,
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "```json\n" + JSON.stringify(payload, null, 2) + "\n```",
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `⏱️ *Timestamp:* ${timestamp}`,
          },
        ],
      },
    ],
  };

  return template;
}

module.exports = { buildSlackMessage };
