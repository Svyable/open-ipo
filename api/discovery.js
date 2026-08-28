const {
  discoveryManifest,
  readStaticDiscoveryManifest,
  requestBaseUrl
} = require("../lib/crawler-discovery");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const baseUrl = requestBaseUrl(req);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");
  return res.status(200).json(
    discoveryManifest(baseUrl, readStaticDiscoveryManifest())
  );
};
