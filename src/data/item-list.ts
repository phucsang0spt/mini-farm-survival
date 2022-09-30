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
import chicken from "assets/images/items/animals/chicken.png";

import apple from "assets/images/items/foods/apple.png";
import banana from "assets/images/items/foods/banana.png";
import bread from "assets/images/items/foods/bread.png";
import carrot from "assets/images/items/foods/carrot.png";
import chili from "assets/images/items/foods/chili.png";
import egg from "assets/images/items/foods/egg.png";
import gourd from "assets/images/items/foods/gourd.png";
import grape from "assets/images/items/foods/grape.png";
import lime from "assets/images/items/foods/lime.png";
import mushroom from "assets/images/items/foods/mushroom.png";
import strawberry from "assets/images/items/foods/strawberry.png";
import tomato from "assets/images/items/foods/tomato.png";
import rawChicken from "assets/images/items/foods/raw-chicken.png";
import cookedChicken from "assets/images/items/foods/cooked-chicken.png";
import cookedBeastMeat from "assets/images/items/foods/beast-meat.png";
import rawBeastMeat from "assets/images/items/foods/raw-beast-meat.png";
import rawFish from "assets/images/items/foods/raw-fish.png";
import cookedFish from "assets/images/items/foods/fish.png";

import { EquipmentShape, ToolShape } from "enums";

export const punchItem: Item = {
  type: "equipment",
  label: "Super Punch",
  code: "punch",
  sprite: punch,
  format: { shape: EquipmentShape.SWORD, power: 10, speed: 0, defend: 0 },
};

export const equipmentItemList: Item[] = [
  punchItem,
  {
    type: "equipment",
    label: "Wood Shield",
    code: "wood-shield",
    sprite: woodShield,
    format: { shape: EquipmentShape.SHIELD, power: 0, speed: 0, defend: 166 },
  },
  {
    type: "equipment",
    label: "Wood Shield (Rare)",
    code: "wood-shield-rare",
    sprite: woodShieldRare,
    format: {
      shape: EquipmentShape.SHIELD,
      power: 10,
      speed: 0,
      defend: 166 * 2,
    },
  },
  {
    type: "equipment",
    label: "Steel Shield",
    code: "steel-shield",
    sprite: steelShield,
    format: {
      shape: EquipmentShape.SHIELD,
      power: 0,
      speed: 0,
      defend: 166 * 3,
    },
  },
  // sword
  {
    type: "equipment",
    label: "Wood Sword",
    code: "wood-sword",
    sprite: woodSword,
    format: { shape: EquipmentShape.SWORD, power: 50, speed: 0, defend: 0 },
  },
  {
    type: "equipment",
    label: "Metal Sword",
    code: "metal-sword",
    sprite: metalSword,
    format: { shape: EquipmentShape.SWORD, power: 50 * 2, speed: 0, defend: 0 },
  },
  {
    type: "equipment",
    label: "Iron Sword",
    code: "iron-sword",
    sprite: ironSword,
    format: { shape: EquipmentShape.SWORD, power: 50 * 3, speed: 0, defend: 0 },
  },
  {
    type: "equipment",
    label: "Steel Sword",
    code: "steel-sword",
    sprite: steelSword,
    format: { shape: EquipmentShape.SWORD, power: 50 * 4, speed: 0, defend: 0 },
  },
  {
    type: "equipment",
    label: "Super Sword",
    code: "super-sword",
    sprite: superSword,
    format: { shape: EquipmentShape.SWORD, power: 50 * 5, speed: 0, defend: 0 },
  },
  {
    type: "equipment",
    label: "Knife Sword",
    code: "knife-sword",
    sprite: knifeSword,
    format: { shape: EquipmentShape.SWORD, power: 50 * 6, speed: 0, defend: 0 },
  },
  {
    type: "equipment",
    label: "Twin Sword",
    code: "twin-sword",
    sprite: twinSword,
    format: { shape: EquipmentShape.SWORD, power: 50 * 7, speed: 0, defend: 0 },
  },
  {
    type: "equipment",
    label: "Heaven Sword",
    code: "heaven-sword",
    sprite: heavenSword,
    format: { shape: EquipmentShape.SWORD, power: 50 * 8, speed: 0, defend: 0 },
  },
  {
    type: "equipment",
    label: "Hell Sword",
    code: "hell-sword",
    sprite: hellSword,
    format: { shape: EquipmentShape.SWORD, power: 50 * 9, speed: 0, defend: 0 },
  },
  {
    type: "equipment",
    label: "Weapon of God",
    code: "weapon-of-god",
    sprite: weaponOfGod,
    format: {
      shape: EquipmentShape.SWORD,
      power: 50 * 10,
      speed: 5,
      defend: 10,
    },
  },
];

