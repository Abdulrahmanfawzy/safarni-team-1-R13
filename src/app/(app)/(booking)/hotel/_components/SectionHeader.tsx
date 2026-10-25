import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  viewAllHref: string;
}

export default function SectionHeader({
  title,
  viewAllHref,
}: SectionHeaderProps) {
  return (
    <div className="mt-4 mx-5 flex items-center justify-between">
      <h2 className="text-xl font-medium text-slate-900 leading-[100%] capitalize">
        {title}
      </h2>

      <Link
        href={viewAllHref}
        className="text-lg font-medium text-[#1E429F] hover:text-blue-900"
      >
        View all
      </Link>
    </div>
  );
}