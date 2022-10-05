import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { BlockItem } from "./block-item";
import { FoodBasket } from "./food-basket";
import { useEntity, useWatcher } from "react-simple-game-engine/lib/utilities";
import { itemHash } from "data/item-list";
import { FarmerEntity } from "entities/farmer.entity";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export function BasketTool() {
  const [farmer] = useEntity(FarmerEntity);
  useWatcher("own-items", {
    "own-items": { list: farmer.ownItems, group: farmer.groupOwnItems },
  });

  const last9Foods = useMemo(() => {
    return farmer.ownFoodItems.slice(0, 9).map((own) => ({
      ...itemHash[own.code],
      ...own,
    }));
  }, [farmer.ownFoodItems]);

  const [showBasket, setShow] = useState(false);
  const [activeFood, setActiveFood] = useState<{
    code: Item["code"];
    sprite: string;
  }>(last9Foods[0]);

  useEffect(() => {
    if (!activeFood) {
      setActiveFood(last9Foods[0]);
    }
  }, [activeFood, last9Foods]);

  useEffect(() => {
    if (activeFood) {
      if (!last9Foods.find((food) => food.code === activeFood.code)) {
        // reset active food
        setActiveFood(last9Foods[0]);
      }
    }
  }, [last9Foods, activeFood]);

  return (
    <Root>
      {showBasket && (
        <FoodBasket
          list={last9Foods}
          onSelect={(_, item) => {
            setActiveFood(item);
          }}
        />
      )}

      <div style={{ marginTop: 20 }} />
      <BlockItem
        onPress={() => {
          if (showBasket) {
            setShow(false);
          }
          if (activeFood) {
            farmer.eatFood(activeFood.code);
          }
        }}
        onLongPress={() => setShow(true)}
        size="medium"
        sprite={activeFood?.sprite || ""}
      />
    </Root>
  );
}
