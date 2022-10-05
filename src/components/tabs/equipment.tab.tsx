import { useWatcher } from "react-simple-game-engine/lib/utilities";

import { EquipTable } from "components/equip-table";
import { itemHash } from "data/item-list";
import { EquipmentShape } from "enums";

export function useEquipmentTab({ farmer }: TabCommonProps) {
  const {
    "own-items": { list: ownItems },
    "active-sword": activeSword,
    "active-shield": activeShield,
  } = useWatcher(["own-items", "active-sword", "active-shield"], {
    "own-items": { list: farmer.ownItems },
    "active-sword": farmer.activeSword,
    "active-shield": farmer.activeShield,
  });

  const handleSelectEquipment = (code: Item["code"], item: OwnItem & Item) => {
    if ((item.format as EquipmentItemFormat).shape === EquipmentShape.SWORD) {
      farmer.activeSword = { code, id: item.id };
    } else {
      farmer.activeShield = { code, id: item.id };
    }
  };
  const list = ownItems
    .map((item) => {
      const active =
        item.id === activeSword?.id || item.id === activeShield?.id;
      const itemClass = itemHash[item.code];
      return itemClass.type === "equipment"
        ? {
            ...item,
            ...itemClass,
            active,
          }
        : null;
    })
    .filter(Boolean);

  return {
    list,
    onSelect: handleSelectEquipment,
    projector: (
      <EquipTable
        activeSword={activeSword && itemHash[activeSword.code].sprite}
        activeShield={activeShield && itemHash[activeShield.code].sprite}
      />
    ),
  };
}
