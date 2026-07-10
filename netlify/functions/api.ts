import type { Handler } from "@netlify/functions";
import app from "../../api/app";

export const handler: Handler = async (event, context) => {
  // Reconstruct URL ensuring /api prefix for Hono routing
  const url = new URL(event.rawUrl);
  // Netlify rewrites /api/* to /.netlify/functions/api/*
  // event.rawUrl may have the function path, so ensure /api prefix
  if (!url.pathname.startsWith("/api")) {
    url.pathname = "/api" + url.pathname;
  }

  const request = new Request(url.toString(), {
    method: event.httpMethod,
    headers: new Headers(event.multiValueHeaders as Record<string, string[]>),
    body: event.body
      ? Buffer.from(event.body, event.isBase64Encoded ? "base64" : "utf-8")
      : undefined,
  });

  // Add Netlify context to the request for Hono to access
  Object.assign(request, { netlifyContext: context, netlifyEvent: event });

  // Fetch through Hono
  const response = await app.fetch(request);

  // Convert Web API Response to Netlify response
  const body = await response.text();
  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return {
    statusCode: response.status,
    headers,
    body,
    isBase64Encoded: false,
  };
};
