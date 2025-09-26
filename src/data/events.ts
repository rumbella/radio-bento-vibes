export interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Summer Music Festival",
    description: "Join us for a weekend of live music and fun.",
    imageUrl: "/event1.jpg",
  },
  {
    id: 2,
    title: "Art Exhibition",
    description: "Discover the latest works from local artists.",
    imageUrl: "/event2.jpg",
  },
  {
    id: 3,
    title: "Tech Conference",
    description: "The biggest tech conference of the year.",
    imageUrl: "/event3.png",
  },
];