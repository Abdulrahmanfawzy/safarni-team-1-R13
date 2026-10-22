"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CreditCard, Mail, User, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SuccessScreen } from "@/features/Payments/components/SuccessPayment";
import { BookingSummary } from "@/features/Payments/components/SummaryBooking";

type PaymentMethod = "paypal" | "mastercard" | "visa";

interface PaymentFormValues {
    method: PaymentMethod;
    fullName: string;
    email: string;
    validDate: string;
    cvv: string;
}

type FieldErrors = Partial<Record<keyof PaymentFormValues, string>>;

interface PaymentMethodFormProps {
    onSubmit?: (values: PaymentFormValues) => void;
    className?: string;
}

/* ---------- Brand marks ---------- */
function PaypalMark() {
    return (
        <span aria-hidden="true" className="text-base font-extrabold italic leading-none text-[#253B80]">
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
        <span aria-hidden="true" className="text-[11px] font-extrabold italic tracking-tight text-[#1A1F71]">
            VISA
        </span>
    );
}

const METHODS: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
    { id: "paypal", label: "Paypal", icon: <PaypalMark /> },
    { id: "mastercard", label: "Mastercard", icon: <MastercardMark /> },
    { id: "visa", label: "Visa", icon: <VisaMark /> },
];

/* ---------- Validation ---------- */
function validate(values: PaymentFormValues): FieldErrors {
    const errors: FieldErrors = {};

    if (!values.fullName.trim()) {
        errors.fullName = "Full name is required.";
    } else if (values.fullName.trim().split(/\s+/).length < 2) {
        errors.fullName = "Please enter your first and last name.";
    }

    if (!values.email.trim()) {
        errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Please enter a valid email address.";
    }

    if (!values.validDate) {
        errors.validDate = "Expiry date is required.";
    } else {
        const match = values.validDate.match(/^(\d{2})\/(\d{2})$/);
        if (!match) {
            errors.validDate = "Use MM/YY format.";
        } else {
            const month = parseInt(match[1], 10);
            const year = parseInt("20" + match[2], 10);
            const now = new Date();
            const expiry = new Date(year, month - 1, 1);
            if (month < 1 || month > 12) {
                errors.validDate = "Month must be 01-12.";
            } else if (expiry < new Date(now.getFullYear(), now.getMonth(), 1)) {
                errors.validDate = "Card has expired.";
            }
        }
    }

    if (!values.cvv) {
        errors.cvv = "CVV is required.";
    } else if (!/^\d{3,4}$/.test(values.cvv)) {
        errors.cvv = "CVV must be 3 or 4 digits.";
    }

    return errors;
}

/* ---------- Single input field component ---------- */
interface FieldProps {
    id: string;
    label: string;
    error?: string;
    icon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
    touched?: boolean;
}

