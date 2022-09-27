import { useMemo, useState } from "react";
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

import { craftItemList } from "data/craft-items";
import { itemHash } from "data/item-list";
import { Farmer } from "entities/farmer.entity";
import { useWatcher } from "react-simple-game-engine/lib/utilities";
import { EquipmentShape } from "enums";
import { EquipTable } from "./equip-table";

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
  const farmer = useMemo(() => {
    return scene.worldManagement.getEntity(Farmer);
  }, [scene]);
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
          <StorageTab scene={scene} farmer={farmer} />
        ) : tab === BackpackTab.CRAFT ? (
          <CraftTab scene={scene} farmer={farmer} />
        ) : (
          <EquipmentTab scene={scene} farmer={farmer} />
        )}
      </Root>
    </Panel>
  );
}

type TabCommonProps = {
  scene: Scene;
  farmer: Farmer;
};

function StorageTab({ scene, farmer }: TabCommonProps) {
  const {
    "own-items": { group: groupOwnItems },
  } = useWatcher(scene, ["own-items", "active-sword", "active-shield"], {
    "active-sword": farmer.activeSword,
    "active-shield": farmer.activeShield,
    "own-items": { list: farmer.ownItems, group: farmer.groupOwnItems },
  });

  const storageList = Object.keys(groupOwnItems)
    .map((code) => ({
      ...itemHash[code],
      volume: groupOwnItems[code]

        .filter((item) => {
          // if item used then no take slot for it
          return !farmer.isUsing(item.id);
        })
        .reduce((s, item) => s + item.qty, 0),
    }))
    .filter((item) => !!item.volume);
  return (
    <>
      <div>
        <ItemGrid list={storageList} />
      </div>
      <div>
        <Projector>
          <div />
        </Projector>
      </div>
    </>
  );
}

function EquipmentTab({ scene, farmer }: TabCommonProps) {
  const {
    "own-items": { list: ownItems },
    "active-sword": activeSword,
    "active-shield": activeShield,
  } = useWatcher(scene, ["own-items", "active-sword", "active-shield"], {
    "own-items": { list: farmer.ownItems },
    "active-sword": farmer.activeSword,
    "active-shield": farmer.activeShield,
  });
  const [selectedShape, setSelectedShape] = useState<EquipmentShape>();

  const handleSelectEquipment = (code: Item["code"], item: OwnItem & Item) => {
    if (item.format.shape === selectedShape) {
      setSelectedShape(undefined);
      if (selectedShape === EquipmentShape.SWORD) {
        farmer.activeSword = { code, id: item.id };
      } else {
        farmer.activeShield = { code, id: item.id };
      }
    }
  };
  const list = ownItems
    .map((item) => {
      const active =
        item.id === activeSword?.id || item.id === activeShield?.id;
      return itemHash[item.code].type === "equipment"
        ? {
            ...item,
            ...itemHash[item.code],
            highlight:
              !active && itemHash[item.code].format.shape === selectedShape,
            active,
          }
        : null;
    })
    .filter(Boolean);

  return (
    <>
      <div>
        <ItemGrid onSelect={handleSelectEquipment} list={list} />
      </div>
      <div>
        <Projector>
          <EquipTable
            activeSword={activeSword && itemHash[activeSword.code].sprite}
            activeShield={activeShield && itemHash[activeShield.code].sprite}
            onSelectedShape={setSelectedShape}
          />
        </Projector>
      </div>
    </>
  );
}

function CraftTab({ farmer }: TabCommonProps) {
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
              farmer.craftItem({ code: target.code, qty: vol }, used);
            }}
            source={farmer}
            target={selectedTarget}
          />
        </Projector>
      </div>
    </>
  );
}
