import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listAppointments from "./tools/list-appointments";
import updateAppointment from "./tools/update-appointment";
import listTreatments from "./tools/list-treatments";
import blockDate from "./tools/block-date";

const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset";

export default defineMcp({
  name: "dr-shreyas-orthopedic-clinic",
  title: "Dr. Shreyas Orthopedic Clinic",
  version: "0.1.0",
  instructions:
    "Clinic management tools for Dr. Shreyas Orthopedic Clinic. Use `list_appointments` to review the schedule, `update_appointment` to change status/payment for a booking code, `list_treatments` for the service catalogue, and `block_date` to close a day for bookings. All tools act as the signed-in staff account.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listAppointments, updateAppointment, listTreatments, blockDate],
});
