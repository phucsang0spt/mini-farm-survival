import { useMemo, useState } from "react";
import { useEntity, useWatcher } from "react-simple-game-engine/lib/utilities";

import { EquipmentShape } from "enums";

import { CraftTable } from "./craft-table";
import { EquipTable } from "./equip-table";
import { InfoView } from "./info-view";
import { StackPanelLayout, StackPanelLayoutProps } from "./stack-panel-layout";

import chest from "assets/images/chest.png";
import craft from "assets/images/craft.png";
import equipment from "assets/images/equipment.png";

import { craftList } from "data/craft-list";
import { itemHash } from "data/item-list";

import { Farmer } from "entities/farmer.entity";
import { ItemGridItem } from "./item-grid";

enum BackpackTab {
  STORAGE,
  CRAFT,
  EQUIPMENT,
}

export function BackpackPanel() {
  const [farmer] = useEntity(Farmer);

  const tabs = [
    {
      code: BackpackTab.STORAGE,
      sprite: chest,
      hook: useStorageTab({ farmer }),
    },
    {
      code: BackpackTab.CRAFT,
      sprite: craft,
      hook: useCraftTab({ farmer }),
    },
    {
      code: BackpackTab.EQUIPMENT,
      sprite: equipment,
      hook: useEquipmentTab({ farmer }),
    },
  ] as StackPanelLayoutProps<BackpackTab>["tabs"];

  return <StackPanelLayout tabs={tabs} defaultActive={BackpackTab.CRAFT} />;
}

type TabCommonProps = {
  farmer: Farmer;
};

function useStorageTab({ farmer }: TabCommonProps) {
  const [previewItem, setPreviewItem] = useState<
    ItemGridItem & Item & { ids: OwnItem["id"][] }
  >(null);

  const { selectedIDs = [], itemForView } = useMemo(() => {
    if (previewItem) {
      let {
        ids = [],
        format: { shape, ...format } = {},
        ...itemForView
      } = previewItem;
      return {
        selectedIDs: ids,
        itemForView: {
          ...itemForView,
          info: Object.keys(format || {}).map((k) => ({
            label: k.toUpperCase(),
            value: (format as any)[k],
          })),
        },
      };
    }
    return {
      selectedIDs: [],
      itemForView: undefined,
    };
  }, [previewItem]);

  const {
    "own-items": { group: groupOwnItems },
  } = useWatcher(["own-items", "active-sword", "active-shield"], {
    "active-sword": farmer.activeSword,
    "active-shield": farmer.activeShield,
    "own-items": { list: farmer.ownItems, group: farmer.groupOwnItems },
  });

  const pickUsing: any[] = [];
  let list = Object.keys(groupOwnItems)
    .map((code) => {
      const ids = groupOwnItems[code]
        .map((item) => item.id)
        .filter((id) => !farmer.isUsing(id));
      const activeInGroup = ids.join(",") === selectedIDs.join(",");
      return {
        ...itemHash[code],
        active: activeInGroup,
        volume: groupOwnItems[code]
          .filter((item) => {
            const isUsing = farmer.isUsing(item.id);
            if (isUsing) {
              pickUsing.push({
                ...itemHash[code],
                active: selectedIDs.includes(item.id),
                volume: 1,
                highlight: true,
                ids: [item.id],
              });
            }
            return !isUsing;
          })
          .reduce((s, item) => s + item.qty, 0),
        ids,
      };
    })
    .filter((item) => !!item.volume);

  list = [...list, ...pickUsing];

  const handleSelectItem = (
    _: any,
    { volume, active, ...item }: ItemGridItem & Item & { ids: OwnItem["id"][] }
  ) => {
    setPreviewItem(item);
  };

  return {
    list,
    onSelect: handleSelectItem,
    projector: <InfoView item={itemForView} />,
  };
}

function useCraftTab({ farmer }: TabCommonProps) {
  const [selectedItem, selectItem] = useState<CraftItem["code"]>(null);
  const handlePickCraft = (code: string) => {
    selectItem(code);
  };

  const list = craftList.map((item) => {
    return {
      ...item,
      ...itemHash[item.code],
      active: item.code === selectedItem,
      materials: item.materials.map((mart: Item) => ({
        ...mart,
        sprite: itemHash[mart.code].sprite,
      })),
    } as CraftItem;
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

function useEquipmentTab({ farmer }: TabCommonProps) {
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
