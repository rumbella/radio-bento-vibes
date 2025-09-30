export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string; // e.g., "4:03"
  url?: string;
  image?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  image: string;
  tracks: Track[];
}

export interface Episode {
  id: string;
  title: string;
  duration: string; // e.g., "45:12"
}

export interface Podcast {
  id: string;
  name: string;
  description: string;
  image: string;
  episodes: Episode[];
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