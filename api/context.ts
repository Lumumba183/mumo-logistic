import { createClerkClient } from "@clerk/backend";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { User } from "@db/schema";
import { getDb } from "./queries/connection";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import { env } from "./lib/env";

const clerk = createClerkClient({ secretKey: env.clerkSecretKey });

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: User;
  auth?: { userId: string };
};

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const ctx: TrpcContext = { req: opts.req, resHeaders: opts.resHeaders };

  try {
    // Verify Clerk session from request
    const { userId } = await clerk.authenticateRequest(opts.req, {
      authorizedParties: [], // empty = allow all
    });

    if (userId) {
      ctx.auth = { userId };
      // Look up user in our database by clerkId
      const db = getDb();
      const user = await db.query.users.findFirst({
        where: eq(users.clerkId, userId),
      });
      if (user) {
        ctx.user = user;
      }
    }
  } catch {
    // Authentication is optional here
  }

  return ctx;
}
