


export interface FavoritesData {
 
  tours: FavoriteTour[];
  
}




export interface FavoriteTour {
  id: number
  destination_id: number
  title: string
  slug: string
  adventure_style: string
  status: string
  duration_hours: number
  best_time_to_visit: string | null
  base_price: string
  pickup_available: boolean
  guide_type: string | null
  transportation: any
  cancellation_policy: string | null
  created_at: string
  updated_at: string
  rating:string
  is_favorite: boolean
}


