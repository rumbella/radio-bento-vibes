export interface Track {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  imageUrl?: string;
  duration?: string;
  listenCount?: number;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  tracks: Track[];
  imageUrl?: string; // Optional playlist cover art
}

export const mockPlaylists: Playlist[] = [
  {
    id: "playlist1",
    name: "Radio Amblé Daily Hits",
    description: "Today's top tracks and fresh sounds from Radio Amblé.",
    imageUrl: "https://placehold.co/300x300/FFA500/FFFFFF/png?text=Daily+Hits",
    tracks: [
      {
        id: "track1",
        title: "Stay Forever",
        artist: "Poets of the Fall",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        imageUrl: "https://i.scdn.co/image/ab67616d00004851f53434b3e035a4a5dc5127f8",
        duration: "3:43",
        listenCount: 198000,
      },
      {
        id: "track2",
        title: "Turn Around",
        artist: "Early Winters",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        imageUrl: "https://i.scdn.co/image/ab67616d00004851c9a3c396c4597b415174f475",
        duration: "4:04",
        listenCount: 122000,
      },
      {
        id: "track3",
        title: "Colour Me In",
        artist: "Damien Rice",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        imageUrl: "https://i.scdn.co/image/ab67616d00004851ff13136206c6ad10597371f6",
        duration: "5:18",
        listenCount: 98000,
      },
      {
        id: "track4",
        title: "Hypnotic",
        artist: "Zella Day",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        imageUrl: "https://i.scdn.co/image/ab67616d000048511392e2815f376f989d532822",
        duration: "3:34",
        listenCount: 94000,
      },
    ],
  },
  {
    id: "playlist2",
    name: "Ambient Chill Zone",
    description: "Relax and unwind with these soothing ambient tracks.",
    imageUrl: "https://placehold.co/300x300/00CED1/FFFFFF/png?text=Chill+Zone",
    tracks: [
      {
        id: "track5",
        title: "Floating Worlds",
        artist: "Atmos",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        imageUrl: "https://placehold.co/100x100/20B2AA/FFFFFF/png?text=Floating",
        duration: "5:20",
      },
      {
        id: "track6",
        title: "Deep Slumber",
        artist: "Somnus",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        imageUrl: "https://placehold.co/100x100/778899/FFFFFF/png?text=Slumber",
        duration: "6:30",
      },
    ],
  },
];

export interface Program {
  id: string;
  name: string;
  host: string;
  imageUrl: string;
  audioUrl: string;
  // Potrebbero esserci altri campi come 'description', 'genre', ecc.
}

export const mockPrograms: Program[] = [
  {
    id: "live1",
    name: "Radio Amblé Live",
    host: "Amblé Radio",
    imageUrl: "https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg", // Immagine di fallback usata in NewHomePage
    audioUrl: "https://mqugxowc-lbmedia.radioca.st/stream?type=http&nocache=43", // URL audio d'esempio
  },
  // Aggiungi altri programmi mock qui se necessario
];
