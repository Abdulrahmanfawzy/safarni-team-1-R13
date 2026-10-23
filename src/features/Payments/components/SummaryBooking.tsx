export function BookingSummary({ seats, passengers }: { seats: string; passengers: string }) {
  if (!seats && !passengers) return null;
  return (
    <div className="mb-6 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 text-xs text-blue-700">
      <p className="font-semibold mb-1 text-blue-800">Booking Summary</p>
      {passengers && (
        <p>Passengers: <strong>{passengers}</strong></p>
      )}
      {seats && (
        <p>Seats: <strong>{seats}</strong></p>
      )}
    </div>
  );
}