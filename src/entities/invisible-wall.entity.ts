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

export type InvisibleWallProps = {
  sprite: Avatar;
};

export class InvisibleWall extends RectEntity<InvisibleWallProps> {
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
}

export class InvisibleWallPrefab extends Prefab<InvisibleWall> {
  constructor(config: Configation<InvisibleWall>) {
    super([InvisibleWall, config]);
  }
}
