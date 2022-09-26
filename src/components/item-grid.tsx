import styled from "styled-components";
import { paginatedList } from "utils";

import { BlockItem } from "./block-item";

const Root = styled.div<{
  amountCol: number;
}>`
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: #9f7f48;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: #7d6742;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #7d6742;
  }

  --size: 32px;
  --gap: 10px;

  background-color: #b79962;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-top: 1px;
  padding-right: 5px;

  > div {
    width: calc(
      (var(--size) * ${({ amountCol }) => amountCol}) +
        (var(--gap) * ${({ amountCol }) => amountCol - 1})
    );
    display: flex;
    align-items: center;
    justify-content: space-between;

    + div {
      margin-top: var(--gap);
    }
  }
`;

const AMOUNT_PER_ROW = 5;

type ItemGridProps = {
  onSelect?: (code: string, item: any) => void;
  list: {
    code: string;
    sprite: string;
    active?: boolean;
    highlight?: boolean;
    volume?: number;
  }[];
  rowAmount?: number;
};

export function ItemGrid({ rowAmount = 8, list, onSelect }: ItemGridProps) {
  const rows = paginatedList(list, AMOUNT_PER_ROW);
  return (
    <Root amountCol={AMOUNT_PER_ROW}>
      {Array.from({ length: rowAmount }).map((_, i) => {
        const cols = rows[i];
        return (
          <div key={i}>
            {Array.from({ length: AMOUNT_PER_ROW }).map((_, j) => {
              return cols?.[j] ? (
                <BlockItem
                  key={j}
                  primary
                  onPress={() => onSelect?.(cols[j].code, cols[j])}
                  dark={!cols[j].active}
                  sprite={cols[j].sprite}
                  highlight={cols[j].highlight}
                  volume={cols[j].volume}
                />
              ) : (
                <BlockItem key={j} primary dark sprite={""} />
              );
            })}
          </div>
        );
      })}
    </Root>
  );
}
