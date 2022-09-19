import { Saver, Scene, SceneTag, SceneUI } from "react-simple-game-engine";
import {
  SoundStoreKey,
  SoundType,
} from "react-simple-game-engine/lib/export-enums";
import { GetSoundOptions } from "react-simple-game-engine/lib/export-types";

import { MenuUI, MenuUIProps } from "./ui/menu.ui";

@SceneTag("menu")
@SceneUI(MenuUI)
export class Menu extends Scene<MenuUIProps> {
  protected getSoundOptions(): GetSoundOptions {
    return {
      [SoundType.ONCE]: {
        canPlay: Saver.get(SoundStoreKey.ONCE, Boolean),
      },
      [SoundType.BACKGROUND]: {
        canPlay: Saver.get(SoundStoreKey.BACKGROUND, Boolean),
      },
    };
  }

  getUIProps() {
    return {
      onStart: () => {
        console.log("game start");
        this.switchToScene("scene-1");
      },
    };
  }
}
