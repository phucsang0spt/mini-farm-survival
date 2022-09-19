import {
  LogicComponent,
  Saver,
  Scene,
  SpriteFrom,
  SceneTag,
  SceneUI,
  SimpleCamera,
  Matter,
} from "react-simple-game-engine";
import {
  type Avatar,
  GetSoundOptions,
} from "react-simple-game-engine/lib/export-types";
import { SoundType } from "react-simple-game-engine/lib/export-enums";

import { Background } from "entities/background.entity";
import { Farmer } from "entities/farmer.entity";
import { Generator } from "entities/generator.entity";
import { InvisibleWallPrefab } from "entities/invisible-wall.entity";
import { Forground } from "entities/forground.entity";

import background from "assets/images/survival-farm-map.png";
import forground from "assets/images/survival-farm-map-forground.png";
import invisibleWall from "assets/images/invisible-wall.jpg";
import farmer from "assets/images/farmer.png";

import invisibleWallOffsets from "data/invisible-wall-offsets.json";

import { GamePlayUI } from "./game-play.ui.scene";

@SceneTag("scene-1")
@SceneUI(GamePlayUI)
export class Scene1 extends Scene {
  @SpriteFrom(background)
  backgroundSprite!: Avatar;

  @SpriteFrom(forground)
  forgroundSprite!: Avatar;

  @SpriteFrom(invisibleWall)
  invisibleWallSprite!: Avatar;

  @SpriteFrom(farmer)
  farmerSprite!: Avatar;

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
    const targetPos = topOfBg + this.renderer.height / 2;

    const distanceUpCamera = camera.y - targetPos;
    camera.y -= distanceUpCamera;
    camera.y -=
      (this.renderer.height - this.renderer.scaler.viewport.height) / 2;
    camera.x += 130;

    Matter.Body.setPosition(this.worldManagement.getEntity(Farmer).body, {
      x: camera.x,
      y: camera.y,
    });
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
      new InvisibleWallPrefab({
        props: {
          sprite: this.invisibleWallSprite,
        },
      }),
      new LogicComponent([
        Generator,
        {
          props: {
            invisibleWallOffsets: invisibleWallOffsets as any[],
          },
        },
      ]),

      new LogicComponent([
        Farmer,
        {
          props: {
            farmerSprite: this.farmerSprite,
          },
        },
      ]),
      new LogicComponent([
        Forground,
        {
          props: {
            forgroundSprite: this.forgroundSprite,
          },
        },
      ]),
    ];
  }
}
