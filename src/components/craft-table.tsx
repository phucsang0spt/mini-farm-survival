import { Farmer } from "entities/farmer.entity";
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
  position: relative;

  padding-bottom: calc(0.8rem + 4px);

  span {
    display: block;
    font-size: 0.8rem;
    line-height: 0.8rem;
    color: #000;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const EmptyTarget = styled.span`
  font-size: 20px;
  line-height: 20px;
  color: #393939;
`;

const LabelTarget = styled.span`
  font-size: 20px;
  line-height: 20px;
  color: #393939;
  margin-bottom: 5px;
`;

type CraftTableProps = {
  source: Farmer;
  target?: CraftItem;
  onCraft?: (
    target: { code: string; sprite: string },
    vol: number,
    used: { code: string; usedQty: number }[]
  ) => void;
};

export function CraftTable({ source, target, onCraft }: CraftTableProps) {
  return (
    <CraftTableLogic
      key={target?.code || "empty"}
      source={source}
      target={target}
      onCraft={onCraft}
    />
  );
}

function CraftTableLogic({ source, target, onCraft }: CraftTableProps) {
  const initialMaterials = useMemo(
    () => target?.materials.map((mar) => ({ ...mar, iQty: 0 })) || [],
    [target]
  );
  const [materialsInfo, setInfo] = useState(initialMaterials);
  const [vol, setVol] = useState(0);

  const handleIns = () => {
    const nextInfo = materialsInfo.map((item) => {
      const totalAvalQty = source.getItemQuantity(item.code);
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
    const nextInfo = materialsInfo.map((item) => {
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
      setInfo([...initialMaterials]);
      setVol(0);
      onCraft(
        target,
        vol,
        materialsInfo.map((info) => ({
          code: info.code,
          usedQty: info.requireQuantity * vol,
        }))
      );
    }
  };

  return (
    <Root>
      {target ? (
        <>
          <LabelTarget>{target.label}</LabelTarget>
          <BlockItem primary sprite={target.sprite} size="large" />
          <MaterialStack>
            {Array.from({ length: 5 }).map((_, i) => (
              <Track key={i}>
                {materialsInfo[i] ? (
                  <>
                    <BlockItem
                      highlight={
                        materialsInfo[i].iQty >=
                        materialsInfo[i].requireQuantity
                      }
                      secondary
                      sprite={materialsInfo[i].sprite}
                    />
                    <span>
                      {materialsInfo[i].iQty}/{materialsInfo[i].requireQuantity}
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
        </>
      ) : (
        <EmptyTarget>Choose item to craft</EmptyTarget>
      )}

      <button onClick={handleCraft} disabled={vol < 1}>
        Craft
      </button>
    </Root>
  );
}
