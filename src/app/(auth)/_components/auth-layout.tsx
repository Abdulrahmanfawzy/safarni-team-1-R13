import Image, { StaticImageData } from "next/image";
import logo from "@/assets/images/logo.svg"
import type { ReactNode } from "react";
import { BackButton } from "../../../components/shared/BackButton";

type AuthLayoutProps = {
  children: ReactNode;
  image?:StaticImageData;
  imageAlt?: string;
  hasIcon?:boolean;
  href?:string;
};

export function AuthLayout({image,imageAlt, children,hasIcon,href }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-background ">
      {hasIcon && href && (
        <div className="absolute left-4 top-4 z-10 sm:left-8 sm:top-8 lg:left-41 lg:top-15">
          <BackButton hrefName={href} />
        </div>
      )}
      <div className="grid min-h-screen lg:grid-cols-2">
         {/* Left: Image */}
        <section className="hidden items-start justify-center p-32 lg:flex lg:flex-col lg:pr-0">
          {image && <Image
            src={image}
            alt={imageAlt ?? ''}
            width={608}
            height={672}
            className="h-full w-full object-contain"
            priority
          />}
        </section>
 
        {/* Right: Content */}

        <section className="relative flex min-h-screen flex-col items-center gap-3 justify-start px-6 pb-8 pt-28 sm:px-10 sm:pb-10 sm:pt-32 lg:justify-center lg:pl-0 lg:pt-10">
          <div className="absolute right-4 top-4 z-10 sm:right-8 sm:top-8">
            <Image
              src={logo}
              alt="Safarni"
              width={100}
              height={84}
              className="h-auto w-25 "
              priority
            />
          </div>
          <div className="w-full max-w-md">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}