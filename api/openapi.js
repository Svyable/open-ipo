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
  const intentSchema = "https://raw.githubusercontent.com/Svyable/open-ipo/main/schemas/agent-listing-intent.schema.json";
  const readinessSchema = "https://raw.githubusercontent.com/Svyable/open-ipo/main/schemas/listing-readiness-response.schema.json";

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");

  return res.status(200).json({
    openapi: "3.1.0",
    info: {
      title: "Orbital Exchange Listing Agent API",
      version: "0.1.0",
      description:
        "Deterministic pre-listing readiness API for autonomous and agent-native prospective issuers exploring the proposed future Orbital Exchange. This service does not verify applicant facts, approve securities offerings, or grant exchange admission."
    },
    servers: [{ url: baseUrl }],
    tags: [
      {
        name: "discovery",
        description: "Machine-readable service discovery and health."
      },
      {
        name: "listing-readiness",
        description: "Pre-listing research feedback for schema-valid agent listing intents."
      }
    ],
    paths: {
      "/health": {
        get: {
          tags: ["discovery"],
          operationId: "getListingAgentHealth",
          summary: "Get listing-agent service health",
          responses: {
            "200": {
              description: "Service status",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      service: { type: "string" },
                      version: { type: "string" },
                      status: { type: "string" },
                      exchange_status: { type: "string" },
                      verification_mode: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/readiness": {
        get: {
          tags: ["listing-readiness"],
          operationId: "getReadinessContract",
          summary: "Get readiness endpoint usage information",
          responses: {
            "200": {
              description: "Endpoint usage metadata",
              content: { "application/json": { schema: { type: "object" } } }
            }
          }
        },
        post: {
          tags: ["listing-readiness"],
          operationId: "evaluateAgentListingIntent",
          summary: "Evaluate an agent listing intent",
          description:
            "Validates agent-listing-intent.v0.1 and returns deterministic listing-readiness-response.v0.1. A successful response is pre-listing research feedback only.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { "$ref": intentSchema }
              }
            }
          },
          responses: {
            "200": {
              description: "Deterministic pre-listing readiness response",
              content: {
                "application/json": {
                  schema: { "$ref": readinessSchema }
                }
              }
            },
            "400": {
              description: "Listing intent failed schema validation",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["error", "message", "validation_errors"],
                    properties: {
                      error: { const: "invalid_listing_intent" },
                      message: { type: "string" },
                      validation_errors: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            instancePath: { type: "string" },
                            keyword: { type: "string" },
                            message: { type: "string" }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/.well-known/agent-card.json": {
        get: {
          tags: ["discovery"],
          operationId: "getA2AAgentCard",
          summary: "Get A2A Agent Card",
          responses: {
            "200": {
              description: "A2A Agent Card",
              content: { "application/json": { schema: { type: "object" } } }
            }
          }
        }
      },
      "/message:send": {
        post: {
          tags: ["listing-readiness"],
          operationId: "sendA2AMessage",
          summary: "Send an A2A v1.0 message",
          description:
            "A2A HTTP+JSON entrypoint. Send a ROLE_USER message containing a structured data part whose value is a complete agent-listing-intent.v0.1 object.",
          parameters: [
            {
              in: "header",
              name: "A2A-Version",
              required: true,
              schema: { type: "string", const: "1.0" }
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/a2a+json": {
                schema: {
                  type: "object",
                  required: ["message"],
                  properties: {
                    message: {
                      type: "object",
                      required: ["messageId", "role", "parts"],
                      properties: {
                        messageId: { type: "string" },
                        contextId: { type: "string" },
                        taskId: { type: "string" },
                        role: { const: "ROLE_USER" },
                        parts: {
                          type: "array",
                          minItems: 1,
                          items: { type: "object" }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          responses: {
            "200": {
              description: "A2A task response",
              content: { "application/a2a+json": { schema: { type: "object" } } }
            },
            "400": {
              description: "Invalid A2A request, unsupported version, or invalid listing intent",
              content: { "application/a2a+json": { schema: { type: "object" } } }
            }
          }
        }
      }
    },
    externalDocs: {
      description: "open-ipo / Orbital Exchange Listing Agent",
      url: "https://github.com/Svyable/open-ipo/blob/main/LISTING_AGENT.md"
    },
    "x-orbital-exchange-status": "proposed_future_venue",
    "x-verification-mode": "self_reported_input_only"
  });
};
