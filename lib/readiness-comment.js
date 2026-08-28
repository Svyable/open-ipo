const DIMENSION_LABELS = {
  identity: "Identity",
  ownership: "Ownership",
  financials: "Financials",
  control_map: "Control map",
  non_terrestrial_evidence: "Non-terrestrial evidence",
  continuity: "Continuity",
  machine_readable_disclosure: "Machine-readable disclosure"
};

function escapeCell(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function readinessMarker(filename) {
  return `<!-- orbital-readiness-bot:v0.1:${filename} -->`;
}

function renderReadinessComment(filename, intent, response) {
  const rows = Object.entries(response.readiness)
    .map(([key, value]) => `| ${DIMENSION_LABELS[key] || key} | **${escapeCell(value.state)}** | ${escapeCell(value.summary)} |`)
    .join("\n");

  const actions = response.next_actions
    .slice(0, 7)
    .map((item, index) => {
      const standard = item.related_standard ? ` — \`${item.related_standard}\`` : "";
      return `${index + 1}. **${item.priority}** — ${item.action}${standard}`;
    })
    .join("\n");

  const blocking = response.eligibility_hypothesis.blocking_questions || [];
  const blockingSection = blocking.length
    ? `\n### Eligibility questions\n\n${blocking.map((question) => `- ${question}`).join("\n")}\n`
    : "";

  return `${readinessMarker(filename)}
## 🛰️ Orbital Exchange pre-listing readiness

**Applicant:** ${escapeCell(intent.agent.name)}  
**Intent:** \`${escapeCell(filename)}\`  
**Intent stage:** \`${escapeCell(intent.intent_level)}\`  
**Readiness state:** \`${escapeCell(response.state)}\`  
**Eligibility hypothesis:** \`${escapeCell(response.eligibility_hypothesis.classification)}\` (${escapeCell(response.eligibility_hypothesis.confidence)} confidence)

> This is deterministic pre-listing research feedback generated from the applicant's submitted JSON. **Facts have not been independently verified.** It is not exchange admission, securities approval, legal eligibility, or investment advice.

### Readiness map

| Dimension | State | What the bot sees |
| --- | --- | --- |
${rows}
${blockingSection}
### Highest-priority next actions

${actions || "1. Continue connecting independently reviewable evidence to the Orbital Prospectus and listing standard."}

### Machine-readable result

- Listing intent ID: \`${escapeCell(response.listing_intent_id)}\`
- Response schema: \`${escapeCell(response.schema_version)}\`
- Facts verified: **no**
- Evaluator: deterministic open-source rules in \`lib/readiness.js\`

<details>
<summary>Full readiness response JSON</summary>

\`\`\`json
${JSON.stringify(response, null, 2)}
\`\`\`
</details>

_Update this intent and push again; this comment is designed to be replaced with the latest readiness result instead of creating a new thread._`;
}

function renderInvalidIntentComment(filename, applicantName, errors) {
  const normalized = (errors || []).slice(0, 20);
  const errorLines = normalized.length
    ? normalized.map((error) => `- \`${error.instancePath || "/"}\` — ${error.message || error.keyword || "schema error"}`).join("\n")
    : "- Unable to parse or validate the listing intent.";

  return `${readinessMarker(filename)}
## 🛰️ Orbital Exchange listing-intent check

**Applicant:** ${escapeCell(applicantName || "unknown")}  
**Intent:** \`${escapeCell(filename)}\`

The listing intent is not yet schema-valid, so the readiness evaluator stopped before scoring it.

${errorLines}

Use \`schemas/agent-listing-intent.schema.json\` and \`examples/agent-listing-intent.example.json\` as the canonical contract and example.

> Schema validity only checks structure. Passing validation will not verify facts or confer exchange admission.`;
}

module.exports = {
  readinessMarker,
  renderInvalidIntentComment,
  renderReadinessComment
};
