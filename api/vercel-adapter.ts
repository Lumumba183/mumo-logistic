import type { VercelRequest, VercelResponse } from "@vercel/node";
import app from "./boot";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Build the full URL
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host || "localhost";
  const url = `${protocol}://${host}${req.url}`;

  // Create a standard Request from Vercel's req
  const body = req.method !== "GET" && req.method !== "HEAD" && req.body
    ? JSON.stringify(req.body)
    : undefined;

  const request = new Request(url, {
    method: req.method,
    headers: new Headers(
      Object.entries(req.headers).map(([k, v]) => [
        k,
        Array.isArray(v) ? v.join(", ") : String(v),
      ])
    ),
    body,
  });

  // Pass to Hono app
  const response = await app.fetch(request);

  // Send response back to Vercel
  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  const responseBody = await response.text();
  res.send(responseBody);
}
