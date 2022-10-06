import {
  LogicComponent,
  Saver,
  Scene,
  SpriteFrom,
  SceneTag,
  SceneUI,
  SimpleCamera,
  SoundFrom,
  Sound,
} from "react-simple-game-engine";
import {
  type Avatar,
  GetSoundOptions,
} from "react-simple-game-engine/lib/export-types";
import {
  SoundStoreKey,
  SoundType,
} from "react-simple-game-engine/lib/export-enums";

import { BoundaryPrefab } from "entities/boundary.entity";
import { ChickenPrefab } from "entities/chicken.entity";
import { BoudaryGeneratorEntity } from "entities/boundary.generator.entity";
import { ChickenGeneratorEntity } from "entities/chicken.generator.entity";
import { BackgroundEntity } from "entities/background.entity";
import { FarmerEntity } from "entities/farmer.entity";
import { ForgroundEntity } from "entities/forground.entity";
import { ItemPrefab } from "entities/item.entity";
import { ItemGeneratorEntity } from "entities/item.generator.entity";
import { TreePrefab } from "entities/tree.entity";
import { TreeGeneratorEntity } from "entities/tree.generator.entity";

import background from "assets/images/survival-farm-map.png";
import forground from "assets/images/survival-farm-map-forground.png";
import tree from "assets/images/tree.png";
import bigTree from "assets/images/big-tree.png";
import highlightSheet from "assets/images/highlight-sheet.png";
import farmerSheet from "assets/images/farmer-sheet.png";
import chickenSheet from "assets/images/items/animals/chicken-sheet.png";

import coin from "assets/images/items/coin.png";

import backgroundMusic from "assets/sounds/music.wav";

import boundaryOffsets from "data/boundary-offsets.json";
import breadPlaceOffsets from "data/bread-place-offsets.json";
import treeOffsets from "data/tree-offsets.json";
import bigTreeOffsets from "data/big-tree-offsets.json";

import { GamePlayUI } from "./ui/game-play.ui";

@SceneTag("scene-1")
@SceneUI(GamePlayUI)
export class Scene1 extends Scene {
  @SpriteFrom(background)
  backgroundSprite!: Avatar;

  @SpriteFrom(forground)
  forgroundSprite!: Avatar;

  @SpriteFrom(tree)
  treeSprite: Avatar;

  @SpriteFrom(bigTree)
  bigTreeSprite: Avatar;

  @SpriteFrom(farmerSheet)
  farmerSprite: Avatar;

  @SpriteFrom(highlightSheet)
  highlightSprite!: Avatar;

  @SpriteFrom(chickenSheet)
  chickSprite: Avatar;

  @SpriteFrom(coin)
  coinSprite: Avatar;

  @SoundFrom({ src: backgroundMusic, volume: 0.05 }, SoundType.BACKGROUND)
  backgroundMusic!: Sound;

  async onLoadAssets() {}

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
  }

  getComponents() {
    return [
      new LogicComponent([
        BackgroundEntity,
        {
          props: {
            backgroundSprite: this.backgroundSprite,
            backgroundMusic: this.backgroundMusic,
          },
        },
      ]),
      new BoundaryPrefab({}),
      new ChickenPrefab({
        props: {
          chickSprite: this.chickSprite,
          highlightSprite: this.highlightSprite,
        },
      }),
      new ItemPrefab({
        props: {
          highlightSprite: this.highlightSprite,
        },
      }),
      new TreePrefab({
        props: {
          sprite: this.treeSprite,
          bigSprite: this.bigTreeSprite,
        },
      }),
      new LogicComponent([
        BoudaryGeneratorEntity,
        {
          props: {
            boundaryOffsets: boundaryOffsets as (1 | 0)[],
          },
        },
      ]),
      new LogicComponent([
        FarmerEntity,
        {
          props: {
            farmerSprite: this.farmerSprite,
          },
        },
      ]),
      new LogicComponent([
        TreeGeneratorEntity,
        {
          props: {
            treeOffsets: treeOffsets as (1 | 0)[],
            bigTreeOffsets: bigTreeOffsets as (1 | 0)[],
          },
        },
      ]),
      new LogicComponent([
        ItemGeneratorEntity,
        {
          props: {
            coinSprite: this.coinSprite,
          },
        },
      ]),
      new LogicComponent([
        ChickenGeneratorEntity,
        {
          props: {
            breadPlaceOffsets: breadPlaceOffsets as (1 | 0)[],
          },
        },
      ]),
      new LogicComponent([
        ForgroundEntity,
        {
          props: {
            forgroundSprite: this.forgroundSprite,
          },
        },
      ]),
    ];
  }
}
