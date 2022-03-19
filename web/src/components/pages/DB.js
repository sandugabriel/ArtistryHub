const myEvents = [
  {
    id: 0,
    idOrganizer: 0,
    idArtist: null,
    idApplicants: [],
    name: "Dream wedding",
    date: new Date("3/1/22"),
    location: "Domeniul cu Ciresi, Bucharest",
    details: "We want to organize a wedding where approximately 100 persons will participate. We are looking for a music band and a photographer. The budget is flexible, but we are looking for artists that have some experience in these kind of events.",
    tags: ["Music Band", "Photographer"],
  },
  {
    id: 1,
    idOrganizer: 1,
    idArtist: null,
    idApplicants: [],
    name: "Party at my house",
    date: new Date("4/10/22"),
    location: "Crangasi, Bucharest",
    details: "I want to organize a small party at my house, so I'm looking for a young DJ.",
    tags: ["DJ"],
  },
  {
    id: 2,
    idOrganizer: 1,
    idArtist: null,
    idApplicants: [],
    name: "Party at my house v2",
    date: new Date("4/10/22"),
    location: "Crangasi, Bucharest",
    details: "I want to organize a small party at my house, so I'm looking for a young DJ.",
    tags: ["DJ"],
  },
  {
    id: 3,
    idOrganizer: 1,
    idArtist: null,
    idApplicants: [],
    name: "Party at my house v3",
    date: new Date("4/10/22"),
    location: "Crangasi, Bucharest",
    details: "I want to organize a small party at my house, so I'm looking for a young DJ.",
    tags: ["DJ"],
  },
  {
    id: 4,
    idOrganizer: 1,
    idArtist: null,
    idApplicants: [],
    name: "Party at my house v4",
    date: new Date("4/10/22"),
    location: "Crangasi, Bucharest",
    details: "I want to organize a small party at my house, so I'm looking for a young DJ.",
    tags: ["DJ"],
  },
];

const allArtists = [
  {
    id: 0,
    name: "Radu Dumitru",
    email: "radu.dumitru@gmail.com",
    type: "Photographer",
    skills: ["Weddings", "Portrets"],
    description: "30 year old professional photographer",
    rating: 4
  },
  {
    id: 1,
    name: "Pop George",
    email: "pop-george@yahoo.com",
    type: "DJ",
    skills: ["DJ", "MC"],
    description: "Music lover that is open for business",
    rating: 3.2
  },
  {
    id: 2,
    name: "Gheorghe Ionut",
    email: "ghion@gmail.com",
    type: "DJ",
    skills: ["DJ"],
    description: "DJ that loves techno music",
    rating: 4.5
  },
  {
    id: 3,
    name: "Gheorghe Ionut v2",
    email: "ghion@gmail.com",
    type: "DJ",
    skills: ["DJ"],
    description: "DJ that loves techno music",
    rating: 4.5
  },
  {
    id: 4,
    name: "Gheorghe Ionut v3",
    email: "ghion@gmail.com",
    type: "DJ",
    skills: ["DJ"],
    description: "DJ that loves techno music",
    rating: 4.5
  },
];

export { myEvents, allArtists }