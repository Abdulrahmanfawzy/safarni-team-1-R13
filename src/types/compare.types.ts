export interface CompareItem {
  id: string;
  title: string;
  time: string;
  price: number;
  description: string;
  image: string;
  duration: string;
  highlights: string[];
  availability: string;
  location: string;
  transportation: string;
}
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