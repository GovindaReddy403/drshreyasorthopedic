import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_treatments",
  title: "List treatments",
  description: "List the clinic's treatments with fees and durations.",
  inputSchema: {
    include_inactive: z.boolean().default(false).describe("Include treatments that are switched off."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ include_inactive }, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("treatments")
      .select("id, name, description, fee, duration_minutes, is_active, sort_order")
      .order("sort_order");
    if (!include_inactive) query = query.eq("is_active", true);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { treatments: data ?? [] },
    };
  },
});
