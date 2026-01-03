export interface Attraction {
  slug: string
  name: string
  icon: string
  category: 'temples' | 'cultural' | 'heritage' | 'spiritual'
  shortDescription: string
  description: string
  timings?: string
  location?: string
  entryFee?: string
  guidedTourCost?: string
  phone?: string
  bestTimeToVisit?: string
  tags: string[]
  highlights?: string[]
  faqs?: Array<{ question: string; answer: string }>
}

export const attractions: Attraction[] = [
  {
    slug: 'ram-mandir',
    name: 'Ram Mandir',
    icon: 'Building2',
    category: 'temples',
    shortDescription: 'The magnificent newly constructed temple dedicated to Lord Ram, featuring stunning architecture and spiritual significance.',
    description:
      'Ram Mandir stands as one of the most important temples in Ayodhya, believed to be the birthplace of Lord Ram. The newly constructed temple showcases magnificent North Indian architectural style with intricate marble work and spiritual grandeur. Pilgrims from around the world visit to seek blessings and experience profound spiritual moments.',
    timings: '4:30 AM - 12:00 PM, 1:00 PM - 9:00 PM',
    location: 'Ram Path, Ayodhya',
    entryFee: 'Free',
    guidedTourCost: '₹500-800 per person',
    phone: '+91-555-0101',
    bestTimeToVisit: 'October to March (cool weather)',
    tags: ['Temple', 'Pilgrimage', 'Architecture'],
    highlights: [
      'Stunning marble architecture',
      'Inner sanctum with Ram idol',
      'Multiple darshan queues',
      'Evening aarti ceremony',
      'Ayodhya Museum on premises',
    ],
    faqs: [
      {
        question: 'What are the best times to visit Ram Mandir?',
        answer:
          'Early mornings (4:30-7:00 AM) and evenings (6:00-9:00 PM) are ideal. Avoid peak hours during festivals and holidays.',
      },
      {
        question: 'Is photography allowed inside the temple?',
        answer:
          'Photography is restricted in certain areas. Follow the instructions of temple authorities and guides.',
      },
      {
        question: 'How long does the darshan usually take?',
        answer: 'During normal days, it takes 30 minutes to 2 hours depending on crowds. Plan accordingly.',
      },
    ],
  },
  {
    slug: 'hanuman-garhi',
    name: 'Hanuman Garhi',
    icon: 'Mountain',
    category: 'spiritual',
    shortDescription: 'An elevated temple dedicated to Hanuman, requiring a climb of 76 steps, offering panoramic views of Ayodhya.',
    description:
      'Hanuman Garhi is an ancient temple perched on an elevated platform, accessible through 76 steps. The temple is dedicated to Hanuman and holds immense spiritual significance. The location offers panoramic views of Ayodhya and is a favorite among devotees seeking blessings and spiritual peace.',
    timings: '6:00 AM - 12:00 PM, 3:00 PM - 8:00 PM',
    location: 'Ramkot, Ayodhya',
    entryFee: 'Free',
    guidedTourCost: '₹300-500 per person',
    phone: '+91-555-0102',
    bestTimeToVisit: 'November to February',
    tags: ['Temple', 'Spiritual', 'Scenic Views'],
    highlights: [
      '76-step spiral staircase',
      'Elevated temple with city views',
      'Ancient architecture',
      'Hanuman deity worship',
      'Peaceful spiritual atmosphere',
    ],
    faqs: [
      {
        question: 'Is there any difficulty climbing the 76 steps?',
        answer:
          'The steps are manageable for most people. However, elderly or physically challenged visitors should consider assistance.',
      },
      {
        question: 'What makes Hanuman Garhi spiritually significant?',
        answer:
          'It is believed to be an ancient seat of Hanuman worship and provides direct access to divine blessings.',
      },
    ],
  },
  {
    slug: 'kanak-bhawan',
    name: 'Kanak Bhawan',
    icon: 'Crown',
    category: 'temples',
    shortDescription: 'A historic temple believed to be the first constructed in Ayodhya with golden architecture and intricate designs.',
    description:
      'Kanak Bhawan is a revered temple believed to have been constructed first in Ayodhya. The temple features distinctive golden architecture and intricate stone work. It is traditionally associated with the marriage festivities of Lord Ram and is considered one of the most ornate temples in the city.',
    timings: '5:00 AM - 11:30 AM, 3:00 PM - 8:30 PM',
    location: 'Ghat Road, Ayodhya',
    entryFee: 'Free',
    guidedTourCost: '₹400-600 per person',
    phone: '+91-555-0103',
    bestTimeToVisit: 'October to March',
    tags: ['Temple', 'Historic', 'Architecture'],
    highlights: [
      'Golden temple exterior',
      'Intricate marble inlay work',
      'Historic significance',
      'Ram-Sita story connection',
      'Beautiful courtyard',
    ],
    faqs: [
      {
        question: 'What is the historical significance of Kanak Bhawan?',
        answer:
          'It is believed to be the first temple constructed in Ayodhya and holds deep historical and spiritual importance.',
      },
    ],
  },
  {
    slug: 'nageshwarnath-temple',
    name: 'Nageshwarnath Temple',
    icon: 'Building2',
    category: 'spiritual',
    shortDescription: 'An ancient Shiva temple with sacred serpent symbolism, representing spiritual power and divine energy.',
    description:
      'Nageshwarnath Temple is an ancient sacred site dedicated to Lord Shiva in the serpent form. The temple represents the unity of Shaivism and features unique architecture with serpent motifs. It is a powerful spiritual center where devotees come to seek blessings and spiritual awakening.',
    timings: '6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM',
    location: 'Ayodhya',
    entryFee: 'Free',
    guidedTourCost: '₹300-450 per person',
    bestTimeToVisit: 'Year-round',
    tags: ['Temple', 'Shiva Worship', 'Ancient'],
    highlights: [
      'Ancient Shiva lingam',
      'Serpent symbolism',
      'Spiritual energy center',
      'Unique architecture',
      'Nag Panchami celebrations',
    ],
  },
  {
    slug: 'tulsi-das-birthplace',
    name: 'Tulsi Das Birthplace',
    icon: 'BookOpen',
    category: 'cultural',
    shortDescription: 'The birthplace of saint Tulsi Das, composer of Ramcharitmanas, celebrating literary and spiritual heritage.',
    description:
      'This historic site marks the birthplace of the great saint and poet Tulsi Das, who composed the Ramcharitmanas. The location preserves the cultural and literary heritage of Ayodhya and serves as a pilgrimage site for those interested in spiritual literature and cultural history.',
    timings: '7:00 AM - 6:00 PM',
    location: 'Rajapur, Ayodhya',
    entryFee: 'Free',
    guidedTourCost: '₹250-400 per person',
    phone: '+91-555-0105',
    bestTimeToVisit: 'October to March',
    tags: ['Cultural', 'Literary Heritage', 'Historical'],
    highlights: [
      'Birthplace of Tulsi Das',
      'Ramcharitmanas manuscripts',
      'Cultural heritage site',
      'Literary significance',
      'Historical artifacts',
    ],
    faqs: [
      {
        question: 'Who was Tulsi Das?',
        answer:
          'Tulsi Das was a great saint and poet who wrote the Ramcharitmanas, a major religious text in Hinduism.',
      },
    ],
  },
  {
    slug: 'ghat-ghats',
    name: 'Sacred Ghats',
    icon: 'Waves',
    category: 'heritage',
    shortDescription: 'Historic riverfront ghats along the Sarayu River, centers of spiritual rituals and devotional activities.',
    description:
      'The Sacred Ghats of Ayodhya along the Sarayu River are centers of spiritual significance and ritual importance. These ghats witness daily prayers, rituals, and ceremonial activities. The riverfront is a place of profound spiritual connection where pilgrims perform ablutions and meditate.',
    timings: '5:00 AM - 9:00 PM',
    location: 'Sarayu Riverfront, Ayodhya',
    entryFee: 'Free',
    guidedTourCost: '₹300-500 per person',
    bestTimeToVisit: 'October to March (cooler weather)',
    tags: ['Heritage', 'Spiritual', 'Natural'],
    highlights: [
      'Sacred river rituals',
      'Aarti ceremonies',
      'Spiritual meditation sites',
      'Historical significance',
      'Panoramic river views',
    ],
    faqs: [
      {
        question: 'What rituals are performed at the ghats?',
        answer:
          'Pilgrims perform sacred rituals, take ritual baths, and participate in evening aarti ceremonies celebrating divine connection.',
      },
    ],
  },
]
