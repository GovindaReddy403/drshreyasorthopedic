import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "block_date",
  title: "Block a clinic date",
  description:
    "Mark a date as unavailable for bookings (holiday, conference, leave). Requires a signed-in staff account.",
  inputSchema: {
    blocked_date: z.string().trim().min(1).describe("Date to block, YYYY-MM-DD."),
    reason: z.string().trim().optional().describe("Optional reason shown to staff."),
  },
  annotations: { readOnlyHint: false, destructiveHint: true, openWorldHint: false },
  handler: async ({ blocked_date, reason }, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("blocked_dates")
      .insert({ blocked_date, reason: reason ?? null })
      .select("id, blocked_date, reason");
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data?.[0] ?? {}) }],
      structuredContent: { blocked_date: data?.[0] },
    };
  },
});
