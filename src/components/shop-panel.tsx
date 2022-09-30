import { useEntity } from "react-simple-game-engine/lib/utilities";

import { Farmer } from "entities/farmer.entity";

import { StackPanelLayout, StackPanelLayoutProps } from "./stack-panel-layout";

import cart from "assets/images/cart.png";
import { shopList } from "data/shop-list";
import { itemHash } from "data/item-list";
import { ItemGridItem } from "./item-grid";
import { useState } from "react";
import { InfoView, InfoViewItem } from "./info-view";
import { PanelButton } from "./panel-button";
import { QuantityControl } from "./quantity-control";
import { valueToAlpha } from "utils";

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

type TabCommonProps = {
  farmer: Farmer;
};

function useShopTab({ farmer }: TabCommonProps) {
  const [previewItem, setPreviewItem] = useState<InfoViewItem & ShopItem>();
  const handleSelectItem = (
    _: any,
    {
      format: { shape, ...format } = {} as any,
      price,
      ...item
    }: Item & ShopItem & ItemGridItem
  ) => {
    setPreviewItem({
      ...item,
      price,
      info: [
        { label: "PRICE", value: `${valueToAlpha(price, true)}` },
        ...Object.keys(format || {}).map((k) => ({
          label: k.toUpperCase(),
          value: (format as any)[k],
        })),
      ],
    });
  };

  const list = shopList.map((item) => ({
    ...itemHash[item.code],
    ...item,
    active: previewItem?.code === item.code,
  }));

  const handleBuy = (
    item: ShopItem,
    data: { qty: number; totalPrice: number }
  ) => {
    farmer.buyItem(item as any as Item, data);
  };

  return {
    list,
    onSelect: handleSelectItem,
    projector: (
      <InfoView
        item={previewItem}
        extendEl={
          previewItem && (
            <InfoViewExtend
              source={farmer}
              item={previewItem}
              onBuy={handleBuy}
            />
          )
        }
      />
    ),
  };
}

type InfoViewExtendProps = {
  source: Farmer;
  item: InfoViewItem & ShopItem;
  onBuy: (item: ShopItem, data: { qty: number; totalPrice: number }) => void;
};

function InfoViewExtend({ item, source, onBuy }: InfoViewExtendProps) {
  const MIN_QTY = 1;
  const [qty, setQty] = useState(MIN_QTY);

  const totalPrice = item.price * qty;

  const isOverloadChickenPlace =
    item.code === "chicken"
      ? source.generator.isOverloadChickenPlace(qty)
      : false;
  return (
    <>
      <div style={{ height: 10 }} />
      <QuantityControl
        qty={qty}
        onDown={() => {
          setQty((prev) => (prev > MIN_QTY ? prev - 1 : prev));
        }}
        onUp={() => {
          setQty((prev) => prev + 1);
        }}
      />
      <div style={{ height: 10 }} />
      <PanelButton
        onClick={() => {
          onBuy(item, { qty, totalPrice });
          setQty(MIN_QTY);
        }}
        disabled={
          qty < MIN_QTY || totalPrice > source.money || isOverloadChickenPlace
        }
      >
        {isOverloadChickenPlace
          ? `Overload`
          : `Buy ${valueToAlpha(totalPrice, true)}`}
      </PanelButton>
    </>
  );
}
