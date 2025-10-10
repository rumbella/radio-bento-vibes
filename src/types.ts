export interface PlaylistTrack {
  id: string;
  title: string;
  artist: string;
  duration: string; // e.g., "4:03"
  audioUrl: string;
  backgroundImageUrl?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  image: string;
  tracks: PlaylistTrack[];
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string; // e.g., "45:32"
  date: string; // ISO date string
}

export interface ResidentSocialLinks {
  [platform: string]: string; // instagram, soundcloud, mixcloud, etc.
}

export interface Resident {
  id: string;
  name: string;
  bio: string;
  image: string;
  shows: string[];
  socialLinks: ResidentSocialLinks;
}
