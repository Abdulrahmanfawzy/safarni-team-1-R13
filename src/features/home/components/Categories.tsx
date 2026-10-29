"use client";

import Image from "next/image";
import Link from "next/link";
import { Cairo } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import { homeApi } from "@/api/home.api";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});

export default function Categories() {
  const {
    data: categories = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["home", "categories"],
    queryFn: async () => {
      const response = await homeApi.getHomeFeed();
      return response.categories ?? [];
    },
  });

  return (
    <section className="py-12">
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          Categories
        </h2>

        {isPending && (
          <p className="py-8 text-center text-muted-foreground">
            Loading categories...
          </p>
        )}

        {isError && (
          <p className="py-8 text-center text-red-600" role="alert">
            Failed to load categories.
          </p>
        )}

        {!isPending && !isError && categories.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">
            No categories available.
          </p>
        )}

        {!isPending && !isError && categories.length > 0 && (
          <div
            className="
              grid grid-cols-1 justify-items-center gap-8 px-4 pb-4
              sm:grid-cols-2 sm:gap-5
              lg:grid-cols-4
            "
          >
            {categories.map((category) => (
              <Link
                href={`/${category.slug ?? category.name.toLowerCase()}`}
                key={category.id}
                className="group flex w-full flex-col items-center gap-6"
              >
                <div
                  className="
                    size-56 overflow-hidden rounded-full shadow-sm
                    ring-2 ring-transparent transition
                    group-focus-visible:ring-(--primary)
                    sm:size-60 lg:size-64
                  "
                >
                  {category.icon_url ? (
                    <Image
                      src={category.icon_url}
                      alt={category.name}
                      width={320}
                      height={320}
                      sizes="(max-width: 640px) 224px, (max-width: 1024px) 240px, 256px"
                      className="
                        size-full rounded-full object-cover
                        transition-transform duration-500
                        group-hover:scale-105
                      "
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center rounded-full bg-muted">
                      <span className="text-5xl font-bold text-muted-foreground">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <h3
                  className={`
                    ${cairo.className}
                    text-center text-3xl font-bold text-(--primary)
                    transition-opacity group-hover:opacity-75
                  `}
                >
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
