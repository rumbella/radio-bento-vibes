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

// Drastically simplified for diagnostics
export const mockPrograms: Program[] = [
  {
    id: "p1",
    name: "Test Program One",
    host: "Test Host One",
    imageUrl: "http://example.com/image1.jpg",
    audioUrl: "http://example.com/audio1.mp3",
  }
];

// Drastically simplified for diagnostics
export const mockAdvertisements: Advertisement[] = [
  {
    id: "ad1",
    name: "Test Ad One",
    imageUrl: "http://example.com/adimage1.jpg",
    targetUrl: "http://example.com/adtarget1",
  }
];
