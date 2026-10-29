import { Suspense } from "react";
import { getFavorites } from "../profile/service/favourite.service";
import FavoriteCard from "@/components/shared/favouritesCard/page";


async function Favorites() {
  const { data } = await getFavorites();

  // console.log( 'favourites' ,  data);

  return (
    <main className="app-container min-h-screen max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-center text-2xl font-bold">Favorites</h1>

      {data.tours.length === 0 ? (
        <p className="text-center">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {data.tours.map((tour) => (
            <FavoriteCard
              key={tour.id}
              id={tour.id}
              serviceType="tour"
            rating={tour.rating}
              title={tour.title}
              adventure_style={tour.adventure_style}
              duration={`${tour.duration_hours} hours`}
              price={tour.base_price}
              pickup_available={tour.pickup_available}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default function FavouritesPage() {
  return (
    <Suspense fallback={<p className="p-8">Loading favorites...</p>}>
      <Favorites />
    </Suspense>
  );
}
