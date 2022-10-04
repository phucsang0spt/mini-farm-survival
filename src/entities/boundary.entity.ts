import {
  LogicComponent,
  RectEntity,
  Prefab,
  ColorSprite,
} from "react-simple-game-engine";

import {
  EntityPrepare,
  Configation,
} from "react-simple-game-engine/lib/export-types";

export type BoundaryProps = {};

export class Boundary extends RectEntity<BoundaryProps> {
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

export class BoundaryPrefab extends Prefab<Boundary> {
  constructor(config: Configation<Boundary>) {
    super([Boundary, config]);
  }
}
