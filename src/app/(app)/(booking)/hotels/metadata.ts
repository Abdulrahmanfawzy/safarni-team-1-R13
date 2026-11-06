import type { Metadata } from "next";

export function getHotelsMetadata(search?: string): Metadata {
  const query = search?.trim();
  const title = query ? `Hotels for ${query} | Safarni` : "Explore Hotels | Safarni";
  const description = query
    ? `Explore hotels matching "${query}" and find the right place for your next trip.`
    : "Discover recommended and nearby hotels, compare your options, and find a place for your next trip.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export function getAvailableHotelRoomsMetadata(): Metadata {
  const title = "Available Hotel Rooms | Safarni";
  const description =
    "Browse available rooms, compare nightly prices, and choose the right stay for your trip.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export function getRoomDetailsMetadata(slug: string): Metadata {
  const roomName = slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
  const title = `${roomName || "Room Details"} | Safarni`;
  const description = roomName
    ? `View photos, amenities, and pricing for the ${roomName} room on Safarni.`
    : "View room photos, amenities, and pricing on Safarni.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}
