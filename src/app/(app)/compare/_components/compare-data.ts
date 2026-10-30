type CompareItem = {
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
};


export const compareItems: CompareItem[] = [
  {
    id: "1",
    title: "Paris Evening Cruise",
    time: "6:00 PM – 9:00 PM",
    price: 75,
    description: "Enjoy a romantic evening cruise in Paris.",
    image: "/images/compare/cruise.jpg",
    duration: "3 hours",
    highlights: ["Evening cruise", "Available", "Local guide"],
    availability: "Available",
    location: "Seine River",
    transportation: "Walking",
  },
  {
    id: "2",
    title: "Iconic Paris Tour",
    time: "10:00 AM – 1:00 PM",
    price: 75,
    description: "Explore Paris's iconic landmarks.",
    image: "/images/compare/iconic.jpg",
    duration: "3 hours",
    highlights: ["Eiffel Tower", "Available", "Local guide"],
    availability: "Available",
    location: "Central Paris",
    transportation: "Walking",
  },
  {
    id: "3",
    title: "Paris Arts & Culture Tour",
    time: "2:00 PM – 5:00 PM",
    price: 60,
    description: "Discover Parisian art and culture.",
    image: "/images/compare/arts.jpg",
    duration: "3 hours",
    highlights: ["Museums", "Available", "Audio guide"],
    availability: "Available",
    location: "Louvre District",
    transportation: "Walking",
  },
  {
    id: "4",
    title: "Paris Historical Sites",
    time: "9:00 AM – 12:00 PM",
    price: 45,
    description: "Explore the historic landmarks of Paris.",
    image: "/images/compare/history.jpg",
    duration: "3 hours",
    highlights: ["Notre Dame", "Available", "Guided tour"],
    availability: "Available",
    location: "Historic Paris",
    transportation: "Walking",
  },
  {
    id: "5",
    title: "Paris Louvre Museum Tour",
    time: "1:00 PM – 4:00 PM",
    price: 55,
    description: "A guided tour of the Louvre Museum.",
    image: "/images/compare/louvre.jpg",
    duration: "3 hours",
    highlights: ["Louvre Museum", "Available", "Expert guide"],
    availability: "Available",
    location: "Louvre Museum",
    transportation: "Walking",
  },
  {
    id: "6",
    title: "Paris Evening Cruise",
    time: "6:00 PM – 9:00 PM",
    price: 75,
    description: "Enjoy a romantic evening cruise in Paris.",
    image: "/images/compare/cruise.jpg",
    duration: "3 hours",
    highlights: ["Evening cruise", "Available", "Local guide"],
    availability: "Available",
    location: "Seine River",
    transportation: "Walking",
  },
];