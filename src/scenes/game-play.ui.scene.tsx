import styled from "styled-components";
import { Scene } from "react-simple-game-engine";
import { Watcher } from "react-simple-game-engine/lib/utilities";

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

const SettingsButton = styled.img`
  position: absolute;
  top: 20px;
  right: 10px;

  width: 20px;
  height: 20px;
  transform: translateY(-50%);
`;
export type GamePlayUIProps = {
  scene: Scene;
};

export function GamePlayUI({ scene }: GamePlayUIProps) {
  return (
    <Root>
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
      <SettingsButton src={cog} alt="" />
    </Root>
  );
}
