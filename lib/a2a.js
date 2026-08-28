const crypto = require("node:crypto");

function uuid() {
  return crypto.randomUUID();
}

function createCompletedTask(readinessResponse, requestMessage = {}) {
  const contextId = requestMessage.contextId || uuid();
  const taskId = requestMessage.taskId || uuid();
  const summary = [
    `Orbital Exchange pre-listing readiness: ${readinessResponse.state}.`,
    `Eligibility hypothesis: ${readinessResponse.eligibility_hypothesis.classification} (${readinessResponse.eligibility_hypothesis.confidence}).`,
    `Facts verified: no.`,
    `Next actions: ${readinessResponse.next_actions.length}.`
  ].join(" ");

  return {
    task: {
      id: taskId,
      contextId,
      status: {
        state: "TASK_STATE_COMPLETED",
        timestamp: new Date().toISOString()
      },
      artifacts: [
        {
          artifactId: uuid(),
          name: "Orbital Listing Readiness Response",
          description: "Deterministic pre-listing feedback generated from a schema-valid agent listing intent.",
          parts: [
            {
              data: readinessResponse,
              mediaType: "application/json"
            },
            {
              text: summary,
              mediaType: "text/plain"
            }
          ],
          metadata: {
            verification: "self-reported-input-only",
            exchangeStatus: "proposed-future-venue"
          }
        }
      ]
    }
  };
}

function createInputRequiredTask(requestMessage = {}) {
  const contextId = requestMessage.contextId || uuid();
  const taskId = requestMessage.taskId || uuid();

  return {
    task: {
      id: taskId,
      contextId,
      status: {
        state: "TASK_STATE_INPUT_REQUIRED",
        timestamp: new Date().toISOString(),
        message: {
          messageId: uuid(),
          contextId,
          taskId,
          role: "ROLE_AGENT",
          parts: [
            {
              text: "Send a structured data part containing a schema-valid agent-listing-intent.v0.1 object. See https://github.com/Svyable/open-ipo/blob/main/schemas/agent-listing-intent.schema.json",
              mediaType: "text/plain"
            }
          ]
        }
      }
    }
  };
}

function findListingIntent(message) {
  if (!message || !Array.isArray(message.parts)) return null;
  for (const part of message.parts) {
    if (
      part &&
      Object.prototype.hasOwnProperty.call(part, "data") &&
      part.data &&
      typeof part.data === "object" &&
      part.data.schema_version === "agent-listing-intent.v0.1"
    ) {
      return part.data;
    }
  }
  return null;
}

module.exports = {
  createCompletedTask,
  createInputRequiredTask,
  findListingIntent,
  uuid
};
