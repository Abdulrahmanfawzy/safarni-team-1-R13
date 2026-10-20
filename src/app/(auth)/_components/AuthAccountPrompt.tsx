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
    <p className="text-lg font-medium text-gray-900 text-center">
      {message}{" "}
      <Link
        href={href}
        className="text-lg font-semibold leading-5 text-primary"
      >
        {linkText}
      </Link>
    </p>
  );
}