export function Field({ id, label, error, icon, trailingIcon, inputProps, touched }: FieldProps) {
    const showError = touched && error;
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-xs font-medium text-slate-600">
                {label}
                {inputProps.required && <span className="ml-1 text-red-500">*</span>}
            </label>
            <div
                className={cn(
                    "relative flex items-center h-12 rounded-xl border bg-white transition-all duration-150",
                    "focus-within:ring-2 focus-within:ring-primary/25 focus-within:border-primary",
                    showError
                        ? "border-red-400 focus-within:ring-red-200 focus-within:border-red-400"
                        : "border-gray-200 hover:border-gray-300"
                )}
            >
                {icon && (
                    <span className="pointer-events-none absolute left-3 flex items-center text-gray-400 [&_svg]:size-4">
                        {icon}
                    </span>
                )}
                <input
                    id={id}
                    className={cn(
                        "h-full w-full bg-transparent text-sm text-slate-800 placeholder:text-gray-400",
                        "outline-none border-0 py-0 focus:ring-0",
                        icon ? "pl-9" : "pl-3.5",
                        trailingIcon || showError ? "pr-9" : "pr-3.5"
                    )}
                    aria-invalid={showError ? "true" : undefined}
                    aria-describedby={showError ? `${id}-error` : undefined}
                    {...inputProps}
                />
                {showError ? (
                    <span className="absolute right-3 flex items-center text-red-400 [&_svg]:size-4">
                        <AlertCircle />
                    </span>
                ) : trailingIcon ? (
                    <span className="pointer-events-none absolute right-3 flex items-center text-gray-400 [&_svg]:size-4">
                        {trailingIcon}
                    </span>
                ) : null}
            </div>
            {showError && (
                <p id={`${id}-error`} role="alert" className="flex items-center gap-1 text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

/* ---------- Success screen ---------- */

/* ---------- Main component ---------- */
export function PaymentMethodForm({ onSubmit, className }: PaymentMethodFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const seats = searchParams?.get("seats") ?? "";
    const passengers = searchParams?.get("passengers") ?? "";

    const [values, setValues] = React.useState<PaymentFormValues>({
        method: "visa",
        fullName: "",
        email: "",
        validDate: "",
        cvv: "",
    });
    const [touched, setTouched] = React.useState<Partial<Record<keyof PaymentFormValues, boolean>>>({});
    const [submitted, setSubmitted] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const errors = validate(values);
    const isValid = Object.keys(errors).length === 0;

    const update = (field: keyof PaymentFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        if (field === "validDate") {
            val = val.replace(/[^\d]/g, "");
            if (val.length > 2) val = val.slice(0, 2) + "/" + val.slice(2, 4);
        }
        if (field === "cvv") {
            val = val.replace(/\D/g, "").slice(0, 4);
        }
        setValues((prev) => ({ ...prev, [field]: val }));
    };

    const touch = (field: keyof PaymentFormValues) => () =>
        setTouched((prev) => ({ ...prev, [field]: true }));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        setTouched(
            Object.fromEntries(Object.keys(values).map((k) => [k, true])) as typeof touched
        );
        if (!isValid) return;
        onSubmit?.(values);
        setSuccess(true);
    };

    if (success) {
        return (
            <div className={cn("w-full max-w-[420px] bg-white px-6 py-10 rounded-2xl shadow-sm", className)}>
                <SuccessScreen onDone={() => router.push("/")} />
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className={cn("w-full max-w-[420px] bg-white px-6 py-8 rounded-2xl shadow-sm", className)}
        >
            <h2 className="mb-1 text-center text-lg font-semibold text-slate-900">Payment method</h2>

            <BookingSummary seats={seats} passengers={passengers} />

            <p className="mb-4 text-sm font-medium text-slate-700">Add your payment method</p>

            {/* Method selector */}
            <div role="radiogroup" aria-label="Payment method" className="mb-6 flex flex-wrap gap-2">
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
                                "flex h-10 items-center gap-2 rounded-full border px-4 text-sm transition-all duration-150",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                                selected
                                    ? "border-primary/30 bg-blue-50 text-primary shadow-sm"
                                    : "border-gray-200 bg-white text-slate-700 hover:bg-gray-50"
                            )}
                        >
                            {icon}
                            <span>{label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="space-y-4">
                <Field
                    id="fullName"
                    label="Full name"
                    icon={<User />}
                    error={errors.fullName}
                    touched={touched.fullName || submitted}
                    inputProps={{
                        name: "fullName",
                        autoComplete: "cc-name",
                        placeholder: "Name on card",
                        value: values.fullName,
                        onChange: update("fullName"),
                        onBlur: touch("fullName"),
                        required: true,
                    }}
                />

                <Field
                    id="email"
                    label="Email address"
                    icon={<Mail />}
                    error={errors.email}
                    touched={touched.email || submitted}
                    inputProps={{
                        name: "email",
                        type: "email",
                        autoComplete: "email",
                        placeholder: "you@example.com",
                        value: values.email,
                        onChange: update("email"),
                        onBlur: touch("email"),
                        required: true,
                    }}
                />

                <div className="grid grid-cols-[1fr_7rem] gap-3">
                    <Field
                        id="validDate"
                        label="Expiry date"
                        icon={<Calendar />}
                        error={errors.validDate}
                        touched={touched.validDate || submitted}
                        inputProps={{
                            name: "validDate",
                            autoComplete: "cc-exp",
                            inputMode: "numeric",
                            placeholder: "MM / YY",
                            maxLength: 5,
                            value: values.validDate,
                            onChange: update("validDate"),
                            onBlur: touch("validDate"),
                            required: true,
                        }}
                    />

                    <Field
                        id="cvv"
                        label="CVV"
                        trailingIcon={<CreditCard />}
                        error={errors.cvv}
                        touched={touched.cvv || submitted}
                        inputProps={{
                            name: "cvv",
                            autoComplete: "cc-csc",
                            inputMode: "numeric",
                            placeholder: "•••",
                            maxLength: 4,
                            value: values.cvv,
                            onChange: update("cvv"),
                            onBlur: touch("cvv"),
                            required: true,
                        }}
                    />
                </div>
            </div>

            <button
                type="submit"
                className={cn(
                    "mt-6 h-12 w-full rounded-xl text-sm font-semibold text-white transition-all duration-150 active:scale-[0.99]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                    submitted && !isValid
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-primary hover:bg-primary/90 shadow-sm hover:shadow-md"
                )}
            >
                Confirm Booking
            </button>

            {submitted && !isValid && (
                <p className="mt-3 text-center text-xs text-red-500">
                    Please fix the errors above before continuing.
                </p>
            )}
        </form>
    );
}

export default PaymentMethodForm;

