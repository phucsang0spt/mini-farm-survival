import styled from "styled-components";
import { BlockItem } from "./block-item";

const Root = styled.div`
  background-color: #ffffff40;
  border: 1px solid #0000005b;
  background-color: #ffffff4f;
  padding: 5px;
  width: calc(1px + 5px + (3 * 32px + 2 * 5px) + 5px + 1px);
  height: calc(1px + 5px + (3 * 32px + 2 * 5px) + 5px + 1px);

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    + div {
      margin-top: 5px;
    }
  }
`;

type FoodBasketProps = {
  list: { sprite: string; quantity: number }[];
};

export function FoodBasket({ list }: FoodBasketProps) {
  return (
    <Root>
      {Array.from({ length: 3 }).map((_, i) => {
        const cols = list.slice(i * 3, i * 3 + 3);
        return (
          <div key={i}>
            {Array.from({ length: 3 }).map((_, j) =>
              cols[j] ? (
                <BlockItem
                  key={j}
                  sprite={cols[j].sprite}
                  volume={cols[j].quantity}
                />
              ) : (
                <BlockItem key={j} sprite="" />
              )
            )}
          </div>
        );
      })}
    </Root>
  );
}
