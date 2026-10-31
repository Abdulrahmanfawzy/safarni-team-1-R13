import { Suspense } from "react";

import { getFavorites } from "../profile/service/favourite.service";
import FavoriteCard from "../../../components/shared/FavouritesCard/page";

export default async function Favorites() {
  const data = await getFavorites();

  console.log("fav", data);

  const favorites = [
    ...data.tours.map((tour) => ({
      id: tour.id,
      serviceType: "tour" as const,
      title: tour.title,
      subtitle: tour.adventure_style,
      duration: `${tour.duration_hours} hours`,
      image: tour.image,
      price: tour.base_price,
      rating: tour.rating,
    })),
    ...data.hotels.map((hotel) => ({
      id: hotel.id,
      serviceType: "hotel" as const,
      title: hotel.name,
      image: hotel.image,
      subtitle: hotel.address,
      duration: undefined,
      price: hotel.discount_rate,
      rating: hotel.stars_count,
    })),
    ...data.cars.map((car) => ({
      id: car.id,
      serviceType: "car" as const,
      title: car.model,
      image: car.image,
      subtitle: car.body_type,
      duration: undefined,
      price: car.daily_rate,
      rating: car.rating,
    })),
    ...data.flights.map((flight) => ({
      id: flight.id,
      serviceType: "flight" as const,
      title: flight.flight_number,
      subtitle: `${flight.origin_airport_id} → ${flight.dest_airport_id}`,
      duration: undefined,
      image: flight.image,
      price: undefined,
      rating: undefined,
    })),
  ];

  return (
    <main className="app-container min-h-screen max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-center text-2xl font-bold">Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-center">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {favorites.map((favorite) => (
            <FavoriteCard
              key={`${favorite.serviceType}-${favorite.id}`}
              id={favorite.id}
              serviceType={favorite.serviceType}
              image={favorite.image}
              title={favorite.title}
              adventure_style={favorite.subtitle}
              duration={favorite.duration}
              price={favorite.price}
              rating={favorite.rating}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export function FavouritesPage() {
  return (
    <Suspense fallback={<p className="p-8">Loading favorites...</p>}>
      <Favorites />
    </Suspense>
  );
}
