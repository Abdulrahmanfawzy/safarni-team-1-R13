
export interface CompareTour {
  id: number;
  image: string;
  title: string;
  time_range: string | null;
  price: number;
  price_label: string;
  schedule_line: string;
  description: string;
}

export interface CompareToursResponse {
  success: boolean;
  message: string;
  errors: string[];
  data: {
    items: CompareTour[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
    };
  };
}
// -------------------------------------------
// Compare API Response

export interface CompareFeature {
  key: string;
  label: string;
  value: string;
}

export interface ComparedTour {
  id: number;
  title: string;
  price: number;
  price_label: string;
  price_unit: string;
  next_schedule_id: number;
  features: CompareFeature[];
}

export interface CompareResponse {
  success: boolean;
  message: string;
  errors: string[];
  data: {
    max_items: number;
    items: ComparedTour[];
  };
}

// Compare API Request

export interface CompareRequest {
  tour_ids: number[];
}