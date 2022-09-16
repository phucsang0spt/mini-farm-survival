import styled from "styled-components";
import { GameBootstrap } from "react-simple-game-engine";

import LoadingBG from "assets/images/survival-farm-loading-bg.png";
import { Menu } from "scenes/menu.scene";
import { Scene1 } from "scenes/sc1.scene";

const AssetsLoader = styled.div<{
  bg: string;
}>`
  background-image: url(${({ bg }) => bg});
  background-size: cover;
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
        // logPopup
        scenes={[Menu, Scene1]}
        width={1280}
        height={820}
        // assetsFailBehavior={{
        //   render: (errors) => (
        //     <div
        //       style={{ width: "100%", height: "100%", backgroundColor: "#39c" }}
        //     >
        //       {errors.map((t) => t.detail).join(",")}
        //     </div>
        //   ),
        // }}
        assetsLoader={<AssetsLoader bg={LoadingBG} />}
      />
    </Root>
  );
}
