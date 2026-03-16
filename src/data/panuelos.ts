export interface Panuelo {
  id?: number;
  groupNumber: number;
  groupName: string;
  zoneNumber: number;
  district: number | string;
  image: string;
  images: string[];
  meaning: string;
  history: string;
  createdAt?: string;
  updatedAt?: string;
}

// Static data - can be replaced with Google Sheets API fetch
export const panuelosData: Panuelo[] = [
  {
    groupNumber: 581,
    groupName: "Maria Auxiliadora",
    zoneNumber: 18,
    district: 1,
    image: "https://res.cloudinary.com/dfol8e2xd/image/upload/v1769465367/image_1_pdfjks.png",
    images: ["https://res.cloudinary.com/dfol8e2xd/image/upload/v1769465367/image_1_pdfjks.png"],
    meaning: "Descripción del pañuelo",
    history: "Historia del grupo",
  },
  {
    id: 2,
    groupName: "Nuestra señora de Fatima",
    groupNumber: 777,
    zoneNumber: 18,
    district: 4,
    image: "https://res.cloudinary.com/dfol8e2xd/image/upload/v1769465367/image_1_pdfjks.png",
    images: ["https://res.cloudinary.com/dfol8e2xd/image/upload/v1769465367/image_1_pdfjks.png"],
    meaning: "El color negro simboliza las tinieblas, el amarillo representa la luz de cristo brillando aun en la oscuridad y la cruz en la parte trasera simboliza nuestra fe cristiana",
    history: "Fundado en 1977, grupo pionero en Santa Fe.",
  },
  {
    id: 3,
    groupName: "Nuestra señora de Lourdes",
    groupNumber: 477,
    zoneNumber: 18,
    district: 4,
    image: "https://res.cloudinary.com/dfol8e2xd/image/upload/v1769465367/image_1_pdfjks.png",
    images: ["https://res.cloudinary.com/dfol8e2xd/image/upload/v1769465367/image_1_pdfjks.png"],
    meaning: "El color negro simboliza las tinieblas, el amarillo representa la luz de cristo brillando aun en la oscuridad y la cruz en la parte trasera simboliza nuestra fe cristiana",
    history: "Fundado en 1977, grupo pionero en Santa Fe.",
  },
];
