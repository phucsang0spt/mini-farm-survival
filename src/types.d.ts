declare interface Window {
  Renderer: import("react-simple-game-engine").P5;
}

declare var Renderer: Window["Renderer"];

type StuffItemFormat = {
  shape?: never;
};
type FoodItemFormat = {
  hp: number;
  water: number;
  shape?: never;
};
type ToolItemFormat = {
  shape: import("enums").ToolShape;
};
type EquipmentItemFormat = {
  shape: import("enums").EquipmentShape;
  power: number;
  defend: number;
  speed: number;
};
type Item = {
  label: string;
  code: string;
  sprite: string;
  sellPrice?: number;
} & (
  | {
      type: "stuff";
      format?: StuffItemFormat;
    }
  | {
      type: "food";
      format: FoodItemFormat;
    }
  | {
      type: "tool";
      format: ToolItemFormat;
    }
  | {
      type: "equipment";
      format: EquipmentItemFormat;
    }
);

type OwnItem = {
  id: string;
  code: Item["code"];
  qty: number;
};

type ActiveItem = {
  id: OwnItem["id"];
  code: OwnItem["code"];
};

type ShopItem = {
  code: string;
  cost: number;
};

type CraftItem = {
  code: Item["code"];
  materials: {
    requireQuantity: number;
    code: Item["code"];
  }[];
};
