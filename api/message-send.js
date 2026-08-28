const { evaluateListingIntent, validateIntent } = require("../lib/readiness");
const { createCompletedTask, createInputRequiredTask, findListingIntent } = require("../lib/a2a");

function a2aError(res, status, reason, message, extra = {}) {
  res.setHeader("Content-Type", "application/a2a+json; charset=utf-8");
  return res.status(status).json({
    error: {
      code: status,
      status: reason,
      message,
      details: [
        {
          "@type": "type.googleapis.com/google.rpc.ErrorInfo",
          reason,
          domain: "a2a-protocol.org",
          metadata: extra
        }
      ]
    }
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,A2A-Version");

  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST,OPTIONS");
    return a2aError(res, 405, "METHOD_NOT_ALLOWED", "Use POST /message:send.");
  }

  const requestedVersion = req.headers["a2a-version"];
  if (requestedVersion !== "1.0") {
    return a2aError(
      res,
      400,
      "VERSION_NOT_SUPPORTED",
      "This interface currently supports A2A protocol version 1.0 only.",
      { supportedVersions: "1.0", receivedVersion: requestedVersion || "0.3-default" }
    );
  }

  const body = req.body || {};
  const message = body.message;
  if (!message || message.role !== "ROLE_USER" || !Array.isArray(message.parts)) {
    return a2aError(
      res,
      400,
      "INVALID_ARGUMENT",
      "SendMessageRequest.message must be a ROLE_USER message with at least one part."
    );
  }

  const intent = findListingIntent(message);
  if (!intent) {
    res.setHeader("Content-Type", "application/a2a+json; charset=utf-8");
    return res.status(200).json(createInputRequiredTask(message));
  }

  const validation = validateIntent(intent);
  if (!validation.valid) {
    return a2aError(
      res,
      400,
      "INVALID_ARGUMENT",
      "The supplied agent-listing-intent.v0.1 failed schema validation.",
      { validationErrors: JSON.stringify(validation.errors) }
    );
  }

  try {
    const readinessResponse = evaluateListingIntent(intent);
    res.setHeader("Content-Type", "application/a2a+json; charset=utf-8");
    return res.status(200).json(createCompletedTask(readinessResponse, message));
  } catch (error) {
    console.error("A2A readiness evaluation failed", error);
    return a2aError(
      res,
      500,
      "INTERNAL",
      "The listing agent could not generate a schema-valid readiness response."
    );
  }
};
