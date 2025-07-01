import { Property } from '../types';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    price: 750000,
    address: 'Avenida Atlântica, 1500',
    city: 'Rio de Janeiro',
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    description: 'Stunning modern villa with ocean views, featuring an open concept living area, gourmet kitchen, and private pool.',
    features: ['Swimming Pool', 'Garden', 'Garage', 'Security System', 'Air Conditioning'],
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg'
    ],
    type: 'sale',
    featured: true
  },
  {
    id: '2',
    title: 'Downtown Apartment',
    price: 2500,
    address: 'Rua Augusta, 789',
    city: 'São Paulo',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    description: 'Modern apartment in the heart of the city, close to restaurants, shopping, and public transportation.',
    features: ['Elevator', 'Gym', 'Security', 'Balcony'],
    images: [
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'
    ],
    type: 'rent',
    featured: true
  },
  {
    id: '3',
    title: 'Countryside Retreat',
    price: 450000,
    address: 'Estrada do Sol, 45',
    city: 'Gramado',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    description: 'Charming countryside home surrounded by nature, perfect for those seeking peace and tranquility.',
    features: ['Fireplace', 'Large Garden', 'Mountain View', 'Wooden Deck'],
    images: [
      'https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg',
      'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg',
      'https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg'
    ],
    type: 'sale',
    featured: false
  },
  {
    id: '4',
    title: 'Beachfront Condo',
    price: 3800,
    address: 'Avenida Beira-Mar, 500',
    city: 'Florianópolis',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    description: 'Luxurious beachfront condo with stunning ocean views, modern amenities, and direct beach access.',
    features: ['Ocean View', 'Pool', 'Gym', 'Private Beach Access', '24/7 Security'],
    images: [
      'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
      'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg'
    ],
    type: 'rent',
    featured: true
  },
  {
    id: '5',
    title: 'Historic Townhouse',
    price: 580000,
    address: 'Rua das Flores, 123',
    city: 'Ouro Preto',
    bedrooms: 4,
    bathrooms: 3,
    area: 210,
    description: 'Beautifully preserved historic townhouse in the charming old city, featuring original architectural details and modern updates.',
    features: ['Historic Property', 'Original Details', 'Courtyard', 'Updated Kitchen'],
    images: [
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
      'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg'
    ],
    type: 'sale',
    featured: false
  },
  {
    id: '6',
    title: 'Modern Studio Apartment',
    price: 1800,
    address: 'Rua Paulista, 1000',
    city: 'São Paulo',
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    description: 'Contemporary studio apartment with smart layout, perfect for young professionals working in the city.',
    features: ['Smart Home System', 'Concierge', 'Rooftop Lounge', 'Bike Storage'],
    images: [
      'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg',
      'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg',
      'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg'
    ],
    type: 'rent',
    featured: false
  }
];