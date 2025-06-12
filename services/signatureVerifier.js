const crypto = require("crypto");

function verifyAppleSignature(rawBody, headerSignature, sharedSecret) {
  if (!headerSignature) return false;
  const received = headerSignature.replace(/^hmacsha256=/, "");
  const hmac = crypto
    .createHmac("sha256", sharedSecret)
    .update(rawBody)
    .digest("hex");
  return hmac === received;
}

module.exports = { verifyAppleSignature };