export const foodItemList: Item[] = [
  {
    type: "food",
    label: "Chili",
    code: "chili",
    sprite: chili,
    format: { hp: 10, water: -5 },
  },
  {
    type: "food",
    label: "Banana",
    code: "banana",
    sprite: banana,
    format: { hp: 10 * 2, water: 2 },
  },
  {
    type: "food",
    label: "Bread",
    code: "bread",
    sprite: bread,
    format: { hp: 10 * 3, water: -1 },
  },
  {
    type: "food",
    label: "Carrot",
    code: "carrot",
    sprite: carrot,
    format: { hp: 10 * 4, water: 0 },
  },
  {
    type: "food",
    label: "Lime",
    code: "lime",
    sprite: lime,
    format: { hp: 10 * 5, water: 3 },
  },
  {
    type: "food",
    label: "Gourd",
    code: "gourd",
    sprite: gourd,
    format: { hp: 10 * 6, water: 0 },
  },
  {
    type: "food",
    label: "Tomato",
    code: "tomato",
    sprite: tomato,
    format: { hp: 10 * 7, water: 5 },
  },
  {
    type: "food",
    label: "Grape",
    code: "grape",
    sprite: grape,
    format: { hp: 10 * 8, water: 20 },
  },
  {
    type: "food",
    label: "Mushroom",
    code: "mushroom",
    sprite: mushroom,
    format: { hp: -5, water: 2 },
  },
  {
    type: "food",
    label: "Strawberry",
    code: "strawberry",
    sprite: strawberry,
    format: { hp: 10 * 9, water: 10 },
  },
  {
    type: "food",
    label: "Apple",
    code: "apple",
    sprite: apple,
    format: { hp: 10 * 10, water: 2 },
  },
  {
    type: "food",
    label: "Egg",
    code: "egg",
    sprite: egg,
    format: { hp: 10 * 11, water: 2 },
  },
  {
    type: "food",
    label: "Raw Beast Meat",
    code: "raw-beast-meat",
    sprite: rawBeastMeat,
    format: { hp: 10 * 12, water: 2 },
  },
  {
    type: "food",
    label: "Cooked Beast Meat",
    code: "cooked-beast-meat",
    sprite: cookedBeastMeat,
    format: { hp: 10 * 13, water: 0 },
  },
  {
    type: "food",
    label: "Raw Fish",
    code: "raw-fish",
    sprite: rawFish,
    format: { hp: 10 * 14, water: 5 },
  },
  {
    type: "food",
    label: "Cooked Fish",
    code: "cooked-fish",
    sprite: cookedFish,
    format: { hp: 10 * 15, water: 0 },
  },
  {
    type: "food",
    label: "Raw Chicken",
    code: "raw-chicken",
    sprite: rawChicken,
    format: { hp: 10 * 16, water: 2 },
  },
  {
    type: "food",
    label: "Cooked Chicken",
    code: "cooked-chicken",
    sprite: cookedChicken,
    format: { hp: 10 * 17, water: 0 },
  },
];

export const toolItemList: Item[] = [
  {
    type: "tool",
    label: "Axe",
    code: "axe",
    sprite: axe,
    format: {
      shape: ToolShape.AXE,
    },
  },
  {
    type: "tool",
    label: "Pickaxe",
    code: "pickaxe",
    sprite: pickaxe,
    format: {
      shape: ToolShape.PICKAXE,
    },
  },
  {
    type: "tool",
    label: "Fishing rod",
    code: "fishing-rod",
    sprite: fishingRod,
    format: {
      shape: ToolShape.FISHING_ROD,
    },
  },
];

export const itemList: Item[] = [
  {
    type: "stuff",
    label: "Fire",
    code: "fire",
    sprite: fire,
  },
  {
    type: "stuff",
    label: "Coin",
    code: "coin",
    sprite: coin,
  },
  {
    type: "stuff",
    label: "Mystic chest",
    code: "mystic-chest",
    sprite: mysticChest,
  },
  {
    type: "stuff",
    label: "Clew",
    code: "clew",
    sprite: clew,
  },
  {
    type: "stuff",
    label: "Wood Plate",
    code: "wood-plate",
    sprite: woodPlate,
  },
  {
    type: "stuff",
    label: "Metal Ore",
    code: "metal-ore",
    sprite: metalOre,
  },
  {
    type: "stuff",
    label: "Steel Ore",
    code: "steel-ore",
    sprite: steelOre,
  },
  {
    type: "stuff",
    label: "Iron Ore",
    code: "iron-ore",
    sprite: ironOre,
  },
  {
    type: "stuff",
    label: "Stone",
    code: "stone",
    sprite: stone,
  },
  {
    type: "stuff",
    label: "Wood",
    code: "wood",
    sprite: wood,
  },
  {
    type: "stuff",
    label: "Chicken",
    code: "chicken",
    sprite: chicken,
  },
  {
    type: "stuff",
    label: "Worm",
    code: "worm",
    sprite: worm,
  },
  ...toolItemList,
  ...foodItemList,
  ...equipmentItemList,
];

export const itemHash: Record<string, Item> = itemList.reduce(
  (obj: Record<string, Item>, item) => {
    obj[item.code] = item;
    return obj;
  },
  {}
);
