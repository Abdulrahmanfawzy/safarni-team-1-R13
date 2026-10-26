import { CircleCheck } from "lucide-react";
interface PasswordRequirementsProps {
  password: string;
}

export function PasswordRequirements({password}: PasswordRequirementsProps) {
  const requirements = [
  {
      id: "length",
      label: "must be at least 8 characters",
      isValid: password.length >= 8,
    },
    {
      id: "special",
      label: "must contain one special character",
      isValid: /[^A-Za-z0-9]/.test(password),
    },
];

  return (
    <ul className="space-y-3 sm:space-y-4">
      {requirements.map((requirement) => (
        <li key={requirement.id} className="flex items-center gap-2">
          <CircleCheck
            aria-hidden="true"
             className={`h-5 w-5 shrink-0 ${
              requirement.isValid
                ? "fill-green-500 text-white"
                : "fill-gray-400 text-white"
            }`}
          />
          <span
            className={`text-sm leading-[140%] capitalize sm:text-base ${
              requirement.isValid
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            {requirement.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
