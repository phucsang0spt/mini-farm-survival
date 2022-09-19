import { useRef } from "react";
import styled from "styled-components";
import { Scene } from "react-simple-game-engine";
import {
  Control,
  Modal,
  RefModalFunctions,
  Watcher,
} from "react-simple-game-engine/lib/utilities";

import { SettingsPanel } from "components/settings-panel";
import { Button } from "components/button";

import heart from "assets/images/heart.png";
import cog from "assets/images/cog.png";

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
      <Control top={20} right={20} yAxisOriginCenter>
        <Button size="small" onClick={() => ref.current!.open()} src={cog} />
      </Control>
    </Root>
  );
}
