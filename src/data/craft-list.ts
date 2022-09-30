export const craftList: any[] = [
  {
    code: "wood-plate",
    materials: [
      {
        code: "wood",
        requireQuantity: 2,
      },
    ],
  },
  {
    code: "fire",
    materials: [
      {
        code: "wood",
        requireQuantity: 1,
      },
    ],
  },
  {
    code: "cooked-fish",
    materials: [
      {
        code: "fire",
        requireQuantity: 1,
      },
      {
        code: "raw-fish",
        requireQuantity: 1,
      },
    ],
  },
  {
    code: "cooked-chicken",
    materials: [
      {
        code: "fire",
        requireQuantity: 1,
      },
      {
        code: "raw-chicken",
        requireQuantity: 1,
      },
    ],
  },
  {
    code: "cooked-beast-meat",
    materials: [
      {
        code: "fire",
        requireQuantity: 1,
      },
      {
        code: "raw-beast-meat",
        requireQuantity: 1,
      },
    ],
  },
  {
    code: "axe",
    materials: [
      {
        code: "wood",
        requireQuantity: 10,
      },
      {
        code: "stone",
        requireQuantity: 1,
      },
    ],
  },
  {
    code: "pickaxe",
    materials: [
      {
        code: "wood",
        requireQuantity: 20,
      },
      {
        code: "iron-ore",
        requireQuantity: 5,
      },
    ],
  },
  {
    code: "fishing-rod",
    materials: [
      {
        code: "wood",
        requireQuantity: 2,
      },
      {
        code: "iron-ore",
        requireQuantity: 1,
      },
      {
        code: "clew",
        requireQuantity: 1,
      },
    ],
  },
  //shield
  {
    code: "wood-shield",
    materials: [
      {
        code: "wood",
        requireQuantity: 10,
      },
    ],
  },
  {
    code: "wood-shield-rare",
    materials: [
      {
        code: "wood",
        requireQuantity: 20,
      },
      {
        code: "stone",
        requireQuantity: 10,
      },
    ],
  },
  {
    code: "steel-shield",
    materials: [
      {
        code: "steel-ore",
        requireQuantity: 25,
      },
    ],
  },
  // sword
  {
    code: "wood-sword",
    materials: [
      {
        code: "wood",
        requireQuantity: 15,
      },
    ],
  },
  {
    code: "metal-sword",
    materials: [
      {
        code: "metal-ore",
        requireQuantity: 15,
      },
    ],
  },
  {
    code: "iron-sword",
    materials: [
      {
        code: "iron-ore",
        requireQuantity: 20,
      },
    ],
  },
  {
    code: "steel-sword",
    materials: [
      {
        code: "steel-ore",
        requireQuantity: 30,
      },
    ],
  },
  {
    code: "super-sword",
    materials: [
      {
        code: "steel-sword",
        requireQuantity: 1,
      },
      {
        code: "steel-ore",
        requireQuantity: 30,
      },
    ],
  },
  {
    code: "knife-sword",
    materials: [
      {
        code: "super-sword",
        requireQuantity: 1,
      },
      {
        code: "steel-ore",
        requireQuantity: 30,
      },
    ],
  },
  {
    code: "twin-sword",
    materials: [
      {
        code: "knife-sword",
        requireQuantity: 2,
      },
      {
        code: "steel-ore",
        requireQuantity: 30,
      },
    ],
  },

  {
    code: "heaven-sword",
    materials: [
      {
        code: "knife-sword",
        requireQuantity: 1,
      },
      {
        code: "steel-ore",
        requireQuantity: 50,
      },
    ],
  },
  {
    code: "hell-sword",
    materials: [
      {
        code: "heaven-sword",
        requireQuantity: 1,
      },
      {
        code: "steel-ore",
        requireQuantity: 100,
      },
    ],
  },
  {
    code: "weapon-of-god",
    materials: [
      {
        code: "hell-sword",
        requireQuantity: 1,
      },
      {
        code: "steel-ore",
        requireQuantity: 500,
      },
    ],
  },
];
