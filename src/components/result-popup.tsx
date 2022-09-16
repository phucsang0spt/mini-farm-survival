import { Scene } from "react-simple-game-engine";
import styled from "styled-components";

import { FaUndo } from "@react-icons/all-files/fa/FaUndo";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";
import { FaHome } from "@react-icons/all-files/fa/FaHome";

import { Button } from "components/button";

import gameOver from "assets/images/game-over.png";
import win from "assets/images/win.png";

const Root = styled.div`
  width: 400px;
  height: 250px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 90%;
    height: auto;
  }

  svg {
    color: #39c;
  }

  > div {
    display: flex;
    align-items: center;
    margin-top: 15px;
  }
`;

export type ResultPopupProps = {
  isWin: boolean;
  scene: Scene;
};

export function ResultPopup({ isWin, scene }: ResultPopupProps) {
  return (
    <Root>
      <img src={isWin ? win : gameOver} alt="" />
      <div>
        <Button
          onClick={() => {
            scene.manager.replay();
          }}
        >
          <FaUndo />
        </Button>
        {isWin && scene.manager.canNext() && (
          <Button
            onClick={() => {
              scene.manager.next();
            }}
          >
            <FaArrowRight />
          </Button>
        )}
        <Button
          onClick={() => {
            scene.manager.gotoScene("menu");
          }}
        >
          <FaHome />
        </Button>
      </div>
    </Root>
  );
}
