import type { TripData } from "../types";

export const TRIPS: TripData[] = [
  {
    id: "lunar-flyby-2026",
    destination: "Lunar Flyby",
    description:
      "A 3-day journey around the Moon, offering breathtaking views of the lunar surface and the iconic Earthrise. Experience weightlessness and witness the silence of deep space from our state-of-the-art spacecraft.",
    durationDays: 3,
    departureDates: ["2026-07-15", "2026-09-20", "2026-11-10"],
    pricePerPerson: 250000,
    imageUrl: "https://picsum.photos/seed/lunar/800/450",
  },
  {
    id: "iss-expedition-2026",
    destination: "ISS Expedition",
    description:
      "Spend 7 days aboard the International Space Station, conducting science experiments alongside professional astronauts. Witness 16 sunrises per day and enjoy unparalleled views of Earth from 400km above the surface.",
    durationDays: 7,
    departureDates: ["2026-08-01", "2026-10-15"],
    pricePerPerson: 500000,
    imageUrl: "https://picsum.photos/seed/iss/800/450",
  },
  {
    id: "mars-orbital-2027",
    destination: "Mars Orbital",
    description:
      "The ultimate frontier: a 180-day round trip to Mars orbit, bringing you closer to the Red Planet than any tourist in history. Observe Olympus Mons, Valles Marineris, and the polar ice caps from our custom deep-space habitat.",
    durationDays: 180,
    departureDates: ["2027-03-22", "2027-11-05"],
    pricePerPerson: 5000000,
    imageUrl: "https://picsum.photos/seed/mars/800/450",
  },
];
