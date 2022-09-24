import { useState } from "react";
import { Scene } from "react-simple-game-engine";
import styled from "styled-components";

import { Panel } from "./panel";
import { ItemGrid } from "./item-grid";
import { Projector } from "./projector";
import { BlockItem } from "./block-item";
import { CraftTable } from "./craft-table";

import equipment from "assets/images/equipment.png";
import craft from "assets/images/craft.png";
import chest from "assets/images/chest.png";

import sword from "assets/images/items/equip/weapons/wood-sword.png";
import woodShield from "assets/images/items/equip/wood-shield.png";

import { craftItemList } from "data/craft-items";
import { itemHash } from "data/item-list";

enum BackpackTab {
  STORAGE,
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
    height: calc(100% / 3);
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 5px solid #907341;
    transition: border-right 50ms ease-in-out;

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
              data-active={tab === BackpackTab.STORAGE}
              onClick={() => setTab(BackpackTab.STORAGE)}
            >
              <BlockItem size="small" background={false} sprite={chest} />
            </div>
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
        {tab === BackpackTab.STORAGE ? (
          <StorageTab />
        ) : tab === BackpackTab.CRAFT ? (
          <CraftTab />
        ) : (
          <EquipmentTab />
        )}
      </Root>
    </Panel>
  );
}

const Hanger = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    + div {
      margin-left: 10px;
    }
  }
`;

function StorageTab() {
  return (
    <>
      <div>
        <ItemGrid list={[]} />
      </div>
      <div>
        <Projector>
          <div />
        </Projector>
      </div>
    </>
  );
}

function EquipmentTab() {
  return (
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
        <Projector>
          <Hanger>
            <BlockItem sprite={sword} size="large" />
            <BlockItem sprite={woodShield} size="large" />
          </Hanger>
        </Projector>
      </div>
    </>
  );
}

function CraftTab() {
  const [selectedItem, selectItem] = useState<CraftItem["code"]>(null);
  const handlePickCraft = (code: string) => {
    selectItem(code);
  };

  const craftList = craftItemList.map((item) => {
    return {
      ...item,
      ...itemHash[item.code],
      active: item.code === selectedItem,
      materials: item.materials.map((mart: Item) => ({
        ...mart,
        sprite: itemHash[mart.code].sprite,
      })),
    } as CraftItem;
  });

  const selectedTarget = craftList.find((item) => item.code === selectedItem);

  return (
    <>
      <div>
        <ItemGrid onSelect={handlePickCraft} list={craftList} />
      </div>
      <div>
        <Projector>
          <CraftTable
            onCraft={(target, vol, used) => {
              console.log("x", target, vol, used);
            }}
            source={{
              getStuffQty: (code: string) => {
                if (code === "ok2") {
                  return 5;
                }
                return 1000;
              },
            }}
            target={selectedTarget}
          />
        </Projector>
      </div>
    </>
  );
}
