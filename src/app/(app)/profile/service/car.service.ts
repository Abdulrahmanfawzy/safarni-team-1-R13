import { getAccessToken } from "@/lib/auth";
import { ICar } from "../types/cars.types";



interface CarResponse {
  success: boolean;
  message: string;
  errors: string[];
  data: {
    car: ICar;
  };
}

export async function getCarDetails(carId: number): Promise<ICar> {
  const baseUrl = process.env.API;
   const token = getAccessToken();
// const token = process.env.TOKEN


  if (!baseUrl) {
    throw new Error("API_BASE_URL is missing from .env.local");
  }

  const response = await fetch(
    `${baseUrl}/cars/${carId}`,
    {
       headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to load car details: ${response.status}`);
  }

  const result = (await response.json()) as CarResponse;

  if (!result.success) {
    throw new Error(result.message || "Failed to load car details");
  }

  return result.data.car;
}