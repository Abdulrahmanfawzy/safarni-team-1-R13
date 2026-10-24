
import { Button } from "@/components/ui/button";

interface IProps {
  onBack: () => void;
}

export default function RoomBooking({ onBack }: IProps) {
  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={onBack}>
        Back
      </Button>

      <h2 className="text-xl font-semibold">Book Your Room</h2>

      
    </div>
  );
}
