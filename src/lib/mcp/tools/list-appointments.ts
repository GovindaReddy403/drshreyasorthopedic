import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_appointments",
  title: "List appointments",
  description:
    "List clinic appointments, optionally filtered by date range and status. Requires a signed-in staff account.",
  inputSchema: {
    from_date: z.string().optional().describe("Earliest appointment date, YYYY-MM-DD."),
    to_date: z.string().optional().describe("Latest appointment date, YYYY-MM-DD."),
    status: z
      .enum(["booked", "completed", "cancelled", "follow_up", "no_show"])
      .optional()
      .describe("Filter by appointment status."),
    limit: z.number().int().min(1).max(200).default(50).describe("Maximum rows to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ from_date, to_date, status, limit }, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("appointments")
      .select(
        "id, booking_code, appointment_date, appointment_time, patient_name, patient_mobile, treatment_name, status, payment_status, payment_amount, reason",
      )
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true })
      .limit(limit ?? 50);
    if (from_date) query = query.gte("appointment_date", from_date);
    if (to_date) query = query.lte("appointment_date", to_date);
    if (status) query = query.eq("status", status);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { appointments: data ?? [] },
    };
  },
});
