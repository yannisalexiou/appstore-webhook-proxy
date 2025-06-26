# App Store Webhook Proxy for Microsoft Teams & Slack

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Node.js](https://img.shields.io/badge/node-%3E%3D18.x-brightgreen)

[![Docker Ready](https://img.shields.io/badge/docker-ready-blue)](https://hub.docker.com/r/yannisalexiou/appstore-webhook-proxy)
[![Render Ready](https://img.shields.io/badge/Render-Ready-8A06FF?style=flat&logo=render&logoSize=auto)](https://render.com/deploy)
[![Unraid Ready](https://img.shields.io/badge/Unraid-Ready-f15a2c?style=flat&logo=unraid&logoSize=auto)](https://forums.unraid.net/topic/191280-support-yannisalexiou-app-store-webhook-proxy/)

![Slack Integration](https://img.shields.io/badge/slack-supported-4A154B?logo=slack&logoColor=white)
![MS Teams Integration](https://img.shields.io/badge/teams-supported-6264A7?logo=microsoft-teams&logoColor=white)

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-%E2%98%95-blue)](https://coff.ee/alexiou)

This project provides a simple, secure Node.js proxy to forward webhook events from **App Store Connect** to **Microsoft Teams** and/or **Slack**, including signature verification and platform-specific formatting.
---

## 🚀 Features

- ✅ Verifies App Store webhook signatures using HMAC SHA-256
- ✅ Forwards formatted messages to Microsoft Teams and Slack
- ✅ Custom message templates per platform
- ✅ Supports custom timezones for event timestamps
- ✅ Error handling and logging
- ✅ Dockerized and ready for deployment (e.g. Render, Railway)
- ✅ One-click deployable to Render

---

## 📋 Prerequisites
1. App Store Connect access with one of the following roles: **Account Holder**, **Admin**, or **App Manager** to create a webhook.
2. A configured workspace in either: Microsoft Teams and/or Slack

---

## 📦 Installation Guides
End-to-end simple installation guides, from installing the proxy to get the test message to MS Teams / Slack

### 💬 Microsoft Teams
![MS Teams Notification Screenshot](documentation/assets/TeamsAppStoreUpdateResponse.png)

**📘 Step-by-step setup guide**: [Integrate App Store Webhooks with Microsoft Teams (Medium)](https://medium.com/p/af3c8c840c15)

### 💬 Slack
![Slack Notification Screenshot](documentation/assets/SlackAppStoreUpdateResponse.png)

**📘 Step-by-step setup guide**: [Integrate App Store Webhooks with Slack (Medium)](https://medium.com/p/4785b8306c81)

---

## ✅ Supported Webhook Events
- `appStoreVersionAppVersionStateUpdated`
- `webhookPingCreated`

Unknown events will still be delivered in raw JSON.

---

## 🔧 Proxy Setup Options
Here you can find all the available options to run the proxy.

⚠️ To make the proxy work, it must be accessible from the internet. In my Unraid setup, I use an NGINX reverse proxy. If you're not familiar with this, it's easier to use the [1. One-Click Render Deployment](#3-one-click-render-deployment) option, which provides a public domain automatically.

**The incoming webhook should be sent to the path: `/appstore-webhook`.**

### 1. One-Click Render Deployment
Click below to deploy instantly to Render:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

Make sure to set the environment variables during setup [(Read the Environment Variables table below)](#%EF%B8%8F-environment-variables).
> Render automatically sets `NODE_ENV=production`

### 2. Unraid Setup
To install via Unraid:

1. Open the **Apps** tab in your Unraid dashboard.
2. Search for:  
   **`AppStore-Webhook-Proxy`**
3. Click **Install** and configure the required environment variables.

### 3. Docker Setup
Build and run using Docker:

```bash
docker build -t appstore-webhook-proxy .
docker run -p 3000:3000 --env-file .env appstore-webhook-proxy
```

### 4. Manual Setup (Node.js)
If you'd like to run the app directly with Node.js:

```bash
git clone https://github.com/yourusername/appstore-webhook-proxy.git
cd appstore-webhook-proxy
npm install
```

💬 **Need help or want to leave feedback?**  
Join the support thread in the [Unraid Community Forum](https://forums.unraid.net/topic/191280-support-yannisalexiou-app-store-webhook-proxy/).

🎥 **Watch the setup walkthrough:**  
[![Watch the video](https://img.youtube.com/vi/g_EBC1CdblE/0.jpg)](https://www.youtube.com/watch?v=g_EBC1CdblE)


---

## ⚙️ Environment Variables

Create a `.env` file (or set variables directly in your cloud environment):

| Variable            | Explanation                                                                                                                                                                                                 | Default Value |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `SHARED_SECRET`     | **Required.** Secret used to verify incoming App Store Webhook requests. You define it when creating the webhook in App Store Connect, then set the same value here.<br>Set it here: [App Store Webhooks Setup](https://appstoreconnect.apple.com/access/integrations/webhooks) | *(empty)*     |
| `TEAMS_WEBHOOK_URL` | **Required if integrating with Microsoft Teams.** Webhook URL for sending notifications to Microsoft Teams. Leave empty if not used.<br>Example: `https://your-teams.webhook.url`<br>Create it here: [Microsoft Teams Incoming Webhook Guide](https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook?tabs=newteams%2Cdotnet) | *(empty)*     |
| `SLACK_WEBHOOK_URL` | **Required if integrating with Slack.** Webhook URL for sending notifications to Slack. Leave empty if not used.<br>Example: `https://hooks.slack.com/services/XXX/YYY/ZZZ`<br>Create it here: [Slack Webhook Guide](https://api.slack.com/messaging/webhooks) | *(empty)*     |
| `APP_STORE_URL`     | *(Optional)* Public URL of your app on the App Store. Included in notifications to make it easier to access the app’s page.<br>Example: `https://apps.apple.com/app/id123456789` | *(empty)*     |
| `TIMEZONE`          | *(Optional)* Timezone used to format timestamps in messages. Use a valid [IANA timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), e.g. `Europe/Athens`. | `UTC`         |




You can also copy from the example:
```bash
cp .env.example .env
```

---

## 🧪 Running Locally

```bash
npm start
```
Then send a webhook POST to:
```
http://localhost:3000/appstore-webhook
```

---

## 🔐 Usefull App Store Connect info:
- When setting up the webhook in App Store Connect, Apple will ask for a **secret**. Use a string of your choice and set it in `SHARED_SECRET`.
- Official docs:
  - [Apple Webhook Notification Overview]()https://developer.apple.com/documentation/AppStoreConnectAPI/webhook-notifications
  - [Configuring Webhook Notifications](https://developer.apple.com/documentation/appstoreconnectapi/configuring-webhook-notifications)
  - [Webhook Permissions Guide](https://developer.apple.com/help/app-store-connect/manage-your-team/manage-webhooks)


---

## 📂 Project Structure

```
.
├── app.js                 # Entry point
├── routes/
│   └── webhook.js         # Webhook handler
├── utils/
│   ├── eventTemplates.js  # Teams formatter
│   ├── slackTemplates.js  # Slack formatter
│   └── stateDescriptions.js
├── services/
│   ├── signatureVerifier.js
│   ├── teamsNotifier.js
│   └── slackNotifier.js
├── middleware/
│   ├── errorHandler.js
│   └── logging.js
├── Dockerfile
├── render.yaml            # Render deploy spec
├── .env.example
├── .dockerignore
├── .gitignore
└── README.md
```

---

## 💡 Contributing

PRs and feedback welcome! You can help with:
- More supported event types
- Custom Slack/Teams formatting
- Delivery logs and retry support

---

## 📝 License
MIT
