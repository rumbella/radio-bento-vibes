export interface Program {
  id: string;
  name: string;
  host: string;
  imageUrl: string;
  audioUrl: string;
}

export interface Advertisement {
  id: string;
  name: string;
  imageUrl: string;
  videoUrl?: string;
  targetUrl: string;
}

export const mockPrograms: Program[] = [
  {
    id: "program1",
    name: "Morning Vibes",
    host: "Marco & Sofia",
    imageUrl: "https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg",
    audioUrl: "https://mqugxowc-lbmedia.radioca.st/stream?type=http&nocache=43",
  },
  {
    id: "program2",
    name: "Tech Talk",
    host: "Alessandro R.",
    imageUrl: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "program3",
    name: "Lunch Beats", // Added a third program for more variety
    host: "DJ Luna",
    imageUrl: "https://images.pexels.com/photos/1762578/pexels-photo-1762578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

export const mockAdvertisements: Advertisement[] = [
  {
    id: "ad1",
    name: "Awesome Product",
    imageUrl: "https://placehold.co/600x400/E74C3C/FFFFFF/png?text=Ad+1",
    targetUrl: "https://example.com/product",
  },
  {
    id: "ad2",
    name: "Amazing Service",
    imageUrl: "https://placehold.co/600x400/3498DB/FFFFFF/png?text=Ad+2",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    targetUrl: "https://example.com/service",
  },
];
