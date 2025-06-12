// utils/eventTemplates.js

const {
  getAppStoreStatusLabel,
  getStatusEmoji,
} = require("./stateDescriptions");

const { DateTime } = require("luxon");

function formatTimestamp(iso) {
  const timezone = process.env.TIMEZONE || 'UTC';
  const date = DateTime.fromISO(iso, { zone: 'utc' }).setZone(timezone);
  return date.toFormat("ccc, dd LLL yyyy HH:mm:ss ZZZZ");
}

function buildTeamsMessage(payload) {
  const type = payload.data?.type || "unknown";
  const rawTimestamp =
    payload.data?.attributes?.timestamp || new Date().toISOString();
  const timestamp = formatTimestamp(rawTimestamp);

  const APP_STORE_URL = process.env.APP_STORE_URL || null;

  const events = {
    appStoreVersionAppVersionStateUpdated: () => {
      const newValue = payload.data.attributes.newValue;
      const oldValue = payload.data.attributes.oldValue;

      const facts = [
        {
          name: `${getStatusEmoji(newValue)} Current Status`,
          value: `**${getAppStoreStatusLabel(newValue)}**`,
        },
        {
          name: "Previous Status",
          value: `${getAppStoreStatusLabel(oldValue)}`,
        },
      ];

      if (APP_STORE_URL) {
        facts.push({
          name: "App Store",
          value: `[View on App Store](${APP_STORE_URL})`,
        });
      }

      facts.push(
        { name: "⏱️ Timestamp", value: timestamp },
        {
          name: "Version ID",
          value: payload.data.relationships.instance.data.id,
        }
      );

      return {
        title: "🚀 App Version Status Updated",
        facts,
      };
    },

    webhookPingCreated: () => ({
      title: "🔄 Webhook Test Ping",
      facts: [
        { name: "📨 Ping ID", value: payload.data.id },
        { name: "⏱️ Timestamp", value: timestamp },
      ],
    }),

    webhookPings: () => null,
  };

  const template = events[type]?.() ?? {
    title: `📬 Unhandled App Store Event: \`${type}\``,
    facts: [
      { name: "⏱️ Timestamp", value: timestamp },
      {
        name: "🧾 Raw Payload",
        value: "```json\n" + JSON.stringify(payload, null, 2) + "\n```",
      },
    ],
  };

  if (!template) return null;

  return {
    "@type": "MessageCard",
    "@context": "https://schema.org/extensions",
    themeColor: "0078D7",
    summary: "App Store Webhook",
    sections: [
      {
        activityTitle: template.title,
        activitySubtitle: "App Store Connect via Proxy",
        activityImage:
          "https://developer.apple.com/assets/elements/icons/app-store/app-store-128x128_2x.png",
        facts: template.facts,
        markdown: true,
      },
    ],
  };
}

module.exports = { buildTeamsMessage };
