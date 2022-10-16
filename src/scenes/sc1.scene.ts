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
import { BoundaryGeneratorEntity } from "entities/boundary.generator.entity";
import { ChickenGeneratorEntity } from "entities/chicken.generator.entity";
import { BackgroundEntity } from "entities/background.entity";
import { FarmerEntity } from "entities/farmer.entity";
import { ForegroundEntity } from "entities/foreground.entity";
import { ItemPrefab } from "entities/item.entity";
import { ItemGeneratorEntity } from "entities/item.generator.entity";
import { TreePrefab } from "entities/tree.entity";
import { TreeGeneratorEntity } from "entities/tree.generator.entity";
import { AxeEntity } from "entities/axe.entity";
import { FishingRodEntity } from "entities/fishing-rod.entity";

import background from "assets/images/survival-farm-map.png";
import foreground from "assets/images/survival-farm-map-foreground.png";
import tree from "assets/images/tree.png";
import bigTree from "assets/images/big-tree.png";
import highlightSheet from "assets/images/highlight-sheet.png";
import farmerSheet from "assets/images/farmer-sheet.png";
import axeSheet from "assets/images/axe-sheet.png";
import pickaxeSheet from "assets/images/pickaxe-sheet.png";
import fishingRodSheet from "assets/images/fishing-rod-sheet.png";
import chickenSheet from "assets/images/items/animals/chicken-sheet.png";
import woodX3 from "assets/images/wood-x3.png";
import woodX5 from "assets/images/wood-x5.png";

import coin from "assets/images/items/coin.png";

import backgroundMusic from "assets/sounds/music.wav";

import boundaryOffsets from "data/boundary-offsets.json";
import breadPlaceOffsets from "data/bread-place-offsets.json";
import treeOffsets from "data/tree-offsets.json";
import bigTreeOffsets from "data/big-tree-offsets.json";

import { GamePlayUI } from "./ui/game-play.ui";
import { PickaxeEntity } from "entities/pickaxe.entity";
import { WoodPrefab } from "entities/wood.entity";

@SceneTag("scene-1")
@SceneUI(GamePlayUI)
export class Scene1 extends Scene {
  @SpriteFrom(background)
  backgroundSprite!: Avatar;

  @SpriteFrom(foreground)
  foregroundSprite!: Avatar;

  @SpriteFrom(tree)
  treeSprite: Avatar;

  @SpriteFrom(woodX3)
  woodX3Sprite: Avatar;

  @SpriteFrom(woodX5)
  woodX5Sprite: Avatar;

  @SpriteFrom(bigTree)
  bigTreeSprite: Avatar;

  @SpriteFrom(farmerSheet)
  farmerSprite: Avatar;

  @SpriteFrom(axeSheet)
  axeSprite: Avatar;

  @SpriteFrom(pickaxeSheet)
  pickaxeSprite: Avatar;

  @SpriteFrom(fishingRodSheet)
  fishingRodSprite: Avatar;

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
      new WoodPrefab({
        props: {
          sprite: this.woodX3Sprite,
          spriteX5: this.woodX5Sprite,
        },
      }),
      new LogicComponent([
        BoundaryGeneratorEntity,
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
        AxeEntity,
        {
          props: {
            sprite: this.axeSprite,
          },
        },
      ]),
      new LogicComponent([
        PickaxeEntity,
        {
          props: {
            sprite: this.pickaxeSprite,
          },
        },
      ]),
      new LogicComponent([
        FishingRodEntity,
        {
          props: {
            sprite: this.fishingRodSprite,
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
        ForegroundEntity,
        {
          props: {
            foregroundSprite: this.foregroundSprite,
          },
        },
      ]),
    ];
  }
}
