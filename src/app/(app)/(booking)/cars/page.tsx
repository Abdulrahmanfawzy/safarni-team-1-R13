import Brands from "@/features/Cars/components/Brands";
import PopularCar from "@/features/Cars/components/PopularCar";
import SearchBar from "@/features/search-filter/components/SearchBar";

const Cars = () => {
    return (
        <div className="w-full mx-auto ">
            <main className="container mx-auto max-w-7xl mt-5 ">
                <SearchBar />
                <Brands />
                <PopularCar />
            </main>
        </div>
    );
};

export default Cars;