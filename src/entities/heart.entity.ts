import {
  LogicComponent,
  RectEntity,
  Prefab,
  ColorSprite,
} from "react-simple-game-engine";

import {
  EntityPrepare,
  Configation,
  Avatar,
} from "react-simple-game-engine/lib/export-types";

export type HeartProps = {
  sprite: Avatar;
};

export class Heart extends RectEntity<HeartProps> {
  protected onPrepare(): EntityPrepare<this> {
    return {
      sprite: new LogicComponent([
        ColorSprite,
        {
          source: [0, 0, 0, 0],
        },
      ]),
      bodyOptions: {
        isStatic: true,
      },
    };
  }

  onActive(): void {}
}

export class HeartPrefab extends Prefab<Heart> {
  constructor(config: Configation<Heart>) {
    super([Heart, config]);
  }
}
