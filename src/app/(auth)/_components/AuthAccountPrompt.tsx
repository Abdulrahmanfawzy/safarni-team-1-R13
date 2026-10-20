import Link from "next/link";

type AuthAccountPromptProps = {
  message: string;
  linkText: string;
  href: string;
};

export function AuthAccountPrompt({
  message,
  linkText,
  href,
}: AuthAccountPromptProps) {
  return (
    <p className="text-center text-sm font-medium text-gray-900 sm:text-base">
      {message}{" "}
      <Link
        href={href}
        className="font-semibold text-primary"
      >
        {linkText}
      </Link>
    </p>
  );
}
