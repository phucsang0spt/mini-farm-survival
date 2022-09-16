import { Scene, SceneTag, SceneUI } from "react-simple-game-engine";
import { MenuUI, MenuUIProps } from "./menu.ui.scene";

@SceneTag("menu")
@SceneUI(MenuUI)
export class Menu extends Scene<MenuUIProps> {
  public getComponents() {
    return [];
  }

  protected getUIProps() {
    return {
      onStart: () => {
        console.log("game start");
        this.switchToScene("scene-1");
      },
    };
  }
}
