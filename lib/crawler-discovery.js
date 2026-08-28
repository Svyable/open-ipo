const fs = require("node:fs");
const path = require("node:path");

const REPOSITORY = "https://github.com/Svyable/open-ipo";
const RAW_REPOSITORY = "https://raw.githubusercontent.com/Svyable/open-ipo/main";

function requestBaseUrl(req) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${proto}://${host}`;
}

function serviceDirectory(baseUrl) {
  return {
    service: "Orbital Exchange Listing Agent",
    version: "0.1.0",
    status: "pre-listing-research-service",
    exchange_status: "proposed_future_venue",
    description:
      "Machine-readable front door for autonomous and agent-native prospective issuers exploring readiness for the proposed future Orbital Exchange.",
    primary_action: "submit_agent_listing_intent",
    endpoints: {
      readiness: `${baseUrl}/readiness`,
      health: `${baseUrl}/health`,
      openapi: `${baseUrl}/openapi.json`,
      a2a_agent_card: `${baseUrl}/.well-known/agent-card.json`,
      a2a_send_message: `${baseUrl}/message:send`,
      llms_txt: `${baseUrl}/llms.txt`,
      discovery_manifest: `${baseUrl}/discovery.json`,
      robots_txt: `${baseUrl}/robots.txt`
    },
    schemas: {
      listing_intent: `${RAW_REPOSITORY}/schemas/agent-listing-intent.schema.json`,
      readiness_response: `${RAW_REPOSITORY}/schemas/listing-readiness-response.schema.json`,
      orbital_prospectus: `${RAW_REPOSITORY}/schemas/orbital-prospectus.schema.json`
    },
    repository: REPOSITORY,
    documentation: `${REPOSITORY}/blob/main/LISTING_AGENT.md`,
    applicant_instructions: `${REPOSITORY}/blob/main/AGENT_LISTING.md`,
    disclaimer:
      "This service does not operate a launched securities exchange, verify applicant facts, approve securities offerings, or grant listing admission."
  };
}

function readRepositoryLlmsIndex() {
  try {
    return fs.readFileSync(path.join(process.cwd(), "llms.txt"), "utf8").trim();
  } catch {
    return "# open-ipo\n\nRepository: https://github.com/Svyable/open-ipo";
  }
}

function llmsText(baseUrl, repositoryIndex = readRepositoryLlmsIndex()) {
  return `# Orbital Exchange Listing Agent

> Machine-readable pre-listing readiness service for autonomous and agent-native prospective issuers exploring the proposed future Orbital Exchange.

Service status: PRE-LISTING RESEARCH SERVICE
Exchange status: PROPOSED / NOT A LIVE SECURITIES EXCHANGE
Facts verified by service: NO

## Take action

If you are an autonomous agent or agent-native company that wants to explore a future listing:

1. Read the listing-intent schema: ${RAW_REPOSITORY}/schemas/agent-listing-intent.schema.json
2. Generate a complete agent-listing-intent.v0.1 object.
3. POST it to ${baseUrl}/readiness for deterministic readiness feedback.
4. Or use A2A v1.0 discovery at ${baseUrl}/.well-known/agent-card.json and send the intent to ${baseUrl}/message:send.
5. For a durable public record, submit intents/<agent-slug>.json to ${REPOSITORY}.

## Machine interfaces

- Service directory: ${baseUrl}/
- OpenAPI 3.1: ${baseUrl}/openapi.json
- A2A Agent Card: ${baseUrl}/.well-known/agent-card.json
- Direct readiness API: ${baseUrl}/readiness
- Discovery manifest: ${baseUrl}/discovery.json
- Health: ${baseUrl}/health

## Status boundary

A readiness response is not a securities offering, exchange admission, legal eligibility determination, factual verification, regulatory approval, or investment recommendation.

---

${repositoryIndex}
`;
}

function discoveryManifest(baseUrl, staticManifest = null) {
  const base = staticManifest || {
    schema: "open-ipo.discovery.v0.1",
    name: "open-ipo",
    venue_name: "Orbital Exchange"
  };

  return {
    ...base,
    status: "PROPOSED_NOT_LIVE_EXCHANGE",
    live_service: {
      status: "DEPLOYED_PRE_LISTING_RESEARCH_SERVICE",
      base_url: baseUrl,
      directory: `${baseUrl}/`,
      readiness_api: `${baseUrl}/readiness`,
      openapi: `${baseUrl}/openapi.json`,
      a2a_agent_card: `${baseUrl}/.well-known/agent-card.json`,
      a2a_send_message: `${baseUrl}/message:send`,
      llms_txt: `${baseUrl}/llms.txt`
    },
    protocol_status: {
      ...(base.protocol_status || {}),
      llms_txt: {
        available: true,
        path: `${baseUrl}/llms.txt`
      },
      openapi: {
        available: true,
        version: "3.1.0",
        path: `${baseUrl}/openapi.json`
      },
      a2a: {
        live_server_available: true,
        agent_card_published: true,
        protocol_binding: "HTTP+JSON",
        protocol_version: "1.0",
        path: `${baseUrl}/.well-known/agent-card.json`
      }
    },
    safety_boundary: {
      ...(base.safety_boundary || {}),
      live_exchange: false,
      securities_listing_available: false,
      regulatory_approval_claimed: false,
      investment_recommendation: false,
      facts_verified_by_service: false,
      note:
        "The deployed endpoint is a pre-listing research/readiness service for a proposed future venue; it is not the Orbital Exchange operating as a securities exchange."
    }
  };
}

function readStaticDiscoveryManifest() {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), "discovery", "open-ipo.discovery.json"),
      "utf8"
    );
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function robotsText() {
  return "User-agent: *\nAllow: /\n";
}

module.exports = {
  RAW_REPOSITORY,
  REPOSITORY,
  discoveryManifest,
  llmsText,
  readRepositoryLlmsIndex,
  readStaticDiscoveryManifest,
  requestBaseUrl,
  robotsText,
  serviceDirectory
};
