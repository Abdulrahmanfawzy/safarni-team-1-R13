import Image from "next/image";
import type { CarBrand } from "@/app/(app)/profile/types/cars.types";

const Brands = ({ brands }: { brands: CarBrand[] }) => {
    const uniqueBrands = Array.from(
        brands.reduce((byName, brand) => {
            const key = brand.name.trim().toLowerCase();
            const existing = byName.get(key);
            if (existing) {
                existing.cars_count += brand.cars_count;
            } else {
                byName.set(key, { ...brand });
            }
            return byName;
        }, new Map<string, CarBrand>()).values(),
    );

    return (
        <section className="mt-6 sm:mt-8">
            <h2 className="mb-4 text-center text-xl font-medium text-gray-800 sm:text-left sm:text-[23px]">Brands</h2>
            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
                {uniqueBrands.map((item) => {
                    return (
                        <div key={item.id} className="flex min-w-0 flex-col items-center rounded-lg p-3 text-center shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1)] sm:p-4">
                            {item.logo_url ? (
                                <Image src={item.logo_url} width={45} height={45} alt={`${item.name} logo`} unoptimized />
                            ) : (
                                <div aria-hidden="true" className="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-600">
                                    {item.name.slice(0, 1).toUpperCase()}
                                </div>
                            )}
                            <h3 className="mt-2 w-full truncate text-base text-gray-900 sm:text-lg">{item.name}</h3>
                            <p className="text-sm font-semibold text-primary sm:text-base">{item.cars_count} cars</p>
                        </div>
                    )
                })}
            </div>
        </section>
    );
};
export default Brands;
