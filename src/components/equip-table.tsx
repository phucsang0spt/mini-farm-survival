import styled from "styled-components";
import { BlockItem } from "./block-item";

import shieldHolder from "assets/images/shield-holder.png";
import swordHolder from "assets/images/sword-holder.png";
import { EquipmentShape } from "enums";

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
`;

const Hanger = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    + div {
      margin-left: 10px;
    }
  }
`;

const Title = styled.span`
  font-size: 20px;
  line-height: 20px;
  color: #393939;
  margin-bottom: 10px;
`;

type EquipTableProps = {
  activeSword?: Item["sprite"];
  activeShield?: Item["sprite"];
  onSelectedShape: (shape: EquipmentShape) => void;
};

export function EquipTable({
  activeSword,
  activeShield,
  onSelectedShape,
}: EquipTableProps) {
  return (
    <Root>
      <Title>Choose equipment type:</Title>
      <Hanger>
        <BlockItem
          onPress={() => onSelectedShape(EquipmentShape.SWORD)}
          sprite={activeSword ?? swordHolder}
          size="large"
        />
        <BlockItem
          onPress={() => onSelectedShape(EquipmentShape.SHIELD)}
          sprite={activeShield ?? shieldHolder}
          size="large"
        />
      </Hanger>
    </Root>
  );
}
