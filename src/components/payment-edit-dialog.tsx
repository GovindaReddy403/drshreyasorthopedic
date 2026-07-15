import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

export type PaymentEditTarget = {
  id: string;
  patient_name: string;
  payment_amount: number | null;
  payment_status: string;
  payment_method: string;
};

export function PaymentEditDialog({
  appt,
  onClose,
}: {
  appt: PaymentEditTarget | null;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("pending");
  const [method, setMethod] = useState("clinic");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!appt) return;
    setAmount(String(appt.payment_amount ?? 0));
    setStatus(appt.payment_status);
    setMethod(appt.payment_method);
  }, [appt]);

  async function save() {
    if (!appt) return;
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt < 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setSaving(true);
    const paidAt =
      status === "paid_online" || status === "paid_clinic"
        ? new Date().toISOString()
        : null;
    const { error } = await supabase
      .from("appointments")
      .update({
        payment_amount: amt,
        payment_status: status,
        payment_method: method,
        payment_paid_at: paidAt,
      })
      .eq("id", appt.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Payment updated");
    qc.invalidateQueries();
    onClose();
  }

  return (
    <Dialog open={Boolean(appt)} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update payment · {appt?.patient_name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="amt">Actual amount paid (₹)</Label>
            <Input
              id="amt"
              type="number"
              min={0}
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <Label>Payment method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="clinic">Pay at clinic</SelectItem>
                <SelectItem value="online">Online</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Payment status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid_clinic">Paid at clinic</SelectItem>
                <SelectItem value="paid_online">Paid online</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
