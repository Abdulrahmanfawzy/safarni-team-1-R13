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
        <div className="mt-6 ">
            <h1 className="mb-4 text-[23px] font-medium text-gray-800 text-center md-text-start "> Brands</h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-7 gap-18">
                {uniqueBrands.map((item) => {
                    return (
                        <div key={item.id} className="flex w-full flex-col items-center shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1)] rounded-lg p-4 w-[200px] ">
                            {item.logo_url ? (
                                <Image src={item.logo_url} width={45} height={45} alt={`${item.name} logo`} unoptimized />
                            ) : (
                                <div aria-hidden="true" className="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-600">
                                    {item.name.slice(0, 1).toUpperCase()}
                                </div>
                            )}
                            <h2 className="font-normai text-[20px] text-gray-900">{item.name}</h2>
                            <p className="text-[17px] font-semibold text-primary">{item.cars_count} cars</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
export default Brands;
