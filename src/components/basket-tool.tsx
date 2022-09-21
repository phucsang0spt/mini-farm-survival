import { useState } from "react";
import styled from "styled-components";

import apple from "assets/images/items/foods/apple.png";
import banana from "assets/images/items/foods/banana.png";
import carrot from "assets/images/items/foods/carrot.png";
import egg from "assets/images/items/foods/egg.png";
import bread from "assets/images/items/foods/bread.png";

import { BlockItem } from "./block-item";
import { FoodBasket } from "./food-basket";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export function BasketTool() {
  const [showBasket, setShow] = useState(false);
  return (
    <Root>
      {showBasket && (
        <FoodBasket
          list={[
            {
              sprite: apple,
              quantity: 1,
            },
            {
              sprite: banana,
              quantity: 1,
            },
            {
              sprite: carrot,
              quantity: 1,
            },
            {
              sprite: egg,
              quantity: 1,
            },
            {
              sprite: bread,
              quantity: 1,
            },
          ]}
        />
      )}

      <div style={{ marginTop: 20 }} />
      <BlockItem
        onPress={() => {
          if (showBasket) {
            setShow(false);
          } else {
            // do other
            console.log("todo: ///");
          }
        }}
        onLongPress={() => setShow(true)}
        size="medium"
        sprite={apple}
      />
    </Root>
  );
}
