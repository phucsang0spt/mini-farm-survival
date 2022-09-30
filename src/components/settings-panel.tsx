import { Scene } from "react-simple-game-engine/lib";
import {
  SoundBackgroundWatcher,
  SoundOnceWatcher,
} from "react-simple-game-engine/lib/utilities";
import styled from "styled-components";

import home from "assets/images/home.png";

import { SoundButton } from "./sound-button";
import { Button } from "./button";
import { Panel } from "./panel";

const SoundStack = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    + * {
      margin-left: 10px;
    }
  }
`;

const ButtonStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    + * {
      margin-top: 10px;
    }
  }
`;

type SettingsPanelProps = {
  scene: Scene;
};

export function SettingsPanel({ scene }: SettingsPanelProps) {
  return (
    <Panel>
      <ButtonStack>
        <SoundStack>
          <SoundBackgroundWatcher>
            {({ canPlay, toggle }) => (
              <SoundButton type="music" on={canPlay} onToggle={toggle} />
            )}
          </SoundBackgroundWatcher>
          <SoundOnceWatcher>
            {({ canPlay, toggle }) => (
              <SoundButton onToggle={toggle} type="vol" on={canPlay} />
            )}
          </SoundOnceWatcher>
        </SoundStack>
        <Button
          src={home}
          onClick={() => {
            scene.switchToScene("menu");
          }}
        />
      </ButtonStack>
    </Panel>
  );
}
