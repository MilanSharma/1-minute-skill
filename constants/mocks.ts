export const CATEGORIES = [
  { id: '1', name: 'Comedy', icon: 'Smile' },
  { id: '2', name: 'Advice', icon: 'Lightbulb' },
  { id: '3', name: 'Music', icon: 'Music' },
  { id: '4', name: 'Roast', icon: 'Flame' },
  { id: '5', name: 'Love', icon: 'Heart' },
  { id: '6', name: 'Tech', icon: 'Cpu' },
];

export const MOCK_VIDEOS = [
  {
    id: '1',
    creator: {
      id: 'c1',
      name: 'Alex The Comic',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      rating: 4.9,
    },
    title: 'Best pickup line for engineers 🤓',
    category: 'Comedy',
    likes: 1240,
    price: 0.50,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1527022364758-5f28a504d74d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '2',
    creator: {
      id: 'c2',
      name: 'Sarah Sings',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      rating: 5.0,
    },
    title: 'Birthday song in Opera style 🎵',
    category: 'Music',
    likes: 850,
    price: 1.00,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '3',
    creator: {
      id: 'c3',
      name: 'Tech Guru',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      rating: 4.8,
    },
    title: 'React Native vs Flutter in 60s 🚀',
    category: 'Tech',
    likes: 3200,
    price: 0.75,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', // Reusing for mock
    thumbnail: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop'
  },
];
