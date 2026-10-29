import { getHotelsByParamsAction } from "@/actions/hotels";
import { useQuery } from "@tanstack/react-query";


export function useGetHotelsByParams(search: string){
      const trimmedSearch = search.trim();

    return useQuery({
        queryKey:['hotels','search',trimmedSearch],
        queryFn:()=> getHotelsByParamsAction(trimmedSearch),
        enabled:Boolean(trimmedSearch),


    })
}