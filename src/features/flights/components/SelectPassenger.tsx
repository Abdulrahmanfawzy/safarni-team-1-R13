import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { passengers } from "../constants/MockData";

interface SelectPassengerProps {
  labelClass?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const SelectPassenger = ({
  labelClass,
  value = "1",
  onValueChange,
}: SelectPassengerProps) => {
  return ( 
    <> 
      <label className={labelClass}>Passenger</label>
      <Select
        items={passengers}
        value={value}
        onValueChange={(val) => {
          if (val) onValueChange?.(String(val));
        }}
      >
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
  );
};
export default SelectPassenger;