
export interface HotelRoom {
  id: number;
  room_name: string;
  price_per_night: number;
  discount_rate: number;
  final_price: number;
  beds_count: number;
  bathrooms_count: number;
  max_guests: number;
  area_sqft: number;
  is_refundable: boolean;
  is_favorite: boolean;
  thumbnail_url: string;
}

export interface HotelRoomHotel {
  id: number;
  name: string;
  slug: string;
  city: string;
  address: string;
  stars_count: number;
  discount_rate: number;
  is_favorite: boolean;
  distance_km: number | null;
  cover_photo: string;
}

export interface HotelRoomsResponse {
  code: number;
  message: string;
  data: {
    hotel: HotelRoomHotel;
    rooms: HotelRoom[];
    links: {
      first: string | null;
      last: string | null;
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      from: number | null;
      last_page: number;
      links: {
        url: string | null;
        label: string;
        page: number | null;
        active: boolean;
      }[];
      path: string;
      per_page: number;
      to: number | null;
      total: number;
    };
  };
}
