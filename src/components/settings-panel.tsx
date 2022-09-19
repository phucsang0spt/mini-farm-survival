import { Scene } from "react-simple-game-engine/lib";
import {
  SoundBackgroundWatcher,
  SoundOnceWatcher,
} from "react-simple-game-engine/lib/utilities";
import styled from "styled-components";

import close from "assets/images/close.png";
import home from "assets/images/home.png";

import { SoundButton } from "./sound-button";
import { Button } from "./button";

const Root = styled.div<{
  width: number;
}>`
  width: ${({ width }) => width};
  max-width: 400px;
  min-width: 300px;
  background-color: #b79962;
  border: 2px solid #9f7f48;
  padding: 20px;
  position: relative;
  border-radius: 4px;
`;

const CloseBtn = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  translate: 50% -50%;
`;

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
  close?: () => void;
  scene: Scene;
};

export function SettingsPanel({
  scene,
  close: closeModal,
}: SettingsPanelProps) {
  return (
    <Root width={Renderer.scaler.screenSizeUI.width}>
      <CloseBtn onClick={closeModal} src={close} alt="" />
      <ButtonStack>
        <SoundStack>
          <SoundBackgroundWatcher scene={scene}>
            {({ canPlay, toggle }) => (
              <SoundButton type="music" on={canPlay} onToggle={toggle} />
            )}
          </SoundBackgroundWatcher>
          <SoundOnceWatcher scene={scene}>
            {({ canPlay, toggle }) => (
              <SoundButton onToggle={toggle} type="vol" on={canPlay} />
            )}
          </SoundOnceWatcher>
        </SoundStack>
        <Button src={home} />
      </ButtonStack>
    </Root>
  );
}
