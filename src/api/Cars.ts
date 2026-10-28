import { CarBrand, CarListItem, CarsApiResponse, CarsListResponse } from "@/app/(app)/profile/types/cars.types";

const getApiBaseUrl = () => {
  const rawApi = process.env.API ;
  return rawApi?.trim().replace(/^["']|["']$/g, "").trim().replace(/\/+$/, "");
};

export default async function RequestCars(limit = 5): Promise<CarsListResponse> {
  const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.floor(limit)) : 5;
  const response = await fetch(
    `${getApiBaseUrl()}/api/cars?limit=${safeLimit}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  const result = (await response.json().catch(() => null)) as CarsApiResponse | null;
  if (!response.ok || result?.success === false) {
    throw new Error(
      result?.message || `Cars request failed (${response.status} ${response.statusText}).`,
    );
  }

  const data = result?.data;
  const cars = Array.isArray(data)
    ? data
    : (data as { cars?: CarListItem[] } | undefined)?.cars ?? result?.cars;
  const brands = Array.isArray(data)
    ? result?.brands
    : (data as { brands?: CarBrand[] } | undefined)?.brands ?? result?.brands;
  if (!Array.isArray(cars)) {
    throw new Error("The cars service returned an unexpected response.");
  }

  return {
    cars,
    brands: Array.isArray(brands) ? brands : [],
  };
}
