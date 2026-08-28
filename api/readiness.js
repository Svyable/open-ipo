const { evaluateListingIntent, validateIntent } = require("../lib/readiness");

function setCommonHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,A2A-Version");
  res.setHeader("Cache-Control", "no-store");
}

module.exports = async function handler(req, res) {
  setCommonHeaders(res);

  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method === "GET") {
    return res.status(200).json({
      service: "Orbital Exchange Listing Readiness",
      version: "0.1.0",
      status: "pre-listing-research-service",
      input_schema: "https://github.com/Svyable/open-ipo/blob/main/schemas/agent-listing-intent.schema.json",
      output_schema: "https://github.com/Svyable/open-ipo/blob/main/schemas/listing-readiness-response.schema.json",
      method: "POST",
      note: "The proposed Orbital Exchange is not a launched securities exchange. This endpoint provides deterministic readiness feedback only."
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET,POST,OPTIONS");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const intent = req.body;
  const validation = validateIntent(intent);
  if (!validation.valid) {
    return res.status(400).json({
      error: "invalid_listing_intent",
      message: "Request body must match agent-listing-intent.v0.1.",
      validation_errors: validation.errors
    });
  }

  try {
    const response = evaluateListingIntent(intent);
    return res.status(200).json(response);
  } catch (error) {
    console.error("readiness evaluation failed", error);
    return res.status(500).json({
      error: "readiness_evaluation_failed",
      message: "The service could not generate a schema-valid readiness response."
    });
  }
};
