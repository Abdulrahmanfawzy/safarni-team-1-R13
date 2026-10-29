'use client'
import { Search } from "lucide-react"
import { BackButton } from "./BackButton"
import { Input } from "../ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetHotelsByParams } from "@/hooks/hotels/useGetHotelsBySearchParam";

interface IProps {
pathname:string;
initialSearch?: string;

}

const SearchBar=({pathname,initialSearch=''}:IProps)=> {
    const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();
 const [search, setSearch] = useState(initialSearch);
  const debouncedSearch = useDebounce(search, 400);


  // Keep the input in sync with the URL
  useEffect(() => {
    setSearch(searchParams.get("search") ?? initialSearch);
  }, [searchParams, initialSearch]);

  // Update URL after debounce
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const value = debouncedSearch.trim();

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    const query = params.toString();
    const url = query ? `${currentPath}?${query}` : currentPath;

    if (url !== `${currentPath}?${searchParams.toString()}` &&
        !( !query && !searchParams.toString())) {
      router.replace(url, { scroll: false });
    }
  }, [debouncedSearch, currentPath, router, searchParams]);
  return (
      <div className="app-container flex flex-col items-start gap-3.5 sm:flex-row sm:items-center">
           <BackButton hrefName={pathname}/>
           <Input 
              placeholder="Search..." 
              startIcon={<Search />} 
              className='h-15!' 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              /> 
        </div>
  )
}

export default SearchBar