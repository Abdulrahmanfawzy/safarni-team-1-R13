import Image from "next/image";
import { BrandsData } from "../constants/DataCars";
const Brands = () => {
    return (
        <div className="mt-6 ">
            <h1 className="mb-4 text-[23px] font-medium text-gray-800 text-center md-text-start "> Brands</h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-7 gap-18">
                {BrandsData.map((item) => {
                    return (
                        <div key={item.id} className="flex w-full flex-col items-center shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1)] rounded-lg p-4 w-[200px] ">
                            <Image src={item.image} width={45} height={45} alt={item.name} />
                            <h2 className="font-normai text-[20px] text-gray-900">{item.name}</h2>
                            <p className="text-[17px] font-semibold text-primary">{item.quntatiy}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
export default Brands;   