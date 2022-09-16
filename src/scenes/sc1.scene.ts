import {
  LogicComponent,
  Saver,
  Scene,
  SpriteFrom,
  SceneTag,
  SceneUI,
  SimpleCamera,
} from "react-simple-game-engine";
import {
  type Avatar,
  GetSoundOptions,
} from "react-simple-game-engine/lib/export-types";
import { SoundType } from "react-simple-game-engine/lib/export-enums";

import background from "assets/images/survival-farm-map.png";

import { Background } from "entities/background.entity";
import { GamePlayUI } from "./game-play.ui.scene";

@SceneTag("scene-1")
@SceneUI(GamePlayUI)
export class Scene1 extends Scene {
  @SpriteFrom(background)
  backgroundSprite!: Avatar;

  async onLoadAssets() {}

  protected getSoundOptions(): GetSoundOptions {
    return {
      [SoundType.ONCE]: {
        canPlay: Saver.get("sound", Boolean),
      },
      [SoundType.BACKGROUND]: {
        canPlay: Saver.get("background-music", Boolean),
      },
    };
  }

  getInitialData() {
    return {
      joystick: true,
    };
  }

  onBootstrapDone(camera: SimpleCamera) {
    const topOfBg = 0 - this.backgroundSprite.height / 2;
    const targetPos = topOfBg + Renderer.height / 2;

    const distanceUpCamera = camera.y - targetPos;
    camera.y -= distanceUpCamera;
    camera.y -= (Renderer.height - Renderer.scaler.viewport.height) / 2;
    camera.x += 130;
  }

  getComponents() {
    return [
      new LogicComponent([
        Background,
        {
          props: {
            backgroundSprite: this.backgroundSprite,
          },
        },
      ]),
    ];
  }
}
