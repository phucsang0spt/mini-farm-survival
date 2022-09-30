import styled from "styled-components";

import {
  SoundBackgroundWatcher,
  SoundOnceWatcher,
} from "react-simple-game-engine/lib/utilities";

import { SoundButton } from "components/sound-button";
import { Button } from "components/button";

import background from "assets/images/menu-background.png";
import play from "assets/images/play.png";
import title from "assets/images/menu-title.png";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("${background}");

  > * {
    translate: 0 -50px;
  }

  > img:first-child {
    max-width: 90%;
    margin-bottom: 20px;
  }
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

export type MenuUIProps = {
  onStart: () => void;
};

export function MenuUI({ onStart }: MenuUIProps) {
  return (
    <Root>
      <img src={title} alt="" />
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
        <Button src={play} onClick={onStart} />
      </ButtonStack>
    </Root>
  );
}
