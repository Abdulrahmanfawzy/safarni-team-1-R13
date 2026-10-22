"use client";

import * as React from "react";
import { CreditCard, Icon, Mail, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import IconsPayment from "./IconsPayment";

type PaymentMethod = "paypal" | "mastercard" | "visa";

interface PaymentFormValues {
  method: PaymentMethod;
  fullName: string;
  email: string;
  validDate: string;
  cvv: string;
}

interface PaymentMethodFormProps {
  onSubmit?: (values: PaymentFormValues) => void;
  className?: string;
}

/* ---------- Brand marks (pure Tailwind, no SVG) ---------- */

function PaypalMark() {
  return (
    <span
      aria-hidden="true"
      className="text-base font-extrabold italic leading-none text-[#253B80]"
    >
      P
    </span>
  );
}

function MastercardMark() {
  return (
    <span aria-hidden="true" className="relative inline-block h-4 w-6">
      <span className="absolute left-0 top-0 size-4 rounded-full bg-[#EB001B]" />
      <span className="absolute right-0 top-0 size-4 rounded-full bg-[#F79E1B]/90" />
    </span>
  );
}

function VisaMark() {
  return (
    <span
      aria-hidden="true"
      className="text-[11px] font-extrabold italic tracking-tight text-[#1A1F71]"
    >
      VISA
    </span>
  );
}

const METHODS: {
  id: PaymentMethod;
  label: string;
  icon: React.ReactNode;
}[] = [
  { id: "paypal", label: "Paypal", icon: <PaypalMark /> },
  { id: "mastercard", label: "Mastercard", icon: <MastercardMark /> },
  { id: "visa", label: "Visa", icon: <VisaMark /> },
];

/* ---------- Field with leading icon ---------- */


<IconsPayment/>

/* ---------- Main component ---------- */

export function PaymentMethodForm({ onSubmit, className }: PaymentMethodFormProps) {
  const [values, setValues] = React.useState<PaymentFormValues>({
    method: "visa",
    fullName: "",
    email: "",
    validDate: "",
    cvv: "",
  });

  const update =
    (field: keyof PaymentFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full max-w-[420px] bg-white px-6 py-10", className)}
    >
      <h2 className="mb-10 text-center text-base font-medium text-slate-900">
        Payment method
      </h2>

      <p className="mb-4 text-sm font-medium text-slate-800">
        Add your payment method
      </p>

      {/* Method selector */}
      <div
        role="radiogroup"
        aria-label="Payment method"
        className="mb-6 flex flex-wrap gap-2"
      >
        {METHODS.map(({ id, label, icon }) => {
          const selected = values.method === id;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setValues((prev) => ({ ...prev, method: id }))}
              className={cn(
                "flex h-10 items-center gap-2 rounded-full px-4 text-sm text-slate-800 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d3092] focus-visible:ring-offset-2",
                selected ? "bg-blue-50" : "bg-gray-100 hover:bg-gray-200/70"
              )}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="fullName" className="text-xs font-normal text-slate-700">
            Full name
          </Label>
          <IconsPayment
            id="fullName"
            name="fullName"
            autoComplete="cc-name"
            placeholder="Name on card"
            icon={<User />}
            value={values.fullName}
            onChange={update("fullName")}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-normal text-slate-700">
            Your email
          </Label>
          <IconsPayment
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            icon={<Mail />}
            value={values.email}
            onChange={update("email")}
            required
          />
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="validDate" className="text-xs font-normal text-slate-700">
              Valid date
            </Label>
            <IconsPayment
              id="validDate"
              name="validDate"
              autoComplete="cc-exp"
              inputMode="numeric"
              placeholder="MM/YY"
              maxLength={5}
              value={values.validDate}
              onChange={update("validDate")}
              required
            />
          </div>

          <div className="w-28 space-y-1.5">
            <Label htmlFor="cvv" className="text-xs font-normal text-slate-700">
              CVV
            </Label>
            <IconsPayment
              id="cvv"
              name="cvv"
              autoComplete="cc-csc"
              inputMode="numeric"
              placeholder="123"
              maxLength={4}
              trailingIcon={<CreditCard />}
              value={values.cvv}
              onChange={update("cvv")}
              required
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="mt-5 h-12 w-full rounded-lg bg-[#2d3092] text-sm font-semibold text-white hover:bg-[#25277a]"
      >
        Confirm booking
      </Button>
    </form>
  );
}

export default PaymentMethodForm;