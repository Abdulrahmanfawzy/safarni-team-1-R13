import Image from "next/image";
import Flight from "@/assets/images/1f333dd2b89d7ab8cf544bc5d5b4878e6d6f2f3c.png";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup } from "@/components/ui/select";
import { SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const SearchFlight = () => {
  const items = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];
  return (
    <section className="w-full h-screen ">
      <main className="w-full h-full flex items-center  justify-evenly ">
        <div className="bg-light-gray  w-[30%] h-[60%] rounded-md">
          <Image src={Flight} alt="" />
        </div>
        <form className="flex flex-col gap-2">
          <label className="text-base text-app-solid-gray font-medium ">
            Location
          </label>
          <Input
            type="text"
            placeholder="Montreal,Canada"
            className="w-full px-4 py-3  "
          />
          <label className="text-base text-app-solid-gray font-medium">
            Destination
          </label>
          <Input
            type="text"
            placeholder="Where to?"
            className="w-full  px-4 py-3 "
          />
          <div className="flex gap-2">
            <label className="text-base text-app-solid-gray font-medium">
              Departure
              <Input
                type="date"
                placeholder="Depart"
                className="w-full px-4 py-3 "
              />
            </label>
            <label className="text-base text-app-solid-gray font-medium">
              Return
              <Input
                type="date"
                placeholder="Return"
                className="w-full px-4 py-3  "
              />
            </label>
          </div>
          <label className="text-base text-app-solid-gray font-medium">
            Passenger
          </label>
          <Select items={items}>
            <SelectTrigger className="w-full py-4">
              <SelectValue placeholder="1 Passenger" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md">
            SearchFlight
          </button>
        </form>
      </main>
    </section>
  );
};
export default SearchFlight;
