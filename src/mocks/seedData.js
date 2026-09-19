function avatar(name) {
  return `https://ui-avatars.com/api/?background=ff5a36&color=fff&name=${encodeURIComponent(name)}`;
}

function photo(seed) {
  return `https://picsum.photos/seed/${seed}/900/600`;
}

export const SEED_USERS = [
  {
    id: 'u1',
    name: 'Demo User',
    email: 'demo@stayfinder.com',
    password: 'password123',
    avatar: avatar('Demo User'),
  },
];

export const SEED_LISTINGS = [
  {
    id: 'l1', title: 'Sunlit Loft near the Louvre',
    description: 'A bright, minimalist loft two blocks from the Louvre, with original parquet floors and floor-to-ceiling windows.',
    images: [photo('paris-loft-1'), photo('paris-loft-2'), photo('paris-loft-3')],
    location: { city: 'Paris', country: 'France', lat: 48.8606, lng: 2.3376 },
    pricePerNight: 145, rating: 4.9, reviewCount: 128,
    host: { name: 'Camille', avatar: avatar('Camille'), joinedYear: 2018 },
    amenities: ['Wifi', 'Kitchen', 'Washer', 'Workspace'],
    propertyType: 'Apartment', maxGuests: 3,
  },
  {
    id: 'l2', title: 'Montmartre Artist Studio',
    description: 'Cozy studio on a cobblestone street in Montmartre, steps from Sacré-Cœur, filled with vintage furniture.',
    images: [photo('paris-studio-1'), photo('paris-studio-2'), photo('paris-studio-3')],
    location: { city: 'Paris', country: 'France', lat: 48.8867, lng: 2.3431 },
    pricePerNight: 98, rating: 4.7, reviewCount: 76,
    host: { name: 'Étienne', avatar: avatar('Etienne'), joinedYear: 2020 },
    amenities: ['Wifi', 'Kitchen', 'Pet friendly'],
    propertyType: 'Private room', maxGuests: 2,
  },
  {
    id: 'l3', title: 'Brooklyn Brownstone Floor-Through',
    description: 'An entire floor of a classic brownstone in Fort Greene, with a private garden entrance and exposed brick.',
    images: [photo('brooklyn-1'), photo('brooklyn-2'), photo('brooklyn-3')],
    location: { city: 'New York', country: 'USA', lat: 40.6905, lng: -73.9755 },
    pricePerNight: 210, rating: 4.95, reviewCount: 203,
    host: { name: 'Marcus', avatar: avatar('Marcus'), joinedYear: 2016 },
    amenities: ['Wifi', 'Kitchen', 'Air conditioning', 'Washer', 'Workspace'],
    propertyType: 'Entire home', maxGuests: 5,
  },
  {
    id: 'l4', title: 'Manhattan Micro Studio',
    description: 'Efficient, stylish studio in the East Village, perfect as a base for exploring the city on foot.',
    images: [photo('manhattan-1'), photo('manhattan-2'), photo('manhattan-3')],
    location: { city: 'New York', country: 'USA', lat: 40.7265, lng: -73.9815 },
    pricePerNight: 165, rating: 4.6, reviewCount: 54,
    host: { name: 'Priya', avatar: avatar('Priya'), joinedYear: 2021 },
    amenities: ['Wifi', 'Air conditioning'],
    propertyType: 'Entire home', maxGuests: 2,
  },
  {
    id: 'l5', title: 'Shibuya Skyline Apartment',
    description: 'Modern high-rise apartment with panoramic skyline views, a 5-minute walk from Shibuya Crossing.',
    images: [photo('tokyo-1'), photo('tokyo-2'), photo('tokyo-3')],
    location: { city: 'Tokyo', country: 'Japan', lat: 35.6595, lng: 139.7005 },
    pricePerNight: 132, rating: 4.85, reviewCount: 167,
    host: { name: 'Haruto', avatar: avatar('Haruto'), joinedYear: 2019 },
    amenities: ['Wifi', 'Kitchen', 'Air conditioning', 'Workspace'],
    propertyType: 'Apartment', maxGuests: 4,
  },
  {
    id: 'l6', title: 'Traditional Kyoto-style Machiya',
    description: 'A restored wooden townhouse with tatami rooms and a private courtyard garden, near Yanaka.',
    images: [photo('tokyo-machiya-1'), photo('tokyo-machiya-2'), photo('tokyo-machiya-3')],
    location: { city: 'Tokyo', country: 'Japan', lat: 35.7272, lng: 139.7674 },
    pricePerNight: 118, rating: 4.9, reviewCount: 91,
    host: { name: 'Yui', avatar: avatar('Yui'), joinedYear: 2017 },
    amenities: ['Wifi', 'Kitchen', 'Pet friendly'],
    propertyType: 'Entire home', maxGuests: 4,
  },
  {
    id: 'l7', title: 'Camps Bay Beach House',
    description: 'Contemporary home with an infinity pool overlooking Camps Bay beach and Table Mountain.',
    images: [photo('capetown-1'), photo('capetown-2'), photo('capetown-3')],
    location: { city: 'Cape Town', country: 'South Africa', lat: -33.9500, lng: 18.3833 },
    pricePerNight: 240, rating: 4.97, reviewCount: 145,
    host: { name: 'Lindiwe', avatar: avatar('Lindiwe'), joinedYear: 2015 },
    amenities: ['Wifi', 'Kitchen', 'Pool', 'Free parking', 'Air conditioning'],
    propertyType: 'Villa', maxGuests: 8,
  },
  {
    id: 'l8', title: 'Bo-Kaap Colorful Cottage',
    description: 'A cheerful cottage in the historic, brightly-painted Bo-Kaap neighborhood, close to the city center.',
    images: [photo('bokaap-1'), photo('bokaap-2'), photo('bokaap-3')],
    location: { city: 'Cape Town', country: 'South Africa', lat: -33.9181, lng: 18.4133 },
    pricePerNight: 89, rating: 4.75, reviewCount: 62,
    host: { name: 'Johan', avatar: avatar('Johan'), joinedYear: 2020 },
    amenities: ['Wifi', 'Kitchen', 'Workspace'],
    propertyType: 'Entire home', maxGuests: 3,
  },
  {
    id: 'l9', title: 'Bondi Beachfront Apartment',
    description: 'Steps from the sand, this airy apartment has a wraparound balcony facing Bondi Beach.',
    images: [photo('sydney-1'), photo('sydney-2'), photo('sydney-3')],
    location: { city: 'Sydney', country: 'Australia', lat: -33.8908, lng: 151.2743 },
    pricePerNight: 198, rating: 4.88, reviewCount: 134,
    host: { name: 'Olivia', avatar: avatar('Olivia'), joinedYear: 2018 },
    amenities: ['Wifi', 'Kitchen', 'Air conditioning', 'Washer'],
    propertyType: 'Apartment', maxGuests: 4,
  },
  {
    id: 'l10', title: 'Surry Hills Terrace House',
    description: 'A restored Victorian terrace house in trendy Surry Hills, walking distance to cafes and galleries.',
    images: [photo('surryhills-1'), photo('surryhills-2'), photo('surryhills-3')],
    location: { city: 'Sydney', country: 'Australia', lat: -33.8886, lng: 151.2094 },
    pricePerNight: 176, rating: 4.7, reviewCount: 88,
    host: { name: 'Noah', avatar: avatar('Noah'), joinedYear: 2019 },
    amenities: ['Wifi', 'Kitchen', 'Workspace', 'Pet friendly'],
    propertyType: 'Entire home', maxGuests: 5,
  },
  {
    id: 'l11', title: 'Alfama Hillside Apartment',
    description: 'A tiled, sunlit apartment in the oldest district of Lisbon, with tram tracks right outside the door.',
    images: [photo('lisbon-1'), photo('lisbon-2'), photo('lisbon-3')],
    location: { city: 'Lisbon', country: 'Portugal', lat: 38.7139, lng: -9.1301 },
    pricePerNight: 79, rating: 4.8, reviewCount: 112,
    host: { name: 'Mariana', avatar: avatar('Mariana'), joinedYear: 2017 },
    amenities: ['Wifi', 'Kitchen', 'Air conditioning'],
    propertyType: 'Apartment', maxGuests: 3,
  },
  {
    id: 'l12', title: 'Belém Riverside Cabin',
    description: 'A small, design-forward cabin near the Tagus riverfront, a short walk from Belém Tower.',
    images: [photo('lisbon-cabin-1'), photo('lisbon-cabin-2'), photo('lisbon-cabin-3')],
    location: { city: 'Lisbon', country: 'Portugal', lat: 38.6970, lng: -9.2160 },
    pricePerNight: 102, rating: 4.65, reviewCount: 47,
    host: { name: 'Tiago', avatar: avatar('Tiago'), joinedYear: 2021 },
    amenities: ['Wifi', 'Kitchen', 'Free parking', 'Pet friendly'],
    propertyType: 'Cabin', maxGuests: 2,
  },
];

export const SEED_REVIEWS = SEED_LISTINGS.flatMap((listing, i) => [
  {
    id: `${listing.id}-r1`,
    listingId: listing.id,
    author: ['Alex', 'Sam', 'Jordan', 'Riley', 'Morgan', 'Casey'][i % 6],
    rating: 5,
    comment: 'Exactly as described — spotless, well-located, and the host was quick to respond. Would stay again.',
    date: '2026-06-12',
  },
  {
    id: `${listing.id}-r2`,
    listingId: listing.id,
    author: ['Taylor', 'Jamie', 'Drew', 'Avery', 'Quinn', 'Reese'][i % 6],
    rating: 4,
    comment: 'Great stay overall. The neighborhood was a bit noisy at night but everything else was perfect.',
    date: '2026-04-03',
  },
]);
