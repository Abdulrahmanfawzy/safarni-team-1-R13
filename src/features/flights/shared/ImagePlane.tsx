import Image, { StaticImageData } from "next/image";

const ImagePlane = ({image , className}: {image:StaticImageData | string , className?:string}) => {
    return (
        <div className="flex items-center justify-center w-full max-w-md sm:max-w-lg md:max-w-none md:w-5/12 lg:w-[46%] xl:w-[42%] 2xl:w-[40%] h-48 sm:h-60 md:h-[460px] lg:h-[500px] xl:h-[540px] 2xl:h-[580px] bg-light-gray rounded-2xl md:rounded-3xl p-4 sm:p-6 lg:p-8 shrink-0 overflow-hidden">
            <Image
                src={image}
                alt="Airplane"
                className={`w-full h-full object-contain max-h-47.5 sm:max-h-57.5 md:max-h-none transition-transform duration-500 hover:scale-105 ${className}`}
                priority
            />
        </div>
    );
};

export default ImagePlane;
