module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({
    service: "orbital-exchange-listing-agent",
    version: "0.1.0",
    status: "ok",
    exchange_status: "proposed_future_venue",
    verification_mode: "self_reported_input_only"
  });
};
