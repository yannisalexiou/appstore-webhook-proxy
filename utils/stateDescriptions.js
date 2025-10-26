const statusDescriptions = {
  PREPARE_FOR_SUBMISSION: "Preparing submission",
  READY_FOR_REVIEW: "Ready for App Store review",
  WAITING_FOR_REVIEW: "Waiting for App Store review",
  IN_REVIEW: "Currently being reviewed by App Store",
  PENDING_CONTRACT: "Waiting for contract approval",
  PENDING_APPLE_RELEASE: "Approved, awaiting Apple release",
  PENDING_DEVELOPER_RELEASE: "Approved, pending developer release",
  PROCESSING_FOR_APP_STORE: "Processing for App Store",
  PROCESSING_FOR_DISTRIBUTION: "Processing for distribution",
  READY_FOR_DISTRIBUTION: "Ready for distribution",
  REJECTED: "Rejected by App Store",
  METADATA_REJECTED: "Metadata rejected",
  DEVELOPER_REJECTED: "Rejected by developer",
  REMOVED_FROM_SALE: "Removed from sale",
  DEVELOPER_REMOVED_FROM_SALE: "Removed from sale by developer",
  PREORDER_READY_FOR_SALE: "Ready for preorder sale",
  READY_FOR_SALE: "Live on the App Store",
  APPROVED: "Approved for release",
};

const statusEmojis = {
  PREPARE_FOR_SUBMISSION: "📝",
  READY_FOR_REVIEW: "📤",
  WAITING_FOR_REVIEW: "⏳",
  IN_REVIEW: "🔎",
  PENDING_CONTRACT: "📄",
  PENDING_APPLE_RELEASE: "🍏",
  PENDING_DEVELOPER_RELEASE: "🚦",
  PROCESSING_FOR_APP_STORE: "⚙️",
  PROCESSING_FOR_DISTRIBUTION: "🔄",
  READY_FOR_DISTRIBUTION: "🎯",
  REJECTED: "❌",
  METADATA_REJECTED: "🛑",
  REMOVED_FROM_SALE: "📉",
  DEVELOPER_REMOVED_FROM_SALE: "📤",
  DEVELOPER_REJECTED: "🚫",
  PREORDER_READY_FOR_SALE: "🔔",
  READY_FOR_SALE: "✅",
  APPROVED: "📗",
};

function getAppStoreStatusLabel(code) {
  return statusDescriptions[code] || code;
}

function getStatusEmoji(code) {
  return statusEmojis[code] || "📦";
}

const buildUploadStateLabels = {
  PROCESSING: "Processing upload",
  COMPLETE: "Upload complete",
};

const buildUploadStateEmojis = {
  PROCESSING: "⚙️",
  COMPLETE: "✅",
};

function getBuildUploadStateLabel(code) {
  return buildUploadStateLabels[code] || code;
}

function getBuildUploadStateEmoji(code) {
  return buildUploadStateEmojis[code] || "📦";
}

// External TestFlight build state (for buildBetaDetailExternalBuildStateUpdated)
const externalBuildStateLabels = {
  READY_FOR_BETA_TESTING: "Ready for external testers",
  IN_BETA_TESTING: "Available to testers",
  EXPIRED: "Build expired",
  PROCESSING: "Processing for TestFlight review",
  INTERNAL_ONLY: "Internal testing only",
};

const externalBuildStateEmojis = {
  READY_FOR_BETA_TESTING: "📣",
  IN_BETA_TESTING: "🧪",
  EXPIRED: "⌛",
  PROCESSING: "🔄",
  INTERNAL_ONLY: "🔒",
};

function getExternalBuildStateLabel(code) {
  return externalBuildStateLabels[code] || code;
}

function getExternalBuildStateEmoji(code) {
  return externalBuildStateEmojis[code] || "📦";
}

module.exports = {
  getAppStoreStatusLabel,
  getStatusEmoji,
  getBuildUploadStateLabel,
  getBuildUploadStateEmoji,
  getExternalBuildStateLabel,
  getExternalBuildStateEmoji,
};
