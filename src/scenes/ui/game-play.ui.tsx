import { useRef } from "react";
import styled from "styled-components";
import { Scene } from "react-simple-game-engine";
import {
  Control,
  ControlContainer,
  Modal,
  RefModalFunctions,
  Watcher,
} from "react-simple-game-engine/lib/utilities";

import { SettingsPanel } from "components/settings-panel";
import { Button } from "components/button";
import { BlockItem } from "components/block-item";
import { BasketTool } from "components/basket-tool";

import heart from "assets/images/heart.png";
import cog from "assets/images/cog.png";
import waterBar from "assets/images/water-bar.png";

import axe from "assets/images/items/tools/axe.png";
import pickaxe from "assets/images/items/tools/pickaxe.png";
import rod from "assets/images/items/tools/fishing-rod.png";

import hand from "assets/images/items/hand.png";
import punch from "assets/images/items/punch.png";

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

export type GamePlayUIProps = {
  scene: Scene;
};

export function GamePlayUI({ scene }: GamePlayUIProps) {
  const ref = useRef<RefModalFunctions>();
  return (
    <Root>
      <Modal ref={ref} content={<SettingsPanel scene={scene} />} />
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
      <Control top={40} left={10}>
        <WaterBar>
          <img src={waterBar} alt="" />
        </WaterBar>
      </Control>
      <Control
        bottom={20}
        left={scene.renderer.scaler.screenSizeUI.width / 2}
        xAxisOriginCenter
      >
        <ToolStack>
          <BlockItem sprite={axe} />
          <BlockItem sprite={pickaxe} />
          <BlockItem sprite={rod} />
          <BlockItem sprite={""} />
          <BlockItem sprite={""} />

          <div style={{ width: 23 }} />
          <BlockItem highlight sprite={punch} />
        </ToolStack>
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
        <Button size="small" onClick={() => ref.current!.open()} src={cog} />
      </Control>
    </Root>
  );
}
