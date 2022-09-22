import { useMemo, useState } from "react";
import styled from "styled-components";
import { BlockItem } from "./block-item";

const Root = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > div {
    + div {
      margin-top: 15px;
    }
  }

  button {
    margin-top: 10px;

    background: #957f5b;
    border-radius: 4px;
    border: 1px solid #b79962;
    padding: 5px 12px;
    font-size: 1rem;
    line-height: 1rem;
    color: #dcdcdc;
    font-weight: bold;

    &:disabled {
      color: #393939;
    }
  }
`;

const MaterialStack = styled.div`
  display: flex;
  align-items: center;

  > div {
    + div {
      margin-left: 5px;
    }
  }
`;

const InscreaseButton = styled.div`
  display: flex;
  align-items: center;

  span {
    display: block;

    color: #000;
  }

  span:first-child,
  span:last-child {
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 1.2rem;
  }

  span:nth-child(2) {
    font-size: 1.5rem;
    line-height: 1.5rem;
    margin: 0 30px;
  }
`;

const Track = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    margin-top: 4px;
    display: block;
    font-size: 0.8rem;
    line-height: 0.8rem;
    color: #000;
  }
`;

type CraftTableProps = {
  source: any; //todo
  target: {
    code: string;
    sprite: string;
  };
  materials: {
    requireQuantity: number;
    code: string;
    sprite: string;
  }[];
  onCraft?: (
    target: { code: string; sprite: string },
    vol: number,
    used: { code: string; used: number }[]
  ) => void;
};

export function CraftTable({
  source,
  target,
  materials,
  onCraft,
}: CraftTableProps) {
  const initial = useMemo(
    () => materials.map((mar) => ({ ...mar, iQty: 0 })),
    [materials]
  );
  const [info, setInfo] = useState(initial);
  const [vol, setVol] = useState(0);

  const handleIns = () => {
    const nextInfo = info.map((item) => {
      const totalAvalQty = source.getStuffQty(item.code);
      const remainQty = Math.abs(item.iQty - totalAvalQty);
      const expectNextQty = item.iQty + item.requireQuantity;
      const nextQty =
        item.iQty +
        (item.requireQuantity > remainQty ? remainQty : item.requireQuantity);

      return {
        ...item,
        iQty: nextQty <= totalAvalQty ? nextQty : item.iQty,
        // check quantity for creation is enough
        isValid: expectNextQty <= totalAvalQty,
      };
    });
    setInfo(nextInfo);
    if (nextInfo.every((item) => item.isValid)) {
      setVol((prev) => prev + 1);
    }
  };

  const handleDes = () => {
    const nextInfo = info.map((item) => {
      const nextQty = item.iQty - item.requireQuantity;
      return {
        ...item,
        iQty: nextQty >= 0 ? nextQty : 0,
        // check quantity for creation is enough
        isValid: nextQty >= 0,
      };
    });
    setInfo(nextInfo);
    if (nextInfo.every((item) => item.isValid)) {
      setVol((prev) => prev - 1);
    }
  };

  const handleCraft = () => {
    if (onCraft) {
      // reset track
      setInfo([...initial]);
      setVol(0);
      onCraft(
        target,
        vol,
        info.map((info) => ({
          code: info.code,
          used: info.requireQuantity * vol,
        }))
      );
    }
  };

  return (
    <Root>
      <BlockItem primary sprite={target.sprite} size="large" />
      <MaterialStack>
        {Array.from({ length: 5 }).map((_, i) => (
          <Track key={i}>
            {info[i] ? (
              <>
                <BlockItem
                  highlight={info[i].iQty >= info[i].requireQuantity}
                  secondary
                  sprite={info[i].sprite}
                />
                <span>
                  {info[i].iQty}/{info[i].requireQuantity}
                </span>
              </>
            ) : (
              <>
                <BlockItem secondary sprite="" />
                <span>-/-</span>
              </>
            )}
          </Track>
        ))}
      </MaterialStack>
      <InscreaseButton>
        <span onClick={handleDes}>&mdash;</span>
        <span>{vol}</span>
        <span onClick={handleIns}>&#9547;</span>
      </InscreaseButton>
      <button onClick={handleCraft} disabled={vol < 1}>
        Craft
      </button>
    </Root>
  );
}
