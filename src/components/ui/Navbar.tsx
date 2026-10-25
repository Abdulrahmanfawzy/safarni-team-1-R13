"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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

type NavbarUser = {
  name: string;
  avatar?: string;
};

type NavbarProps = {
  user?: NavbarUser | null;
};

function Avatar({ user }: { user: NavbarUser }) {
  return user.avatar ? (
    <Image
      src={user.avatar}
      alt={`${user.name}'s avatar`}
      width={44}
      height={44}
      className="size-11 rounded-full object-cover"
    />
  ) : (
    <span
      aria-hidden="true"
      className="flex size-11 items-center justify-center rounded-full bg-[#1E429F] text-sm font-semibold text-white"
    >
      {user.name.charAt(0).toUpperCase()}
    </span>
  );
}

export default function Navbar({ user }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const pathname = usePathname();

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

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <nav
          className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 py-3 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo */}
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

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#1E429F]",
                    isActive(link.href) ? "text-[#1E429F]" : "text-gray-800",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
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
              <SlidersHorizontal className="size-[18px]" aria-hidden="true" />
            </button>

            {user ? (
              <Link href="/profile" aria-label="Your profile">
                <Avatar user={user} />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-[#1E429F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1E429F]/90"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
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

        {/* Mobile navigation */}
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
                    isActive(link.href) ? "text-[#1E429F]" : "text-gray-700",
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

              {user ? (
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <Avatar user={user} />
                  {user.name}
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-lg bg-[#1E429F] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#1E429F]/90"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Dialogs: خارج الـ header عشان backdrop-blur ميحصرش الـ overlay */}
      <Suspense fallback={null}>
        <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      </Suspense>

      <FiltersDialog open={isFilterOpen} onOpenChange={setIsFilterOpen} />
    </>
  );
}