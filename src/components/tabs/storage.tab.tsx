import { useMemo, useState } from "react";
import { useWatcher } from "react-simple-game-engine/lib/utilities";

import { InfoView } from "components/info-view";
import { ItemGridItem } from "components/item-grid";
import { itemHash } from "data/item-list";

export function useStorageTab({ farmer }: TabCommonProps) {
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
