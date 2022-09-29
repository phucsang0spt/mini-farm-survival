import { useRef } from "react";
import styled from "styled-components";
import { Scene } from "react-simple-game-engine";
import {
  Control,
  ControlContainer,
  Modal,
  RefModalFunctions,
  useEntity,
  Watcher,
} from "react-simple-game-engine/lib/utilities";

import { SettingsPanel } from "components/settings-panel";
import { BackpackPanel } from "components/backpack-panel";

import { Button } from "components/button";
import { BlockItem } from "components/block-item";
import { BasketTool } from "components/basket-tool";

import heart from "assets/images/heart.png";
import cog from "assets/images/cog.png";
import cogBag from "assets/images/coin-bag.png";
import waterBar from "assets/images/water-bar.png";
import backpack from "assets/images/backpack.png";

import hand from "assets/images/hand.png";

import { Farmer } from "entities/farmer.entity";
import { itemHash } from "data/item-list";

const Root = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
`;

const HeartStack = styled.div`
  position: absolute;
  top: 20px;
  left: 10px;
  transform: translateY(-50%);

  display: flex;
  align-items: center;

  img {
    + img {
      margin-left: 5px;
    }
  }
`;

const WaterBar = styled.div`
  position: relative;
  width: 100px;
  height: 16px;

  img {
    width: 100%;
    height: 100%;
  }

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 90%;
    bottom: 0;
    background-color: #036ee9c6;
    z-index: -1;
  }
`;

const ToolStack = styled.div`
  display: flex;
  align-items: center;

  > div {
    + div {
      margin-left: 5px;
    }
  }
`;

const CoinValue = styled.span`
  font-size: 0.9rem;
  line-height: 0.9rem;
  color: #000;
`;

export type GamePlayUIProps = {
  scene: Scene;
};

export function GamePlayUI({ scene }: GamePlayUIProps) {
  const refSettings = useRef<RefModalFunctions>();
  const refBackpack = useRef<RefModalFunctions>();
  const [farmer] = useEntity(Farmer);
  return (
    <Root>
      <Modal ref={refSettings} content={<SettingsPanel scene={scene} />} />
      <Modal ref={refBackpack} defaultOpen content={<BackpackPanel />} />
      <HeartStack>
        <Watcher
          names="farmer-hp"
          scene={scene}
          initialValues={{ "farmer-hp": 15 }}
        >
          {({ "farmer-hp": hp }) =>
            Array.from({ length: hp }).map((_, i) => (
              <img key={i} src={heart} alt="" />
            ))
          }
        </Watcher>
      </HeartStack>
      <Control alignment="center" orientation="horizontal" top={40} left={10}>
        <WaterBar>
          <img src={waterBar} alt="" />
        </WaterBar>
        <div style={{ width: 10 }} />
        <BlockItem
          onPress={() => refBackpack.current!.open()}
          background={false}
          size="small"
          sprite={backpack}
        />
      </Control>
      <Control
        bottom={20}
        left={scene.renderer.scaler.screenSizeUI.width / 2}
        xAxisOriginCenter
      >
        <Watcher
          scene={scene}
          names={["active-sword", "active-shield", "active-tools"]}
          initialValues={{
            "active-sword": farmer.activeSword,
            "active-shield": farmer.activeShield,
            "active-tools": farmer.activeTools,
          }}
        >
          {({
            "active-sword": activeSword,
            "active-shield": activeShield,
            "active-tools": activeTools,
          }) => (
            <ToolStack>
              <BlockItem
                sprite={itemHash[activeTools.axe?.code]?.sprite || ""}
              />
              <BlockItem
                sprite={itemHash[activeTools.pickaxe?.code]?.sprite || ""}
              />
              <BlockItem
                sprite={
                  itemHash[activeTools["fishing-rod"]?.code]?.sprite || ""
                }
              />
              <BlockItem sprite={""} />
              <BlockItem sprite={""} />

              <div style={{ width: 20 }} />

              <BlockItem
                highlight
                sprite={itemHash[activeSword?.code || "punch"].sprite}
              />
              <BlockItem
                highlight
                sprite={itemHash[activeShield?.code]?.sprite || ""}
              />
            </ToolStack>
          )}
        </Watcher>
      </Control>
      <Control bottom={20} right={20}>
        <ControlContainer>
          <Control right={0} bottom={52 + 20}>
            <BasketTool />
          </Control>
          <Control right={0} bottom={0}>
            <BlockItem rounded size="medium" sprite={hand} />
          </Control>
        </ControlContainer>
      </Control>

      <Control top={20} right={20} yAxisOriginCenter>
        <ControlContainer>
          <Control top={0} right={20 + 20 + 0} yAxisOriginCenter>
            <ControlContainer>
              <Control top={0} right={3 + 22} yAxisOriginCenter>
                <CoinValue>1000</CoinValue>
              </Control>
              <Control top={0} right={0} yAxisOriginCenter>
                <BlockItem sprite={cogBag} size="small" background={false} />
              </Control>
            </ControlContainer>
          </Control>
          <Control top={0} right={0} yAxisOriginCenter>
            <Button
              size="small"
              onClick={() => refSettings.current!.open()}
              src={cog}
            />
          </Control>
        </ControlContainer>
      </Control>
    </Root>
  );
}
