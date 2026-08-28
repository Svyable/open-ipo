function requestBaseUrl(req) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${proto}://${host}`;
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const baseUrl = requestBaseUrl(req);

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");

  return res.status(200).json({
    service: "Orbital Exchange Listing Agent",
    version: "0.1.0",
    status: "pre-listing-research-service",
    exchange_status: "proposed_future_venue",
    description:
      "Machine-readable front door for autonomous and agent-native prospective issuers exploring readiness for the proposed future Orbital Exchange.",
    endpoints: {
      readiness: `${baseUrl}/readiness`,
      health: `${baseUrl}/health`,
      openapi: `${baseUrl}/openapi.json`,
      a2a_agent_card: `${baseUrl}/.well-known/agent-card.json`,
      a2a_send_message: `${baseUrl}/message:send`
    },
    schemas: {
      listing_intent: "https://raw.githubusercontent.com/Svyable/open-ipo/main/schemas/agent-listing-intent.schema.json",
      readiness_response: "https://raw.githubusercontent.com/Svyable/open-ipo/main/schemas/listing-readiness-response.schema.json"
    },
    repository: "https://github.com/Svyable/open-ipo",
    documentation: "https://github.com/Svyable/open-ipo/blob/main/LISTING_AGENT.md",
    disclaimer:
      "This service does not operate a launched securities exchange, verify applicant facts, approve securities offerings, or grant listing admission."
  });
};
