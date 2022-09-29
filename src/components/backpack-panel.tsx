import { useState } from "react";
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
import { useEntity, useWatcher } from "react-simple-game-engine/lib/utilities";
import { EquipmentShape } from "enums";
import { EquipTable } from "./equip-table";
import { InfoView } from "./info-view";

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
};

export function BackpackPanel({ close }: BackpackPanelProps) {
  const [farmer] = useEntity(Farmer);
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
          <StorageTab farmer={farmer} />
        ) : tab === BackpackTab.CRAFT ? (
          <CraftTab farmer={farmer} />
        ) : (
          <EquipmentTab farmer={farmer} />
        )}
      </Root>
    </Panel>
  );
}

type TabCommonProps = {
  farmer: Farmer;
};

function StorageTab({ farmer }: TabCommonProps) {
  const [previewItem, setPreviewItem] = useState<
    Item & { ids: OwnItem["id"][] }
  >(null);
  const { ids: selectdIDs = [], ..._previewItem } = previewItem || {};

  const {
    "own-items": { group: groupOwnItems },
  } = useWatcher(["own-items", "active-sword", "active-shield"], {
    "active-sword": farmer.activeSword,
    "active-shield": farmer.activeShield,
    "own-items": { list: farmer.ownItems, group: farmer.groupOwnItems },
  });

  const pickUsing: any[] = [];
  let storageList = Object.keys(groupOwnItems)
    .map((code) => {
      const ids = groupOwnItems[code]
        .map((item) => item.id)
        .filter((id) => !farmer.isUsing(id));
      const activeInGroup = ids.join(",") === selectdIDs.join(",");
      return {
        ...itemHash[code],
        active: activeInGroup,
        volume: groupOwnItems[code]
          .filter((item) => {
            const isUsing = farmer.isUsing(item.id);
            if (isUsing) {
              pickUsing.push({
                ...itemHash[code],
                active: selectdIDs.includes(item.id),
                volume: 1,
                highlight: true,
                ids: [item.id],
              });
            }
            return !isUsing;
          })
          .reduce((s, item) => s + item.qty, 0),
        ids,
      };
    })
    .filter((item) => !!item.volume);

  storageList = [...storageList, ...pickUsing];

  const handleSelectItem = (
    _: any,
    {
      volume,
      active,
      ...item
    }: Item & { active: true; volume: number; ids: OwnItem["id"][] }
  ) => {
    setPreviewItem(item);
  };

  return (
    <>
      <div>
        <ItemGrid list={storageList} onSelect={handleSelectItem} />
      </div>
      <div>
        <Projector>
          <InfoView
            item={
              Object.keys(_previewItem).length ? (_previewItem as Item) : null
            }
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

function EquipmentTab({ farmer }: TabCommonProps) {
  const {
    "own-items": { list: ownItems },
    "active-sword": activeSword,
    "active-shield": activeShield,
  } = useWatcher(["own-items", "active-sword", "active-shield"], {
    "own-items": { list: farmer.ownItems },
    "active-sword": farmer.activeSword,
    "active-shield": farmer.activeShield,
  });

  const handleSelectEquipment = (code: Item["code"], item: OwnItem & Item) => {
    if ((item.format as EquipmentItemFormat).shape === EquipmentShape.SWORD) {
      farmer.activeSword = { code, id: item.id };
    } else {
      farmer.activeShield = { code, id: item.id };
    }
  };
  const list = ownItems
    .map((item) => {
      const active =
        item.id === activeSword?.id || item.id === activeShield?.id;
      const itemClass = itemHash[item.code];
      return itemClass.type === "equipment"
        ? {
            ...item,
            ...itemClass,
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
          />
        </Projector>
      </div>
    </>
  );
}
