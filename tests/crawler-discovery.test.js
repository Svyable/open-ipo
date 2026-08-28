const test = require("node:test");
const assert = require("node:assert/strict");

const staticManifest = require("../discovery/open-ipo.discovery.json");
const {
  discoveryManifest,
  llmsText,
  requestBaseUrl,
  robotsText,
  serviceDirectory
} = require("../lib/crawler-discovery");

const BASE = "https://listing.orbital.example";

test("service directory advertises every machine discovery surface", () => {
  const directory = serviceDirectory(BASE);
  assert.equal(directory.exchange_status, "proposed_future_venue");
  assert.equal(directory.endpoints.openapi, `${BASE}/openapi.json`);
  assert.equal(directory.endpoints.a2a_agent_card, `${BASE}/.well-known/agent-card.json`);
  assert.equal(directory.endpoints.llms_txt, `${BASE}/llms.txt`);
  assert.equal(directory.endpoints.discovery_manifest, `${BASE}/discovery.json`);
  assert.ok(directory.schemas.listing_intent.startsWith("https://raw.githubusercontent.com/"));
  assert.match(directory.disclaimer, /does not operate a launched securities exchange/i);
});

test("dynamic discovery can mark the service live without claiming the exchange is live", () => {
  const manifest = discoveryManifest(BASE, staticManifest);
  assert.equal(manifest.live_service.status, "DEPLOYED_PRE_LISTING_RESEARCH_SERVICE");
  assert.equal(manifest.protocol_status.a2a.live_server_available, true);
  assert.equal(manifest.protocol_status.a2a.agent_card_published, true);
  assert.equal(manifest.safety_boundary.live_exchange, false);
  assert.equal(manifest.safety_boundary.securities_listing_available, false);
  assert.equal(manifest.safety_boundary.facts_verified_by_service, false);
  assert.equal(manifest.status, "PROPOSED_NOT_LIVE_EXCHANGE");
});

test("deployed llms text gives agents an action while preserving status boundary", () => {
  const text = llmsText(BASE, "# repository index");
  assert.match(text, /POST it to https:\/\/listing\.orbital\.example\/readiness/);
  assert.match(text, /PROPOSED \/ NOT A LIVE SECURITIES EXCHANGE/);
  assert.match(text, /Facts verified by service: NO/);
  assert.match(text, /\.well-known\/agent-card\.json/);
});

test("robots policy allows public discovery", () => {
  assert.equal(robotsText(), "User-agent: *\nAllow: /\n");
});

test("base URL honors forwarded deployment headers", () => {
  const req = {
    headers: {
      "x-forwarded-proto": "https",
      "x-forwarded-host": "agents.example.com",
      host: "internal.invalid"
    }
  };
  assert.equal(requestBaseUrl(req), "https://agents.example.com");
});
