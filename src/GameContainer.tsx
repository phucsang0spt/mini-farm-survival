import styled from "styled-components";
import { GameBootstrap } from "react-simple-game-engine";

import LoadingBG from "assets/images/menu-background.png";

import { Menu } from "scenes/menu.scene";
import { Scene1 } from "scenes/sc1.scene";

const AssetsLoader = styled.div<{
  bg: string;
}>`
  width: 100%;
  height: 100%;
  background-image: url(${({ bg }) => bg});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    position: relative;
    translate: 0 -50px;

    > div[data-tag="satellite"] {
      width: 100px;
      height: 100px;
      border-radius: 100%;

      border: 4px solid #ffffff5d;
      position: absolute;
      top: 0;
      left: 0;
    }

    > div[data-tag="satellite"]:first-child {
      &::before {
        position: absolute;
        top: -10px;
        left: -10px;
        content: "";
        width: 20px;
        height: 20px;
        background-color: #fff;
        border-radius: 100%;
      }
      transform: rotate(0deg);
      animation: spin-orbit 2s ease-in-out infinite;

      @keyframes spin-orbit {
        from {
        }
        to {
          transform: rotate(360deg);
        }
      }
    }

    > div[data-tag="satellite"]:last-child {
      &::before {
        position: absolute;
        top: 5px;
        left: 5px;
        content: "";
        width: 15px;
        height: 15px;
        background-color: #fff;
        border-radius: 100%;
      }
      transform: rotate(0deg);
      animation: spin-orbit-2 2s ease-in-out infinite;
      animation-delay: 0.5s;

      @keyframes spin-orbit-2 {
        from {
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
`;

const Root = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgb(41, 41, 41);
`;

export function GameContainer() {
  return (
    <Root>
      <GameBootstrap
        // logPopup={process.env.NODE_ENV !== "production"}
        scenes={[Menu, Scene1]}
        width={1280}
        height={720}
        joystick
        assetsLoader={
          <AssetsLoader bg={LoadingBG}>
            <div>
              <div data-tag="satellite" />
              <div data-tag="satellite" />
            </div>
          </AssetsLoader>
        }
      />
    </Root>
  );
}
