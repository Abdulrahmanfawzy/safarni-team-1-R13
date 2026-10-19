import Image, { StaticImageData } from "next/image";
import logo from "@/assets/images/logo.svg"
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  image?:StaticImageData;
   imageAlt?: string;
};

export function AuthLayout({image,imageAlt, children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-background">
       
      <div className="grid min-h-screen lg:grid-cols-2 ">
         {/* Left: Image */}
        <section className="hidden lg:flex items-center justify-center p-32 lg:pr-2 ">
          {image &&<Image
            src={image}
            alt={imageAlt ?? ''}
            width={608}
            height={772}
            className="  w-full h-full object-fit"
            priority
          />}
        </section>
 
        {/* Right: Content */}

        <section className="relative flex flex-col items-center justify-center p-6 sm:p-10 lg:pl-0 ">
          <div className="absolute right-6 top-6 sm:right-10">
          <Image src={logo} alt="logo" width={135} height={100} />
        </div>
          <div className="w-full max-w-md mt-8">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}