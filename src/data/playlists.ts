export interface Track {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  imageUrl?: string; // Optional album/track art
  duration?: string; // Optional, e.g., "3:45"
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
        title: "Sunset Drive",
        artist: "Synthwave Explorer",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        imageUrl: "https://placehold.co/100x100/FF6347/FFFFFF/png?text=Sunset",
        duration: "3:30",
      },
      {
        id: "track2",
        title: "Morning Coffee",
        artist: "Chill Beats Collective",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        imageUrl: "https://placehold.co/100x100/4682B4/FFFFFF/png?text=Coffee",
        duration: "2:45",
      },
      {
        id: "track3",
        title: "Neon Nights",
        artist: "Retro Future",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        imageUrl: "https://placehold.co/100x100/8A2BE2/FFFFFF/png?text=Neon",
        duration: "4:15",
      },
      {
        id: "track4",
        title: "Ocean Breeze",
        artist: "Island Grooves",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        // No imageUrl for this track to test fallback
        duration: "3:50",
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
