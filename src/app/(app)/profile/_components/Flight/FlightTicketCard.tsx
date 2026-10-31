"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import type { Iflight } from "../../types/flight.types";

type Props = {
  flight: Iflight;
  ticketToken: string;
};

const formatTime = (value: string) =>
  new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(new Date(value));

const formatFlightDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));

const getDuration = (start: string, end: string) => {
  const minutes = Math.max(
    0,
    Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000),
  );
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}h${String(minutes % 60).padStart(2, "0")}`;
};

export default function FlightTicketCard({ flight, ticketToken }: Props) {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    const url = new URL(
      `/api/tickets/flights/${flight.id}/pdf`,
      window.location.origin,
    );
    url.searchParams.set("token", ticketToken);
    const value = url.toString();
    setDownloadUrl(value);
    QRCode.toDataURL(value, {
      width: 180,
      margin: 1,
      errorCorrectionLevel: "M",
    }).then(setQrCode).catch(() => setQrCode(""));
  }, [flight.id, ticketToken]);

  return (
    <section className="rounded-lg border border-[#B22459] px-6 py-4 text-xs text-slate-800">
      <div className="grid grid-cols-3 items-center">
        <div>
          <p className="font-medium">✈ Flight</p>
          <p className="mt-3 font-semibold">{formatTime(flight.start_at)}</p>
          <p className="mt-1 text-[10px] text-slate-500">Departure</p>
        </div>
        <div className="text-center text-slate-500">
          <span aria-hidden="true">✈</span>
          <p className="mt-1 text-[10px]">{getDuration(flight.start_at, flight.end_at)}</p>
        </div>
        <div className="text-right">
          <p>{formatFlightDate(flight.end_at)}</p>
          <p className="mt-3 font-semibold">{formatTime(flight.end_at)}</p>
          <p className="mt-1 text-[10px] text-slate-500">Arrival</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-4 border-t pt-3 sm:grid-cols-[1fr_180px]">
        <div>
          <div className="grid grid-cols-2 gap-y-3 text-center sm:grid-cols-4">
            {[
              { value: flight.booking_code, label: "Booking" },
              { value: flight.status, label: "Status" },
              { value: `${flight.adults + flight.children + flight.infants}`, label: "Travelers" },
              { value: `${flight.total_amount} ${flight.currency}`, label: "Total" },
            ].map(({ value, label }) => (
              <div key={label} className="min-w-0 px-1">
                <p className="truncate text-slate-500">{value}</p>
                <p className="mt-1 text-[10px]">{label}</p>
              </div>
            ))}
          </div>
          {downloadUrl && (
            <a
              href={downloadUrl}
              className="mt-4 inline-flex rounded-md bg-[#B22459] px-4 py-2 font-semibold text-white hover:bg-[#921c49]"
            >
              Download ticket PDF
            </a>
          )}
        </div>
        <div className="flex flex-col items-center text-center">
          {qrCode ? (
            // The QR points to the same attachment URL as the download button.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qrCode} alt={`QR code to download ticket ${flight.booking_code}`} width={144} height={144} />
          ) : (
            <div className="h-36 w-36 animate-pulse rounded bg-slate-100" aria-label="Loading ticket QR code" />
          )}
          <p className="mt-1 text-[10px] text-slate-500">Scan to download ticket</p>
        </div>
      </div>
    </section>
  );
}
