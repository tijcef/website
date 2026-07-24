import { MEMBERSHIP_META, VERIFICATION_META } from "@/lib/auth";
import type { Membership, VerificationStatus } from "@/lib/data";
import { ShieldCheck, Sparkles, BadgeCheck, Clock, XCircle, CircleDashed } from "lucide-react";

export function MembershipBadge({ tier }: { tier: Membership }) {
  const meta = MEMBERSHIP_META[tier];
  const Icon = tier === "admin" ? ShieldCheck : tier === "pro" || tier === "partner" ? Sparkles : BadgeCheck;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${meta.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {meta.label}
    </span>
  );
}

export function VerificationBadge({ status }: { status: VerificationStatus }) {
  const meta = VERIFICATION_META[status];
  const Icon =
    status === "verified"
      ? BadgeCheck
      : status === "pending_review"
        ? Clock
        : status === "rejected"
          ? XCircle
          : CircleDashed;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${meta.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {meta.label}
    </span>
  );
}
