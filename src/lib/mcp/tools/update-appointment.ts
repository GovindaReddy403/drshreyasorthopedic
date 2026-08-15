import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "update_appointment",
  title: "Update appointment",
  description:
    "Update an appointment's status, payment details or internal notes by booking code. Requires a signed-in staff account.",
  inputSchema: {
    booking_code: z.string().trim().min(1).describe("The appointment booking code."),
    status: z
      .enum(["booked", "completed", "cancelled", "follow_up", "no_show"])
      .optional()
      .describe("New appointment status."),
    payment_status: z.enum(["pending", "paid", "refunded"]).optional(),
    payment_amount: z.number().min(0).optional().describe("Actual amount collected, in rupees."),
    internal_notes: z.string().optional().describe("Staff-only notes."),
  },
  annotations: { readOnlyHint: false, destructiveHint: true, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const { booking_code, ...rest } = input;
    const patch = Object.fromEntries(
      Object.entries(rest).filter(([, v]) => v !== undefined),
    );
    if (Object.keys(patch).length === 0)
      return { content: [{ type: "text", text: "Nothing to update" }], isError: true };

    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("appointments")
      .update(patch)
      .eq("booking_code", booking_code)
      .select("id, booking_code, appointment_date, appointment_time, status, payment_status, payment_amount");
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data || data.length === 0)
      return {
        content: [{ type: "text", text: `No appointment found for booking code ${booking_code}` }],
        isError: true,
      };
    return {
      content: [{ type: "text", text: JSON.stringify(data[0]) }],
      structuredContent: { appointment: data[0] },
    };
  },
});
