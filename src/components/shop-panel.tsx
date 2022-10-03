import { useEntity } from "react-simple-game-engine/lib/utilities";

import { Farmer } from "entities/farmer.entity";

import { StackPanelLayout, StackPanelLayoutProps } from "./stack-panel-layout";
import { useShopTab } from "./tabs/shop.tab";

import cart from "assets/images/cart.png";

enum ShopTab {
  SHOP,
}

export function ShopPanel() {
  const [farmer] = useEntity(Farmer);

  const tabs = [
    {
      code: ShopTab.SHOP,
      sprite: cart,
      hook: useShopTab({ farmer }),
    },
  ] as StackPanelLayoutProps<ShopTab>["tabs"];

  return <StackPanelLayout tabs={tabs} defaultActive={ShopTab.SHOP} />;
}
