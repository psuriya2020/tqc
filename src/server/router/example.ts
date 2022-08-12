import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("groupInvStock", {
    async resolve({ ctx }) {
      const result = await ctx.prisma.$queryRawUnsafe(
        "SELECT itemgroup, sum(qty) as qty FROM InvStockTrans LEFT JOIN InvWH ON InvWH.refid = InvStockTrans.refid LEFT JOIN InvItem ON InvItem.itemno = InvStockTrans.itemno WHERE InvWH.warehouse = 'RM' GROUP BY itemgroup"
      );
      return result;
    },
  });
