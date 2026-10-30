
"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Menu, Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/images/logo.svg";
import SearchDialog from "@/features/search-filter/components/SearchDialog";
import FiltersDialog from "@/features/search-filter/components/FiltersDialog";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Favorite", href: "/favourites" },
  { label: "Compare", href: "/compare" },
  { label: "Maps", href: "/maps" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const pathname = usePathname();
  const { status, data: session } = useSession();

  const isAuthenticated = status === "authenticated";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openSearchDialog = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(true);
  };

  const openFilterDialog = () => {
    setIsMenuOpen(false);
    setIsFilterOpen(true);
  };

  const profileName = session?.user?.name || "Profile";
  const avatar = (session?.user as { image?: string | null } | undefined)?.image;

  const authLinks = (
    <>
      {isAuthenticated ? (
        <Link
          href="/profile"
          aria-label="Your profile"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
          onClick={() => setIsMenuOpen(false)}
        >
          {avatar ? (
            <Image
              src={avatar}
              alt={`${profileName}'s avatar`}
              width={36}
              height={36}
              className="size-9 rounded-full object-cover"
            />
          ) : (
            <span className="flex size-9 items-center justify-center rounded-full bg-[#1E429F] text-sm font-semibold text-white">
              {profileName.charAt(0).toUpperCase()}
            </span>
          )}
          <span>Profile</span>
        </Link>
      ) : (
        <>
          <Link
            href="/login"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-lg bg-[#1E429F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1E429F]/90"
          >
            Sign up
          </Link>
        </>
      )}
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <nav
          className="grid grid-cols-[1fr_auto_1fr] items-center py-3"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center justify-self-start"
            aria-label="Safarni Home"
          >
            <Image
              src={logo}
              alt="Safarni logo"
              width={70}
              height={80}
              priority
              className="h-20 w-auto object-contain"
            />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#1E429F]",
                    isActive(link.href)
                      ? "text-[#1E429F]"
                      : "text-gray-800",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 justify-self-end md:flex">
            <button
              type="button"
              onClick={openSearchDialog}
              aria-label="Search"
              className="text-gray-600 transition-colors hover:text-[#1E429F]"
            >
              <Search className="size-[18px]" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={openFilterDialog}
              aria-label="Filters"
              className="text-gray-600 transition-colors hover:text-[#1E429F]"
            >
              <SlidersHorizontal
                className="size-[18px]"
                aria-hidden="true"
              />
            </button>

            {status !== "loading" && authLinks}
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="col-start-3 justify-self-end rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              <X className="size-6" aria-hidden="true" />
            ) : (
              <Menu className="size-6" aria-hidden="true" />
            )}
          </button>
        </nav>

        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-gray-100 bg-white px-4 py-4 md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50",
                    isActive(link.href)
                      ? "text-[#1E429F]"
                      : "text-gray-700",
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <button
                type="button"
                onClick={openSearchDialog}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Search className="size-4" aria-hidden="true" />
                Search
              </button>

              <button
                type="button"
                onClick={openFilterDialog}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <SlidersHorizontal className="size-4" aria-hidden="true" />
                Filters
              </button>

              <div className="my-2 border-t border-gray-100" />

              {status !== "loading" && (
                <div className="flex flex-col gap-2">{authLinks}</div>
              )}
            </div>
          </div>
        )}
      </header>

      <Suspense fallback={null}>
        <SearchDialog
          open={isSearchOpen}
          onOpenChange={setIsSearchOpen}
        />
      </Suspense>

      <FiltersDialog
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
      />
    </>
  );
}
