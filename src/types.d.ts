declare interface Window {
  Renderer: import("react-simple-game-engine").P5;
}

declare var Renderer: Window["Renderer"];

type Item = {
  label: string;
  code: string;
  sprite: string;
} & (
  | {
      type: "stuff" | "food" | "tool";
      shape?: never;
    }
  | {
      type: "equipment";
      shape: import("enums").EquipmentShape;
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

type CraftItem = Item & {
  materials: ({
    requireQuantity: number;
  } & Item)[];
};
