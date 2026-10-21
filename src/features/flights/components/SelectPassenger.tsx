import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { passengers } from "../constants/MockData";

const SelectPassenger = ({labelClass}: {labelClass: string}) => {
    
    return ( 
        <> 

         <label className={labelClass}>Passenger</label>
                        <Select items={passengers} defaultValue="1">
                          <SelectTrigger className="w-full h-11 sm:h-12 text-xs sm:text-sm rounded-xl px-3 bg-background border-border/80 focus-visible:border-primary transition-all">
                            <SelectValue placeholder="1 Passenger" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {passengers.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        </>
    )
}
export default SelectPassenger