import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const createRouter = t.router;
export const publicQuery = t.procedure;

// All queries are public — no auth required
export const authedQuery = t.procedure;
export const adminQuery = t.procedure;
export const companionQuery = t.procedure;
export const clientQuery = t.procedure;
