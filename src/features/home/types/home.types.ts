// {
//     "success": true,
//     "message": "Tours retrieved successfully.",
//     "errors": [],
//     "data": {
//         "items": [
//             {
//                 "id": 31,
//                 "title": "Eiffel Tower",
//                 "slug": "paris-eiffel-tower-city-break",
//                 "duration": 168,
//                 "duration_text": "7 days",
//                 "price": "150.00",
//                 "image": null,
//                 "rating": null,
//                 "reviews_count": 0,
//                 "adventure_style": "cultural"
//             },
//        
//     
//         ],
//       
//     }
// }


export interface Tour {
  id: number;
  title: string;
  slug: string;
  duration: number;
  duration_text: string;
  price: string;
  image: string | null;
  rating: number | null;
  reviews_count: number;
  adventure_style: string;
}

export interface ToursResponse {
  success: boolean;
  message: string;
  errors: string[];
  data: {
    items: Tour[];
  };
}
