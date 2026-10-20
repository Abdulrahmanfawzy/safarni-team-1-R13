


type SecurityActionCardProps = {
  title: string;
  description: string;
  variant?: "default" | "danger";
  onClick?: () => void;
};

export default function SecurityActionCard({
  title,
  description,
  variant = "default",
  onClick,
}: SecurityActionCardProps) {
  const isDanger = variant === "danger";

  return (


    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl bg-white px-3 py-3 text-left shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
    >
      <span>
        <span
          className={`block font-medium ${
            isDanger ? "text-red-500" : "text-slate-800"
          }`}
        >
          {title}
        </span>

        <span className="mt-1 block text-xs text-slate-500">
          {description}
        </span>
      </span>

      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="ml-4 size-4 shrink-0 text-slate-500"
      >
        <path
          d="m9 18 6-6-6-6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
}