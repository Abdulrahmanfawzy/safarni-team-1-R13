"use client";

import * as React from "react";
import { useEffect } from "react";
import L from "leaflet";
import { LocateFixed } from "lucide-react";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export type LatLng = [number, number];

export interface MapViewProps {
  route: LatLng[];
  etaLabel?: string;
  className?: string;
}

const originIcon = L.divIcon({
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  html: `<div style="width:0;height:0;border-left:9px solid transparent;border-right:9px solid transparent;border-bottom:18px solid #16a34a;margin:3px;filter:drop-shadow(0 1px 2px rgba(0,0,0,.35))"></div>`,
});

function destinationIcon(label: string) {
  return L.divIcon({
    className: "",
    iconSize: [60, 50],
    iconAnchor: [30, 44],
    html: `
      <div class="flex flex-col items-center">
        <span class="rounded bg-[#4b4bf0] px-2 py-0.5 text-[11px] font-medium text-white shadow">${label}</span>
        <span class="-mt-px h-0 w-0 border-x-4 border-t-4 border-x-transparent border-t-[#4b4bf0]"></span>
        <span class="mt-0.5 block h-3.5 w-3.5 rounded-full border-2 border-white bg-orange-400 shadow"></span>
      </div>`,
  });
}

function FitRoute({ route }: { route: LatLng[] }) {
  const map = useMap();
  useEffect(() => {
    if (route.length > 1) {
      map.fitBounds(L.latLngBounds(route), { padding: [60, 60] });
    }
  }, [map, route]);
  return null;
}

function LocateButton({ route }: { route: LatLng[] }) {
  const map = useMap();
  return (
    <button
      type="button"
      aria-label="Center on route"
      onClick={() => map.fitBounds(L.latLngBounds(route), { padding: [60, 60] })}
      className="absolute right-4 top-24 z-[1000] flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
    >
      <LocateFixed className="h-4 w-4" />
    </button>
  );
}

export default function MapView({ route, etaLabel = "5 min", className }: MapViewProps) {
  const origin = route[0];
  const destination = route[route.length - 1];
  const [roadRoute, setRoadRoute] = React.useState<LatLng[]>(route);
  const [eta, setEta] = React.useState(etaLabel);

  React.useEffect(() => {
    const controller = new AbortController();
    const url = `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`;

    fetch(url, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Route request failed");
        return response.json();
      })
      .then((result: { routes?: Array<{ geometry?: { coordinates?: number[][] }; duration?: number }> }) => {
        const selectedRoute = result.routes?.[0];
        const coordinates = selectedRoute?.geometry?.coordinates;
        if (!coordinates?.length) return;
        setRoadRoute(coordinates.map(([longitude, latitude]) => [latitude, longitude] as LatLng));
        if (typeof selectedRoute.duration === "number") {
          setEta(`${Math.max(1, Math.round(selectedRoute.duration / 60))} min`);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setEta("Route unavailable");
      });

    return () => controller.abort();
  }, [origin[0], origin[1], destination[0], destination[1]]);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={origin}
        zoom={16}
        zoomControl={false}
        scrollWheelZoom
        className={className ?? "h-full w-full"}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
          positions={roadRoute}
          pathOptions={{ color: "#f97316", weight: 5, lineJoin: "round", lineCap: "round" }}
        />
        <Marker position={origin} icon={originIcon} />
        <Marker position={destination} icon={destinationIcon("Car")} />
        <FitRoute route={roadRoute} />
        <LocateButton route={roadRoute} />
      </MapContainer>
      <div className="pointer-events-none absolute left-1/2 top-24 z-[1000] -translate-x-1/2 rounded-lg bg-[#4b4bf0] px-4 py-2 text-sm font-semibold text-white shadow-md">
        {eta}
      </div>
    </div>
  );
}
