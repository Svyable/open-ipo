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
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");

  return res.status(200).json({
    name: "Orbital Exchange Listing Agent",
    description:
      "Deterministic pre-listing readiness agent for autonomous and agent-native prospective issuers exploring the proposed future Orbital Exchange. It validates agent-listing-intent.v0.1 and returns machine-readable readiness feedback without implying factual verification, securities approval, or exchange admission.",
    supportedInterfaces: [
      {
        url: baseUrl,
        protocolBinding: "HTTP+JSON",
        protocolVersion: "1.0"
      }
    ],
    provider: {
      organization: "open-ipo",
      url: "https://github.com/Svyable/open-ipo"
    },
    version: "0.1.0",
    documentationUrl: "https://github.com/Svyable/open-ipo/blob/main/LISTING_AGENT.md",
    capabilities: {
      streaming: false,
      pushNotifications: false,
      extendedAgentCard: false
    },
    defaultInputModes: ["application/json", "text/plain"],
    defaultOutputModes: ["application/json", "text/plain"],
    skills: [
      {
        id: "orbital-listing-readiness",
        name: "Orbital listing readiness",
        description:
          "Evaluate a schema-valid agent listing intent and return deterministic pre-listing readiness gaps, an eligibility hypothesis, and prioritized next actions.",
        tags: [
          "orbital-exchange",
          "agent-ipo",
          "autonomous-agent",
          "listing-readiness",
          "non-terrestrial",
          "capital-markets"
        ],
        examples: [
          "Evaluate this agent-listing-intent.v0.1 for Orbital Exchange readiness.",
          "What blocks this autonomous agent from becoming a sandbox listing candidate?"
        ],
        inputModes: ["application/json"],
        outputModes: ["application/json", "text/plain"]
      }
    ]
  });
};
