import axe from "assets/images/items/tools/axe.png";
import pickaxe from "assets/images/items/tools/pickaxe.png";
import fishingRod from "assets/images/items/tools/fishing-rod.png";

import woodShield from "assets/images/items/equip/wood-shield.png";
import woodShieldRare from "assets/images/items/equip/wood-shield-2.png";
import steelShield from "assets/images/items/equip/steel-shield.png";

import woodSword from "assets/images/items/equip/weapons/wood-sword.png";
import metalSword from "assets/images/items/equip/weapons/metal-sword.png";
import ironSword from "assets/images/items/equip/weapons/iron-sword.png";
import steelSword from "assets/images/items/equip/weapons/steel-sword.png";
import superSword from "assets/images/items/equip/weapons/super-sword.png";
import knifeSword from "assets/images/items/equip/weapons/knife-sword.png";
import twinSword from "assets/images/items/equip/weapons/twin-sword.png";
import heavenSword from "assets/images/items/equip/weapons/heaven-sword.png";
import hellSword from "assets/images/items/equip/weapons/hell-sword.png";
import weaponOfGod from "assets/images/items/equip/weapons/weapon-of-god.png";

import punch from "assets/images/items/punch.png";
import coin from "assets/images/items/coin.png";
import clew from "assets/images/items/clew.png";
import mysticChest from "assets/images/items/mystic-chest.png";
import woodPlate from "assets/images/items/wood-plate.png";
import stone from "assets/images/items/stone.png";
import metalOre from "assets/images/items/metal-ore.png";
import ironOre from "assets/images/items/iron-ore.png";
import steelOre from "assets/images/items/steel-ore.png";
import wood from "assets/images/items/wood.png";
import worm from "assets/images/items/worm.png";
import fire from "assets/images/items/fire.png";

import rawFish from "assets/images/items/foods/raw-fish.png";
import cookedFish from "assets/images/items/foods/fish.png";

export const punchItem: Item = {
  label: "Super Punch",
  code: "punch",
  sprite: punch,
};

export const itemList: Item[] = [
  {
    label: "Cooked Fish",
    code: "cooked-fish",
    sprite: cookedFish,
  },
  {
    label: "Raw Fish",
    code: "raw-fish",
    sprite: rawFish,
  },
  {
    label: "Fire",
    code: "fire",
    sprite: fire,
  },
  {
    label: "Coin",
    code: "coin",
    sprite: coin,
  },
  {
    label: "Mystic chest",
    code: "mystic-chest",
    sprite: mysticChest,
  },
  {
    label: "Clew",
    code: "clew",
    sprite: clew,
  },
  {
    label: "Wood Plate",
    code: "wood-plate",
    sprite: woodPlate,
  },
  {
    label: "Metal Ore",
    code: "metal-ore",
    sprite: metalOre,
  },
  {
    label: "Steel Ore",
    code: "steel-ore",
    sprite: steelOre,
  },
  {
    label: "Iron Ore",
    code: "iron-ore",
    sprite: ironOre,
  },
  {
    label: "Stone",
    code: "stone",
    sprite: stone,
  },
  {
    label: "Wood",
    code: "wood",
    sprite: wood,
  },
  {
    label: "Worm",
    code: "worm",
    sprite: worm,
  },
  {
    label: "Axe",
    code: "axe",
    sprite: axe,
  },
  {
    label: "Pickaxe",
    code: "pickaxe",
    sprite: pickaxe,
  },
  {
    label: "Fishing rod",
    code: "fishing-rod",
    sprite: fishingRod,
  },
  //shield
  {
    label: "Wood shield",
    code: "wood-shield",
    sprite: woodShield,
  },
  {
    label: "Wood shield (rare)",
    code: "wood-shield-rare",
    sprite: woodShieldRare,
  },
  {
    label: "Steel shield",
    code: "steel-shield",
    sprite: steelShield,
  },
  // sword
  {
    label: "Wood sword",
    code: "wood-sword",
    sprite: woodSword,
  },
  {
    label: "Metal sword",
    code: "metal-sword",
    sprite: metalSword,
  },
  {
    label: "Iron sword",
    code: "iron-sword",
    sprite: ironSword,
  },
  {
    label: "Steel sword",
    code: "steel-sword",
    sprite: steelSword,
  },
  {
    label: "Super sword",
    code: "super-sword",
    sprite: superSword,
  },
  {
    label: "Knife sword",
    code: "knife-sword",
    sprite: knifeSword,
  },
  {
    label: "Twin sword",
    code: "twin-sword",
    sprite: twinSword,
  },
  {
    label: "Heaven sword",
    code: "heaven-sword",
    sprite: heavenSword,
  },
  {
    label: "Hell sword",
    code: "hell-sword",
    sprite: hellSword,
  },
  {
    label: "Weapon of God",
    code: "weapon-of-god",
    sprite: weaponOfGod,
  },
];

export const itemHash: Record<string, Item> = itemList.reduce(
  (obj: Record<string, Item>, item) => {
    obj[item.code] = item;
    return obj;
  },
  {}
);
