import { useState } from "react";

import { CraftTable } from "components/craft-table";

import { craftList } from "data/craft-list";
import { itemHash } from "data/item-list";

export function useCraftTab({ farmer }: TabCommonProps) {
  const [selectedItem, selectItem] = useState<CraftItem["code"]>(null);
  const handlePickCraft = (code: string) => {
    selectItem(code);
  };

  const list = craftList.map((item) => {
    return {
      ...itemHash[item.code],
      active: item.code === selectedItem,
      materials: item.materials.map((mart) => ({
        ...mart,
        ...itemHash[mart.code],
      })),
    };
  });

  const selectedTarget = list.find((item) => item.code === selectedItem);

  return {
    list,
    onSelect: handlePickCraft,
    projector: (
      <CraftTable
        onCraft={(target, vol, used) => {
          farmer.craftItem({ code: target.code, qty: vol }, used);
        }}
        source={farmer}
        target={selectedTarget}
      />
    ),
  };
}
