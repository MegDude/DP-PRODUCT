import OpenAI from "openai";

const MAP_AGENT_MODEL = process.env.OPENAI_MODEL || "gpt-5.4-mini";

const mapAgentSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "answer", "places", "actions", "confidence"],
  properties: {
    title: { type: "string" },
    answer: { type: "string" },
    confidence: { type: "number", minimum: 0, maximum: 1 },
    places: {
      type: "array",
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "name", "reason", "mapQuery", "action"],
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          reason: { type: "string" },
          mapQuery: { type: "string" },
          action: { type: "string" },
        },
      },
    },
    actions: {
      type: "array",
      minItems: 2,
      maxItems: 4,
      items: { type: "string" },
    },
  },
};

function normalizeJson(rawText) {
  if (!rawText) {
    return "{\"answer\":\"\",\"places\":[]}";
  }

  return rawText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
}

function localAgentAnswer({ query, location, mode, filter, context = [] }) {
  const usableContext = Array.isArray(context) ? context.slice(0, 5) : [];
  const names = usableContext.map((place) => place.name).filter(Boolean);
  const topNames = names.length ? names.join(", ") : "the nearest useful downtown places";
  const audience =
    mode === "partner"
      ? "resident movement, nearby demand, and walkable timing"
      : "walkability, current intent, perks, and nearby plans";

  return {
    title: `Answering: “${query}”`,
    answer: `Start with ${topNames}. Around ${location}, the map is reading ${audience}${filter && filter !== "All" ? ` inside ${filter}` : ""}. Pick the closest fit, save it if you are planning ahead, or open the detail drawer for directions, perks, and partner context.`,
    places: usableContext.map((place) => ({
      id: String(place.id || place.name || ""),
      name: place.name,
      reason: `${place.category || "Downtown place"} in ${place.district || location}.`,
      mapQuery: `${place.name} ${place.district || location} Austin`,
      action: mode === "partner" ? "Review activation fit" : "Open on map",
    })),
    actions: mode === "partner"
      ? ["Compare nearby demand", "Open the partner map", "Attach a simple offer"]
      : ["Open the map", "Save the best fit", "Check walkable next steps"],
    confidence: usableContext.length ? 0.72 : 0.58,
    source: "local",
  };
}

function parseResponseOutput(response) {
  if (response?.output_text) return response.output_text;

  const textItems = [];
  for (const item of response?.output || []) {
    for (const content of item?.content || []) {
      if (content?.type === "output_text" && content?.text) {
        textItems.push(content.text);
      }
    }
  }
  return textItems.join("\n");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { query, location = "Downtown Austin", district, mode = "resident", filter = "All", context = [] } = req.body || {};
    const mapLocation = district || location;

    if (!query || !query.trim()) {
      return res.status(400).json({ error: "Missing query" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(200).json(localAgentAnswer({ query, location: mapLocation, mode, filter, context }));
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.responses.create({
      model: MAP_AGENT_MODEL,
      instructions: `You are the Downtown Perks agentic map operator for downtown Austin.
Use the provided map context first. Rank nearby places, explain why they matter, and give concrete next actions.
Resident mode prioritizes walkability, perks, events, saves, and simple next steps.
Partner mode prioritizes resident movement, demand, activation timing, and offer fit.
Never invent addresses, private data, or real-time facts not present in context. Never say there are no matches; give the best available next move.
Return only the requested structured JSON.`,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify({
                query,
                location: mapLocation,
                mode,
                filter,
                context: Array.isArray(context) ? context.slice(0, 12) : [],
              }),
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "downtown_perks_map_agent_answer",
          strict: true,
          schema: mapAgentSchema,
        },
      },
    });

    const raw = parseResponseOutput(response);
    const parsed = JSON.parse(normalizeJson(raw));
    const places = Array.isArray(parsed.places) ? parsed.places.slice(0, 5) : [];

    return res.status(200).json({
      title: parsed.title || `Answering: “${query}”`,
      answer: parsed.answer || localAgentAnswer({ query, location: mapLocation, mode, filter, context }).answer,
      places,
      actions: Array.isArray(parsed.actions) ? parsed.actions.slice(0, 4) : [],
      confidence: typeof parsed.confidence === "number" ? parsed.confidence : 0.75,
      source: "openai",
      model: MAP_AGENT_MODEL,
    });
  } catch (error) {
    console.error("ask-map failed", error);
    return res.status(200).json(localAgentAnswer({ query: req.body?.query || "downtown", location: req.body?.district || req.body?.location || "Downtown Austin", mode: req.body?.mode, filter: req.body?.filter, context: req.body?.context }));
  }
}
