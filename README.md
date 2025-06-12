# App Store Webhook Proxy for Microsoft Teams

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Node.js](https://img.shields.io/badge/node-%3E%3D18.x-brightgreen)
![Docker Ready](https://img.shields.io/badge/docker-ready-blue)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)
This project provides a simple, secure Node.js proxy to forward webhook events from **App Store Connect** to a **Microsoft Teams channel**, including signature verification and formatted messages.

---

## 🚀 Features

- ✅ Verifies App Store webhook signatures using HMAC SHA-256
- ✅ Forwards formatted messages to Microsoft Teams
- ✅ Supports custom timezones for event timestamps
- ✅ Error handling and logging
- ✅ Dockerized and ready for deployment (e.g. Render, Railway)
- ✅ One-click deployable to Render

---

## 📋 Prerequisites

### 🔐 App Store Connect
- You must have one of the following roles: **Account Holder**, **Admin**, or **App Manager** to create a webhook.
- When setting up the webhook in App Store Connect, Apple will ask for a **secret**. Use a string of your choice and set it in `SHARED_SECRET`.
- Official docs:
  - [Apple Webhook Notification Overview](https://developer.apple.com/documentation/AppStoreConnectAPI/webhook-notifications)
  - [Configuring Webhook Notifications](https://developer.apple.com/documentation/appstoreconnectapi/configuring-webhook-notifications)
  - [Webhook Permissions Guide](https://developer.apple.com/help/app-store-connect/manage-your-team/manage-webhooks)

### 💬 Microsoft Teams
- You must create an **Incoming Webhook** connector in your desired Teams channel.
- Copy the generated webhook URL (from **Step 10** in the guide below) and set it in `TEAMS_WEBHOOK_URL`.
- Official guide: [Create Incoming Webhook in Teams](https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook?tabs=newteams%2Cdotnet)

---

## 📦 Installation Options

### 1. Manual Setup (Node.js)
If you'd like to run the app directly with Node.js:

```bash
git clone https://github.com/yourusername/appstore-webhook-proxy.git
cd appstore-webhook-proxy
npm install
```

### 2. Docker Setup
Build and run using Docker:

```bash
docker build -t appstore-webhook-proxy .
docker run -p 3000:3000 --env-file .env appstore-webhook-proxy
```

### 3. One-Click Render Deployment
Click below to deploy instantly to Render:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

Make sure to set the following environment variables during setup:
- `SHARED_SECRET`
- `TEAMS_WEBHOOK_URL`
- `APP_STORE_URL` (optional, for linking)
- `TIMEZONE` (e.g., Europe/Athens)

> Render automatically sets `NODE_ENV=production`

---

## ⚙️ Environment Variables

Create a `.env` file (or set variables directly in your cloud environment):

```ini
SHARED_SECRET=your_shared_secret
TEAMS_WEBHOOK_URL=https://your-teams.webhook.url
APP_STORE_URL=https://apps.apple.com/app/id123456789
TIMEZONE=Europe/Athens
```

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

## ✅ Supported Webhook Events
- `appStoreVersionAppVersionStateUpdated`
- `webhookPingCreated`

Unknown events will still be delivered in raw JSON.

---

## 📂 Project Structure

```
.
├── app.js                 # Entry point
├── routes/
│   └── webhook.js         # Webhook handler
├── utils/
│   ├── eventTemplates.js  # Message formatting
│   └── stateDescriptions.js
├── services/
│   ├── signatureVerifier.js
│   └── teamsNotifier.js
├── middleware/
│   ├── errorHandler.js
│   └── logging.js
├── Dockerfile
├── render.yaml            # Render one-click deploy spec
├── .env.example
├── .dockerignore
├── .gitignore
└── README.md
```

---

## 💡 Contributing

Feel free to open issues or submit PRs for:
- More event types
- Slack integration
- Status dashboards

---

## 📝 License
MIT
