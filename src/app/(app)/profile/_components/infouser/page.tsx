import Image from "next/image";
import { getAvatar } from "../../service/infouser.service";



export default async function Infouser() {

const data=await getAvatar()
console.log(data);


  return (
    <section className=" h-[20%] rounded-xl border border-[#3F52B4] p-4 sm:p-6">
      <div className="flex min-w-0 items-center gap-4">
      
    
      
        <Image
          // src="/profileImage.png"
          src={data.avatar_url}
          width={80}
          height={80}
          alt="Knee Due"
          className="size-16 shrink-0 rounded-full object-cover sm:size-20"
        />

        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold sm:text-xl">
            {/* Knee Due */}   {data.name} 
          </h2>
          <span className="block truncate text-sm mt-2 text-gray-500 sm:text-base">
            {/* Kneedue@gmail.com    */}    {data.email}
          </span>
 
 
 
 
        </div>
      </div>
    </section>
  );
}