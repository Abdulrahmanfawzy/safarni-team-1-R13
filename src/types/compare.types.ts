
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


// --checkout

export interface TourCheckoutRequest {
  full_name: string;
  email: string;
  payment_method: "visa";
}

export interface TourCheckoutResponse {
  success: boolean;
  message: string;
  errors: string[];
  data: {
    booking_id: number;
    booking_code: string;
    status: string;

    tour: {
      id: number;
      title: string;
    };

    schedule: {
      id: number;
      start_at: string;
      end_at: string;
    };

    pricing: {
      currency: string;
      lines: {
        type: string;
        label: string;
        quantity: number;
        unit_price: number;
        subtotal: number;
      }[];
      subtotal: number;
      discount: number;
      total: number;
      total_cents: number;
    };

    payment: {
      id: number;
      gateway: string;
      provider: string;
      method: string;
      status: string;
      amount: number;
      currency: string;
      session_id: string;
      checkout_url: string;
      transaction_ref: string;
    };

    expires_at: string;
  };
}
