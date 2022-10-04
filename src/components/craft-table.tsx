import { Farmer } from "entities/farmer.entity";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { genId, valueToAlpha } from "utils";
import { BlockItem } from "./block-item";
import { PanelButton } from "./panel-button";
import { QuantityControl } from "./quantity-control";

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
  target?: Item & {
    materials: ({
      requireQuantity: number;
    } & Item)[];
  };
  onCraft?: (
    target: { code: string; sprite: string },
    vol: number,
    used: { code: string; usedQty: number }[]
  ) => void;
};

export function CraftTable({ source, target, onCraft }: CraftTableProps) {
  const key = useMemo(() => {
    return target?.code || `empty-${genId()}`;
  }, [target?.code]);

  return (
    <CraftTableLogic
      key={key}
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
                      {valueToAlpha(materialsInfo[i].iQty)}/
                      {valueToAlpha(materialsInfo[i].requireQuantity)}
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
          <QuantityControl qty={vol} onUp={handleIns} onDown={handleDes} />
        </>
      ) : (
        <EmptyTarget>Choose item to craft</EmptyTarget>
      )}
      <PanelButton onClick={handleCraft} disabled={vol < 1}>
        Craft
      </PanelButton>
    </Root>
  );
}
