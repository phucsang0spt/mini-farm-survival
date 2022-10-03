import { InfoView, InfoViewItem } from "components/info-view";
import { ItemGridItem } from "components/item-grid";
import { PanelButton } from "components/panel-button";
import { QuantityControl } from "components/quantity-control";
import { itemHash } from "data/item-list";
import { shopList } from "data/shop-list";
import { Farmer } from "entities/farmer.entity";
import { useState } from "react";
import { valueToAlpha } from "utils";

export function useShopTab({ farmer }: TabCommonProps) {
  const [previewItem, setPreviewItem] = useState<InfoViewItem & ShopItem>();
  const handleSelectItem = (
    _: any,
    {
      format: { shape, ...format } = {} as any,
      cost,
      ...item
    }: Item & ShopItem & ItemGridItem
  ) => {
    setPreviewItem({
      ...item,
      cost,
      info: [
        { label: "PRICE", value: `${valueToAlpha(cost, true)}` },
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

  const totalPrice = item.cost * qty;

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
          qty < MIN_QTY || totalPrice > source.cash || isOverloadChickenPlace
        }
      >
        {isOverloadChickenPlace
          ? `Overload`
          : `Buy ${valueToAlpha(totalPrice, true)}`}
      </PanelButton>
    </>
  );
}
