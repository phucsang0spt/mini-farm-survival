import { useEntity } from "react-simple-game-engine/lib/utilities";

import { StackPanelLayout, StackPanelLayoutProps } from "./stack-panel-layout";

import chest from "assets/images/chest.png";
import craft from "assets/images/craft.png";
import equipment from "assets/images/equipment.png";

import { useStorageTab } from "./tabs/storage.tab";
import { useCraftTab } from "./tabs/craft.tab";
import { useEquipmentTab } from "./tabs/equipment.tab";
import { FarmerEntity } from "entities/farmer.entity";

enum BackpackTab {
  STORAGE,
  CRAFT,
  EQUIPMENT,
}

export function BackpackPanel() {
  const [farmer] = useEntity(FarmerEntity);

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
