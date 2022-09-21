import { useState } from "react";
import { Scene } from "react-simple-game-engine";
import styled from "styled-components";

import { Panel } from "./panel";
import { ItemGrid } from "./items-grid";
import { Projector } from "./projector";
import { BlockItem } from "./block-item";

import equipment from "assets/images/equipment.png";
import craft from "assets/images/craft.png";

import axe from "assets/images/items/tools/axe.png";
import sword from "assets/images/items/weapons/wood-sword.png";

enum BackpackTab {
  CRAFT,
  EQUIPMENT,
}

const Root = styled.div`
  display: flex;
  height: 300px;

  > div {
    height: 100%;

    &:first-child {
      margin-right: 5px;
    }

    &:nth-child(2) {
      border-top: 2px solid #00000000;
      border-bottom: 2px solid #00000000;
      padding-top: 10px;
      padding-bottom: 10px;
    }

    &:last-child {
      margin-left: 2px;
      flex-grow: 1;
      flex-shrink: 1;
      padding-right: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
`;

const TabStack = styled.div<{
  active: BackpackTab;
}>`
  width: 30px;
  height: 100%;
  background-color: #9f7f48;
  border-right: 1px solid #9f7f48;

  > div {
    width: 30px;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 5px solid #907341;
    transition: border-right 100ms ease-in-out;

    &:first-child {
      border-bottom: 1px solid #907341;
    }

    background-color: #9f7f48;
    &[data-active="true"] {
      border-right: 1px solid #907341;
    }
  }
`;

type BackpackPanelProps = {
  close?: () => void;
  scene: Scene;
};

export function BackpackPanel({ scene, close }: BackpackPanelProps) {
  const [tab, setTab] = useState(BackpackTab.CRAFT);
  return (
    <Panel spacing={false} maxWidth={500} close={close}>
      <Root>
        <div>
          <TabStack active={tab}>
            <div
              data-active={tab === BackpackTab.CRAFT}
              onClick={() => setTab(BackpackTab.CRAFT)}
            >
              <BlockItem size="small" background={false} sprite={craft} />
            </div>
            <div
              data-active={tab === BackpackTab.EQUIPMENT}
              onClick={() => setTab(BackpackTab.EQUIPMENT)}
            >
              <BlockItem size="small" background={false} sprite={equipment} />
            </div>
          </TabStack>
        </div>
        {tab === BackpackTab.CRAFT ? (
          <>
            <div>
              <ItemGrid
                list={[
                  {
                    code: "axe",
                    sprite: axe,
                  },
                ]}
              />
            </div>
            <div>
              <Projector />
            </div>
          </>
        ) : (
          <>
            <div>
              <ItemGrid
                list={[
                  {
                    code: "wood-sword",
                    sprite: sword,
                  },
                ]}
              />
            </div>
            <div>
              <Projector />
            </div>
          </>
        )}
      </Root>
    </Panel>
  );
}
