import { createRouter, authedQuery, publicQuery } from "./middleware";

export const authRouter = createRouter({
  me: authedQuery.query((opts) => opts.ctx.user),
  logout: publicQuery.mutation(async () => {
    // Clerk handles logout on the client side
    return { success: true };
  }),
});
