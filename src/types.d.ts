declare interface Window {
  Renderer: import("react-simple-game-engine").P5;
}

declare var Renderer: Window["Renderer"];

type Item = {
  label: string;
  code: string;
  sprite: string;
};

type CraftItem = Item & {
  materials: ({
    requireQuantity: number;
  } & Item)[];
};
