
export type FilterMediaAsset = {
  id: number;
  file_url: string;
  is_cover: boolean;
};

export type FilterDestination = {
  id: number;
  name: string;
  country: string;
  icon_url: string | null;
};

export type FilteredTour = {
  id: number;
  title: string;
  slug: string;
  adventure_style: string;
  status: string;
  duration_hours: number;
  base_price: string;
  rating: number;
  reviews_count: number;
  destination: FilterDestination;
  media_assets: FilterMediaAsset[];
};

export type FilterResponse = {
  success: boolean;
  message: string;
  errors: string[];
  data: {
    total_results: number;
    current_page: number;
    last_page: number;
    tours: FilteredTour[];
  };
};
