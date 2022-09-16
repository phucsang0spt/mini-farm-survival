import styled from "styled-components";

import { Scene } from "react-simple-game-engine";
const Root = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
`;

export type GamePlayUIProps = {
  scene: Scene;
};

export function GamePlayUI({ scene }: GamePlayUIProps) {
  return <Root></Root>;
}
